import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { currentUser } from "@/lib/user";

export const dynamic = "force-dynamic";

// Sample page showing who is signed in, and reading their Microsoft 365 profile with the
// token RevStack sign-in passes along. Safe to delete once your app has real pages.

type Profile = { id: string; displayName?: string; jobTitle?: string; officeLocation?: string };

async function profile(token: string | null): Promise<Profile | null> {
  if (!token) return null;
  try {
    const res = await fetch("https://graph.microsoft.com/v1.0/me?$select=id,displayName,jobTitle,officeLocation", {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
      // Don't hold up the page; without the profile it still shows who is signed in.
      signal: AbortSignal.timeout(3000),
    });
    return res.ok ? await res.json() : null;
  } catch {
    // Microsoft Graph unreachable: show what sign-in already told us.
    return null;
  }
}

export default async function MePage() {
  const user = await currentUser();
  const me = await profile(user?.graphToken ?? null);

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Who is signed in</h1>
      {!user ? (
        <p className="text-muted-foreground">
          Nobody. This copy of the site is not behind RevStack sign-in (it is public, or running in
          Builder.io Fusion or on a laptop).
        </p>
      ) : (
        <Card>
          <CardContent className="pt-6 space-y-2">
            <p className="text-xl font-semibold">{me?.displayName ?? user.email}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{user.email}</Badge>
              {me?.jobTitle && <Badge variant="secondary">{me.jobTitle}</Badge>}
              {me?.officeLocation && <Badge variant="secondary">{me.officeLocation}</Badge>}
            </div>
            {me && <p className="text-sm text-muted-foreground">Microsoft Entra user ID: {me.id}</p>}
            <p className="text-sm text-muted-foreground">
              Microsoft 365 profile: {me ? "read with your sign-in" : "not available"}
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
