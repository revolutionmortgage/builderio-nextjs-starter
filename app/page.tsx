"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, Lock, LogIn } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SignaturePreview } from "@/components/profile/signature-preview";
import { FIELDS, isLicensed, type DetailKey, type Details } from "@/lib/profile-data";
import {
  getProfile,
  getSession,
  listDemoPeople,
  saveProfile,
  signIn,
  signOut,
  type DemoPerson,
  type Profile,
  type Session,
} from "@/lib/profile-api";

function LockedRow({ id, label, value }: { id: string; label: string; value: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="gap-1.5">
        {label}
        <Lock className="h-3 w-3 text-muted-foreground" />
      </Label>
      <Input id={id} value={value} readOnly disabled />
    </div>
  );
}

function ProfileEditor({ person }: { person: Profile }) {
  const [details, setDetails] = useState<Details>(person.details);
  const [show, setShow] = useState<Record<DetailKey, boolean>>(person.show);
  const [showPhoto, setShowPhoto] = useState(person.showPhoto);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    await saveProfile(person.id, { details, show, showPhoto });
    setSaving(false);
    setSaved(true);
  };

  const licensed = isLicensed(person);
  const visibleFields = FIELDS.filter((f) => !f.licensedOnly || licensed || (f.yextManaged && person.inYext));
  const a = person.address;

  const touch = () => setSaved(false);

  return (
    <div className="grid lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] gap-6 items-start">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Locked information</CardTitle>
            <CardDescription>Maintained by HR and Compliance. Contact them if something is wrong.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LockedRow id="lk-name" label="Name" value={person.name} />
            <LockedRow id="lk-email" label="Work email" value={person.email} />
            <LockedRow id="lk-title" label="Title" value={person.title} />
            <LockedRow id="lk-nmls" label="NMLS ID" value={person.nmls + (licensed ? "" : " (company)")} />
            <LockedRow
              id="lk-address"
              label="Address"
              value={a.street ? `${a.street}, ${a.city}, ${a.state} ${a.zip}` : "Not on file yet (branch address list still being built)"}
            />
            <p className="text-xs text-muted-foreground">
              The Revolution logo, DBA line and Equal Housing Lender text are fixed on every signature.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your details</CardTitle>
            <CardDescription>Untick &ldquo;Show&rdquo; to keep a value saved but leave it off your signature.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {visibleFields.map((f) => {
              const managed = !!f.yextManaged && person.inYext;
              const id = `f-${f.key}`;
              return (
                <div key={f.key} className="space-y-2">
                  <Label htmlFor={id} className="gap-1.5">
                    {f.label}
                    {managed && (
                      <span className="inline-flex items-center gap-1 text-xs font-normal text-muted-foreground">
                        <Lock className="h-3 w-3" /> managed in Yext
                      </span>
                    )}
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id={id}
                      value={details[f.key]}
                      placeholder={managed ? "Not set in Yext" : f.placeholder}
                      readOnly={managed}
                      onChange={(e) => {
                        setDetails((d) => ({ ...d, [f.key]: e.target.value }));
                        touch();
                      }}
                    />
                    {!f.alwaysShown && (
                      <Label htmlFor={`s-${f.key}`} className="shrink-0 text-xs font-medium">
                        <Checkbox
                          id={`s-${f.key}`}
                          checked={show[f.key]}
                          onCheckedChange={(c) => setShow((s) => ({ ...s, [f.key]: c === true }))}
                        />
                        Show
                      </Label>
                    )}
                  </div>
                  {managed ? (
                    <p className="text-xs text-muted-foreground">
                      To change this, update your Yext profile. It appears on your signature at the next sync.
                    </p>
                  ) : (
                    f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>
                  )}
                  {f.key === "vanity" && !person.inYext && (
                    <p className="text-xs text-muted-foreground">Leave blank to use the company page. Always shown.</p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label id="photo-label">Show my photo</Label>
            <ToggleGroup
              type="single"
              variant="outline"
              aria-labelledby="photo-label"
              value={showPhoto ? "yes" : "no"}
              onValueChange={(v) => {
                if (v) {
                  setShowPhoto(v === "yes");
                  touch();
                }
              }}
            >
              <ToggleGroupItem value="yes" className="px-6">Yes</ToggleGroupItem>
              <ToggleGroupItem value="no" className="px-6">No</ToggleGroupItem>
            </ToggleGroup>
            <p className="text-xs text-muted-foreground">Your photo comes from your Microsoft 365 profile.</p>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button onClick={onSave} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
          {saved && (
            <Alert role="status">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Saved</AlertTitle>
              <AlertDescription>Your signature updates at the next sync.</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="lg:sticky lg:top-20">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Live preview</CardTitle>
              <Badge variant="secondary">
                {licensed ? "Licensed view" : person.inYext ? "No personal NMLS, has Yext profile" : "Unlicensed view"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-border overflow-hidden">
              <SignaturePreview person={person} details={details} show={show} showPhoto={showPhoto} />
            </div>
            <p className="text-xs text-muted-foreground">
              Preview shows unsaved edits. The real signature renders in your email app and may differ slightly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


export default function Home() {
  const [people, setPeople] = useState<DemoPerson[]>([]);
  const [personId, setPersonId] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const [list, existing] = await Promise.all([listDemoPeople(), getSession()]);
      setPeople(list);
      setPersonId(existing?.personId ?? list[0]?.id ?? "");
      setSession(existing);
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    getProfile(session.personId).then((p) => {
      if (!cancelled) setProfile(p);
    });
    return () => {
      cancelled = true;
    };
  }, [session]);

  const handleSignIn = useCallback(async (id: string) => {
    setBusy(true);
    setSession(await signIn(id));
    setBusy(false);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
  };

  const onPickPerson = (id: string) => {
    setPersonId(id);
    if (session) handleSignIn(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-warning text-warning-foreground text-center text-xs font-semibold px-4 py-1.5" role="note">
        Demo with sample data. Nothing here is real and nothing is saved anywhere.
      </div>
      <header className="border-b border-border sticky top-0 z-50 bg-background">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://d1to58gssdw062.cloudfront.net/images/logo_blue.svg" alt="Revolution Mortgage" className="h-8" />
          <div className="flex items-center gap-3">
            <Label htmlFor="demo-person" className="hidden md:flex text-xs text-muted-foreground">
              Demo as
            </Label>
            <Select value={personId} onValueChange={onPickPerson} disabled={!ready}>
              <SelectTrigger id="demo-person" className="w-[260px] max-w-[40vw]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {people.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {session && (
              <>
                <span className="hidden lg:inline text-sm text-muted-foreground">{session.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign out
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {!ready ? null : !session ? (
        <main className="py-24 px-6">
          <div className="max-w-md mx-auto text-center space-y-6">
            <h1 className="text-gradient-cyan-purple text-4xl font-bold tracking-tight">Your email signature</h1>
            <p className="text-muted-foreground">
              Sign in with your Revolution Mortgage account to review and update the details on your email signature.
            </p>
            <Button size="lg" className="glow-cyan" onClick={() => handleSignIn(personId)} disabled={busy}>
              <LogIn className="h-4 w-4" />
              {busy ? "Signing in..." : "Sign in with Microsoft"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Demo only: this signs you in as the person selected in &ldquo;Demo as&rdquo;. No real authentication happens.
            </p>
          </div>
        </main>
      ) : (
        <main className="py-10 px-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-gradient-cyan-purple text-4xl font-bold tracking-tight">Your email signature</h1>
              <p className="text-muted-foreground mt-2">
                Review the details below and choose what appears. Locked fields come from HR systems and can&apos;t be changed here.
              </p>
            </div>
            {profile && profile.id === session.personId && <ProfileEditor key={profile.id} person={profile} />}
          </div>
        </main>
      )}
    </div>
  );
}
