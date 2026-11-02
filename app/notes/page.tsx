import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db, hasDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

// Sample page showing the app reading and writing its own Postgres database.
// Safe to delete once your app has real pages.

type Note = { id: number; body: string; created_at: Date };

// Creates the table on first use. The advisory lock makes two first requests take turns,
// since "if not exists" alone does not stop them racing; the promise means each server
// process does this once.
let tableReady: Promise<void> | undefined;

function ensureTable(): Promise<void> {
  tableReady ??= (async () => {
    const client = await db().connect();
    try {
      await client.query("begin");
      await client.query("select pg_advisory_xact_lock(hashtext('notes_schema'))");
      await client.query(`
        create table if not exists notes (
          id serial primary key,
          body text not null check (length(body) between 1 and 500),
          created_at timestamptz not null default now()
        )`);
      await client.query("commit");
    } catch (err) {
      await client.query("rollback").catch(() => {});
      tableReady = undefined; // try again on the next request
      throw err;
    } finally {
      client.release();
    }
  })();
  return tableReady;
}

async function addNote(formData: FormData) {
  "use server";
  const body = String(formData.get("body") ?? "").trim().slice(0, 500);
  if (!body) return;
  await ensureTable();
  await db().query("insert into notes (body) values ($1)", [body]);
  revalidatePath("/notes");
}

export default async function NotesPage() {
  if (!hasDatabase()) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16">
        <Card>
          <CardHeader>
            <CardTitle>No database configured</CardTitle>
            <CardDescription>
              Set DATABASE_URL to a Postgres connection string to use this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  await ensureTable();
  const [{ rows: notes }, { rows: info }] = await Promise.all([
    db().query<Note>("select id, body, created_at from notes order by id desc limit 50"),
    db().query<{ version: string; database: string }>(
      "select current_database() as database, split_part(version(), ' on ', 1) as version",
    ),
  ]);

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{info[0].version}</Badge>
          <Badge variant="secondary">database: {info[0].database}</Badge>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form action={addNote} className="flex gap-2">
            <Input name="body" placeholder="Write a note" maxLength={500} required />
            <Button type="submit">Save</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {notes.length === 0 && (
          <p className="text-muted-foreground">No notes yet. Saved notes are stored in Postgres.</p>
        )}
        {notes.map((note) => (
          <Card key={note.id}>
            <CardContent className="pt-6 flex justify-between gap-4">
              <p>{note.body}</p>
              <time className="text-sm text-muted-foreground whitespace-nowrap">
                {new Date(note.created_at).toLocaleString("en-US")}
              </time>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
