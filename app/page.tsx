"use client";

import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Loader2, Sparkles, Palette, Type, Layers, Zap } from "lucide-react";

const buildingMessages = [
  "Analyzing your prompt...",
  "Designing component structure...",
  "Applying brand colors...",
  "Generating layouts...",
  "Adding interactions...",
  "Optimizing for performance...",
  "Polishing the details...",
  "Almost there...",
];

export default function Home() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % buildingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-mesh bg-noise">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://d1to58gssdw062.cloudfront.net/images/logo_blue.svg"
              alt="Revolution Mortgage"
              className="h-8"
            />
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero - Building State */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary">
            <Sparkles className="h-3 w-3 mr-1" />
            Builder.io Fusion
          </Badge>

          <h1 className="text-gradient-cyan-purple text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Building Your App
          </h1>

          {/* Animated Loading Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
            <p
              key={messageIndex}
              className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {buildingMessages[messageIndex]}
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-12">
            {buildingMessages.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === messageIndex
                    ? "w-8 bg-primary"
                    : i < messageIndex
                      ? "w-1.5 bg-primary/50"
                      : "w-1.5 bg-muted"
                }`}
              />
            ))}
          </div>

          <p className="text-muted-foreground max-w-xl mx-auto">
            Your application is being crafted using our design system.
            This page will automatically update once generation is complete.
          </p>
        </div>
      </section>

      {/* Design System Preview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-gradient-subtle text-2xl font-semibold mb-3">
              Your Design System
            </h2>
            <p className="text-muted-foreground">
              Pre-configured with Rev&apos;s brand guidelines and 56 production-ready components
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Colors */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Brand Colors</CardTitle>
                </div>
                <CardDescription className="mb-4">
                  Cyan primary with complementary palette
                </CardDescription>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary" title="Primary" />
                  <div className="h-8 w-8 rounded-lg bg-secondary" title="Secondary" />
                  <div className="h-8 w-8 rounded-lg bg-destructive" title="Destructive" />
                  <div className="h-8 w-8 rounded-lg bg-success" title="Success" />
                  <div className="h-8 w-8 rounded-lg bg-warning" title="Warning" />
                  <div className="h-8 w-8 rounded-lg bg-info" title="Info" />
                </div>
              </CardHeader>
            </Card>

            {/* Typography */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Type className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Typography</CardTitle>
                </div>
                <CardDescription className="mb-4">
                  Montserrat + Have Heart script fonts
                </CardDescription>
                <div className="space-y-1">
                  <p className="font-bold">Montserrat Bold</p>
                  <p className="font-normal text-muted-foreground">Montserrat Regular</p>
                  <p className="font-script text-xl text-primary">Have Heart</p>
                </div>
              </CardHeader>
            </Card>

            {/* Components */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Components</CardTitle>
                </div>
                <CardDescription className="mb-4">
                  56 shadcn/ui components included
                </CardDescription>
                <div className="flex flex-wrap gap-1.5">
                  {["Button", "Card", "Dialog", "Form", "Table", "Chart", "+50"].map((comp) => (
                    <Badge key={comp} variant="secondary" className="text-xs">
                      {comp}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Gradient Showcase */}
      <section className="py-16 px-6 bg-gradient-radial">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-gradient-subtle text-2xl font-semibold mb-3">
              Premium Gradients
            </h2>
            <p className="text-muted-foreground">
              Eye-catching text and background effects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <h3 className="text-gradient-cyan-purple text-2xl font-bold mb-2">Cyan Purple</h3>
              <p className="text-sm text-muted-foreground">Hero headings</p>
            </div>
            <div className="p-6">
              <h3 className="text-gradient-aurora text-2xl font-bold mb-2">Aurora</h3>
              <p className="text-sm text-muted-foreground">Feature highlights</p>
            </div>
            <div className="p-6">
              <h3 className="text-gradient-ocean text-2xl font-bold mb-2">Ocean</h3>
              <p className="text-sm text-muted-foreground">Calm sections</p>
            </div>
            <div className="p-6">
              <h3 className="text-gradient-sunset text-2xl font-bold mb-2">Sunset</h3>
              <p className="text-sm text-muted-foreground">Call to actions</p>
            </div>
            <div className="p-6">
              <h3 className="text-gradient-silver text-2xl font-bold mb-2">Silver</h3>
              <p className="text-sm text-muted-foreground">Premium feel</p>
            </div>
            <div className="p-6">
              <h3 className="text-gradient-subtle text-2xl font-bold mb-2">Subtle</h3>
              <p className="text-sm text-muted-foreground">Elegant text</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30">
              <Zap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Dark Mode Ready</p>
                <p className="text-sm text-muted-foreground">Automatic theme adaptation</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30">
              <Zap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Tailwind CSS v4</p>
                <p className="text-sm text-muted-foreground">Latest styling features</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30">
              <Zap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Next.js 16</p>
                <p className="text-sm text-muted-foreground">App Router & React 19</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-card/30">
              <Zap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">TypeScript</p>
                <p className="text-sm text-muted-foreground">Full type safety</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://d1to58gssdw062.cloudfront.net/images/logo_blue.svg"
            alt="Revolution Mortgage"
            className="h-6 opacity-60"
          />
          <p className="text-sm text-muted-foreground text-center">
            Official Revolution Mortgage Starter Template
          </p>
        </div>
      </footer>
    </div>
  );
}
