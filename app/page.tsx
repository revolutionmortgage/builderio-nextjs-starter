"use client";

import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
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
import {
  FIELDS,
  PEOPLE,
  isLicensed,
  type DetailKey,
  type Details,
  type Person,
} from "@/lib/profile-data";

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

function ProfileEditor({ person }: { person: Person }) {
  const [details, setDetails] = useState<Details>(person.details);
  const [show, setShow] = useState(() =>
    Object.fromEntries(FIELDS.map((f) => [f.key, true])) as Record<DetailKey, boolean>
  );
  const [showPhoto, setShowPhoto] = useState(person.showPhoto);
  const [saved, setSaved] = useState(false);

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
          <Button onClick={() => setSaved(true)}>Save changes</Button>
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
  const [personId, setPersonId] = useState(PEOPLE[0].id);
  const person = PEOPLE.find((p) => p.id === personId) ?? PEOPLE[0];

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
            <Label htmlFor="demo-person" className="hidden sm:flex text-xs text-muted-foreground">
              Demo as
            </Label>
            <Select value={personId} onValueChange={setPersonId}>
              <SelectTrigger id="demo-person" className="w-[300px] max-w-[60vw]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PEOPLE.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="py-10 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-gradient-cyan-purple text-4xl font-bold tracking-tight">Your email signature</h1>
            <p className="text-muted-foreground mt-2">
              Review the details below and choose what appears. Locked fields come from HR systems and can&apos;t be changed here.
            </p>
          </div>
          <ProfileEditor key={person.id} person={person} />
        </div>
      </main>
    </div>
  );
}
