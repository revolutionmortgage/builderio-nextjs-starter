"use client";

import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

const employee = {
  name: "Jane Doe",
  title: "Loan Officer",
  email: "jane.doe@revolutionmortgage.com",
  nmlsId: "1234567",
};

export default function Home() {
  const [form, setForm] = useState({
    cellPhone: "(555) 123-4567",
    officePhone: "(555) 987-6543",
    linkedin: "https://www.linkedin.com/in/janedoe",
    teamName: "Team Revolution",
  });
  const [saved, setSaved] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setSaved(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://d1to58gssdw062.cloudfront.net/images/logo_blue.svg"
            alt="Revolution Mortgage"
            className="h-8"
          />
          <ThemeToggle />
        </div>
      </header>

      <main className="py-12 px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-gradient-cyan-purple text-4xl font-bold tracking-tight">
            Employee Profile
          </h1>

          <Card>
            <form onSubmit={onSubmit}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg font-semibold">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{employee.name}</CardTitle>
                    <CardDescription className="mt-1">
                      <Badge variant="secondary">{employee.title}</Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Managed by HR (read-only)
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={employee.email} readOnly disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" value={employee.title} readOnly disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nmls">NMLS ID</Label>
                      <Input id="nmls" value={employee.nmlsId} readOnly disabled />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <p className="text-sm font-medium text-muted-foreground">Editable details</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cell">Cell phone</Label>
                      <Input id="cell" type="tel" value={form.cellPhone} onChange={update("cellPhone")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="office">Office phone</Label>
                      <Input id="office" type="tel" value={form.officePhone} onChange={update("officePhone")} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input id="linkedin" type="url" value={form.linkedin} onChange={update("linkedin")} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="team">Team name</Label>
                      <Input id="team" value={form.teamName} onChange={update("teamName")} />
                    </div>
                  </div>
                </div>

                {saved && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Profile saved</AlertTitle>
                    <AlertDescription>Your changes have been saved successfully.</AlertDescription>
                  </Alert>
                )}
              </CardContent>

              <CardFooter className="mt-6 justify-end">
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
