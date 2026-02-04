import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, Palette, Moon, Blocks, Zap, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Fusion Starter</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            Builder.io Fusion + shadcn/ui
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
            Design System Ready
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            This starter template includes 56 components, Rev brand colors, dark mode, and everything you need to create stunning UIs with AI.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gap-2">
              <Zap className="h-4 w-4" />
              Start Prompting
            </Button>
            <Button size="lg" variant="outline">
              View Components
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover-lift bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Blocks className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>56 Components</CardTitle>
                <CardDescription>
                  Every shadcn/ui component ready to use. Buttons, cards, dialogs, forms, tables, charts, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Brand Colors</CardTitle>
                <CardDescription>
                  Rev&apos;s cyan brand palette with complementary colors for success, warning, info, and destructive states.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Moon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Dark Mode</CardTitle>
                <CardDescription>
                  Full dark mode support out of the box. All components automatically adapt to the current theme.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Color Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Color Palette</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-xl bg-primary shadow-lg" />
              <span className="text-sm text-muted-foreground">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-xl bg-secondary shadow-lg" />
              <span className="text-sm text-muted-foreground">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-xl bg-accent shadow-lg" />
              <span className="text-sm text-muted-foreground">Accent</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-xl bg-destructive shadow-lg" />
              <span className="text-sm text-muted-foreground">Destructive</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-xl bg-success shadow-lg" />
              <span className="text-sm text-muted-foreground">Success</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-xl bg-warning shadow-lg" />
              <span className="text-sm text-muted-foreground">Warning</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-xl bg-info shadow-lg" />
              <span className="text-sm text-muted-foreground">Info</span>
            </div>
          </div>
        </div>
      </section>

      {/* Button Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Button Variants</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6 mt-16">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-muted-foreground">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-destructive fill-destructive" />
          <span>using Builder.io Fusion</span>
        </div>
      </footer>
    </div>
  );
}
