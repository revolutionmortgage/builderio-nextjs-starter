import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

      {/* Hero with Mesh Gradient */}
      <section className="relative py-32 px-6 bg-gradient-mesh bg-noise overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6">
            Builder.io Fusion + shadcn/ui
          </Badge>
          <h1 className="text-gradient-cyan-purple text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Design System Ready
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            56 components, stunning gradients, dark mode, and everything you need to create incredible UIs with AI.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gap-2 glow-cyan">
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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gradient-subtle text-3xl font-bold text-center mb-12">
            Everything You Need
          </h2>
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
                <CardTitle>Stunning Gradients</CardTitle>
                <CardDescription>
                  Text gradients, mesh backgrounds, glow effects, and animated gradients for premium UIs.
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

      {/* Gradient Text Showcase */}
      <section className="py-20 px-6 bg-gradient-radial">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gradient-subtle text-3xl font-bold text-center mb-12">
            Gradient Text Styles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">text-gradient-cyan-purple</p>
                <h3 className="text-gradient-cyan-purple text-4xl font-bold">Build the Future</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">text-gradient-aurora</p>
                <h3 className="text-gradient-aurora text-4xl font-bold">Magical Experience</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">text-gradient-ocean</p>
                <h3 className="text-gradient-ocean text-4xl font-bold">Fluid Design</h3>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">text-gradient-silver</p>
                <h3 className="text-gradient-silver text-4xl font-bold">Enterprise Grade</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">text-gradient-sunset</p>
                <h3 className="text-gradient-sunset text-4xl font-bold">Creative Energy</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">text-gradient-subtle</p>
                <h3 className="text-gradient-subtle text-4xl font-bold">Clean & Minimal</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gradient-subtle text-3xl font-bold text-center mb-12">Color Palette</h2>
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

      {/* Glow Effects */}
      <section className="py-20 px-6 bg-gradient-aurora">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gradient-subtle text-3xl font-bold text-center mb-12">Glow Effects</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="glow-cyan">Cyan Glow</Button>
            <Button size="lg" variant="secondary" className="glow-purple">Purple Glow</Button>
            <Button size="lg" variant="outline" className="glow-pink">Pink Glow</Button>
          </div>
        </div>
      </section>

      {/* Button Variants */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gradient-subtle text-3xl font-bold text-center mb-12">Button Variants</h2>
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
      <footer className="border-t border-border/40 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-muted-foreground">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-destructive fill-destructive" />
          <span>using Builder.io Fusion</span>
        </div>
      </footer>
    </div>
  );
}
