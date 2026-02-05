# Builder.io Fusion Design System Guide

This starter template is equipped with a complete design system based on **shadcn/ui** and the **Rev brand**. Use this guide to create stunning, production-quality UIs.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix UI primitives + Tailwind)
- **Language:** TypeScript
- **Icons:** Lucide React
- **Theme:** next-themes (dark mode support)

## Quick Start

All components are in `components/ui/`. Import them like:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
```

**RULE: Always use design system components. Never create raw HTML elements when a component exists.**

```tsx
// DO THIS
import { Button } from "@/components/ui/button"
<Button variant="outline">Click me</Button>

// NOT THIS
<button className="border rounded px-4 py-2">Click me</button>
```

---

## Brand Colors

The design system uses Rev's cyan-based brand with complementary colors:

| Color | Usage | Class |
|-------|-------|-------|
| **Primary (Cyan)** | CTAs, links, interactive elements | `bg-primary`, `text-primary` |
| **Secondary** | Subtle backgrounds, secondary actions | `bg-secondary`, `text-secondary` |
| **Accent** | Hover states, highlights | `bg-accent`, `text-accent` |
| **Destructive (Pink)** | Errors, warnings, delete actions | `bg-destructive`, `text-destructive` |
| **Muted** | Disabled states, placeholders | `bg-muted`, `text-muted-foreground` |

### Extended Brand Palette

```tsx
// Brand variations
className="text-brand"      // Primary cyan text
className="bg-brand"        // Primary cyan background
className="bg-brand-light"  // Light cyan
className="bg-brand-dark"   // Dark cyan

// Status colors
className="bg-success"      // Green - success states
className="bg-warning"      // Amber - warnings
className="bg-info"         // Blue - informational

// Gradients
className="gradient-brand"       // Cyan to light cyan
className="gradient-brand-dark"  // Dark cyan to cyan
```

### Semantic Color Tokens

Always use semantic tokens, not raw colors:

- `bg-background` / `text-foreground` - Main background/text
- `bg-primary` / `text-primary-foreground` - Primary actions
- `bg-secondary` / `text-secondary-foreground` - Secondary elements
- `bg-muted` / `text-muted-foreground` - Subdued elements
- `bg-accent` / `text-accent-foreground` - Accents/highlights
- `bg-destructive` - Destructive/error states
- `border-border` - Borders
- `ring-ring` - Focus rings

---

## Typography

**Primary Font:** Montserrat (weights: 300, 400, 500, 600, 700)
**Script Fonts:** Have Heart One & Two (for decorative/signature text)

```tsx
// Font weights
className="font-light"     // 300
className="font-normal"    // 400
className="font-medium"    // 500
className="font-semibold"  // 600
className="font-bold"      // 700

// Script fonts (decorative - for signatures, special headings)
className="font-script"     // Have Heart One
className="font-script-alt" // Have Heart Two
```

---

## Dark Mode

Dark mode is fully supported. Components automatically adapt.

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
setTheme("dark"); // or "light" or "system"
```

---

## Utility Classes

```tsx
// Glass morphism effect (frosted glass)
className="glass"

// Brand-colored shadow
className="shadow-brand"

// Hover lift animation (card lifts up on hover)
className="hover-lift"

// Brand utilities
className="text-brand bg-brand border-brand"

// Gradients
className="gradient-brand gradient-brand-dark"
```

---

## Icons

This project uses **Lucide React** icons:

```tsx
import { Home, Settings, User, ChevronRight, Check, X } from "lucide-react";

<Button>
  <Home className="mr-2 h-4 w-4" />
  Home
</Button>
```

---

## All Available Components (56 Total)

### Layout & Structure
| Component | File | Exports |
|-----------|------|---------|
| **Card** | `card.tsx` | `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent` |
| **Separator** | `separator.tsx` | `Separator` |
| **Aspect Ratio** | `aspect-ratio.tsx` | `AspectRatio` |
| **Resizable** | `resizable.tsx` | `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` |
| **Scroll Area** | `scroll-area.tsx` | `ScrollArea`, `ScrollBar` |
| **Sidebar** | `sidebar.tsx` | `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton` |

### Navigation
| Component | File | Exports |
|-----------|------|---------|
| **Navigation Menu** | `navigation-menu.tsx` | `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuContent`, `NavigationMenuTrigger`, `NavigationMenuLink` |
| **Breadcrumb** | `breadcrumb.tsx` | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator` |
| **Tabs** | `tabs.tsx` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| **Pagination** | `pagination.tsx` | `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext` |
| **Menubar** | `menubar.tsx` | `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem` |

### Forms & Inputs
| Component | File | Variants/Props |
|-----------|------|----------------|
| **Button** | `button.tsx` | Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes: `default`, `xs`, `sm`, `lg`, `icon` |
| **Input** | `input.tsx` | Standard input element |
| **Textarea** | `textarea.tsx` | Multi-line input |
| **Select** | `select.tsx` | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` |
| **Native Select** | `native-select.tsx` | Native HTML select |
| **Checkbox** | `checkbox.tsx` | `Checkbox` |
| **Radio Group** | `radio-group.tsx` | `RadioGroup`, `RadioGroupItem` |
| **Switch** | `switch.tsx` | `Switch` |
| **Slider** | `slider.tsx` | `Slider` |
| **Label** | `label.tsx` | `Label` |
| **Form** | `form.tsx` | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage` |
| **Input OTP** | `input-otp.tsx` | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` |
| **Calendar** | `calendar.tsx` | `Calendar` |
| **Combobox** | `combobox.tsx` | Searchable select |
| **Input Group** | `input-group.tsx` | Input with addons |
| **Field** | `field.tsx` | Form field wrapper |

### Feedback & Overlays
| Component | File | Exports |
|-----------|------|---------|
| **Dialog** | `dialog.tsx` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` |
| **Alert Dialog** | `alert-dialog.tsx` | `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel` |
| **Sheet** | `sheet.tsx` | `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` |
| **Drawer** | `drawer.tsx` | `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription` |
| **Popover** | `popover.tsx` | `Popover`, `PopoverTrigger`, `PopoverContent` |
| **Tooltip** | `tooltip.tsx` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` |
| **Hover Card** | `hover-card.tsx` | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` |
| **Alert** | `alert.tsx` | `Alert`, `AlertTitle`, `AlertDescription` |
| **Sonner** | `sonner.tsx` | `Toaster` (use `toast()` from sonner) |
| **Progress** | `progress.tsx` | `Progress` |
| **Skeleton** | `skeleton.tsx` | `Skeleton` |
| **Spinner** | `spinner.tsx` | `Spinner` |

### Data Display
| Component | File | Exports |
|-----------|------|---------|
| **Table** | `table.tsx` | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption` |
| **Avatar** | `avatar.tsx` | `Avatar`, `AvatarImage`, `AvatarFallback` |
| **Badge** | `badge.tsx` | Variants: `default`, `secondary`, `destructive`, `outline` |
| **Chart** | `chart.tsx` | Recharts wrapper components |
| **Accordion** | `accordion.tsx` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| **Collapsible** | `collapsible.tsx` | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |

### Actions & Menus
| Component | File | Exports |
|-----------|------|---------|
| **Dropdown Menu** | `dropdown-menu.tsx` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator` |
| **Context Menu** | `context-menu.tsx` | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem` |
| **Command** | `command.tsx` | `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem` |
| **Toggle** | `toggle.tsx` | `Toggle` |
| **Toggle Group** | `toggle-group.tsx` | `ToggleGroup`, `ToggleGroupItem` |
| **Button Group** | `button-group.tsx` | `ButtonGroup` |

### Utilities
| Component | File | Purpose |
|-----------|------|---------|
| **Kbd** | `kbd.tsx` | Keyboard shortcut display |
| **Direction** | `direction.tsx` | RTL/LTR context |
| **Empty** | `empty.tsx` | Empty state placeholder |

---

## Component Examples

### Hero Section
```tsx
<section className="py-24 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <Badge variant="secondary" className="mb-4">New Feature</Badge>
    <h1 className="text-5xl font-bold tracking-tight mb-6">
      Build stunning interfaces
    </h1>
    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
      Create beautiful, accessible components with our design system.
    </p>
    <div className="flex gap-4 justify-center">
      <Button size="lg">Get Started</Button>
      <Button size="lg" variant="outline">Learn More</Button>
    </div>
  </div>
</section>
```

### Feature Cards Grid
```tsx
<div className="grid md:grid-cols-3 gap-6">
  <Card className="hover-lift">
    <CardHeader>
      <CardTitle>Feature One</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Description of this amazing feature.
      </p>
    </CardContent>
  </Card>
  {/* Repeat for other cards */}
</div>
```

### Pricing Card
```tsx
<Card className="border-primary shadow-brand">
  <CardHeader>
    <Badge className="w-fit">Popular</Badge>
    <CardTitle className="text-2xl">Pro Plan</CardTitle>
    <div className="text-4xl font-bold">
      $29<span className="text-lg font-normal text-muted-foreground">/mo</span>
    </div>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li className="flex items-center gap-2">
        <Check className="h-4 w-4 text-primary" />
        <span>Unlimited projects</span>
      </li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Subscribe</Button>
  </CardFooter>
</Card>
```

### Form with Validation
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="you@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

### Dialog Example
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description text.</DialogDescription>
    </DialogHeader>
    <div>Dialog content here</div>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Tabs Example
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for tab 1</TabsContent>
  <TabsContent value="tab2">Content for tab 2</TabsContent>
</Tabs>
```

### Toast Notifications
```tsx
// Add <Toaster /> to your layout
import { Toaster } from "@/components/ui/sonner"

// Then use toast() anywhere
import { toast } from "sonner"
toast("Event has been created")
toast.success("Success!")
toast.error("Something went wrong")
```

---

## Design Principles

1. **Use semantic colors** - `primary`, `secondary`, `muted`, not raw hex values
2. **Leverage variants** - Components have built-in variants (e.g., `Button variant="outline"`)
3. **Consistent spacing** - Use Tailwind's spacing scale (4, 6, 8, 12, 16, 24)
4. **Dark mode aware** - All colors automatically adapt to dark mode
5. **Accessible** - All components are keyboard navigable and screen reader friendly

## Stunning Gradients

**USE GRADIENTS LIBERALLY** - They make UIs look premium and modern. Apply them to headings, backgrounds, borders, and buttons.

### Gradient Text (For Headings)

Make headings pop with gradient text. These look incredible on dark backgrounds:

```tsx
// Cyan to Purple - Modern tech feel (RECOMMENDED for hero headings)
<h1 className="text-gradient-cyan-purple text-5xl font-bold">
  Build the Future
</h1>

// Aurora - Ethereal northern lights effect
<h1 className="text-gradient-aurora text-6xl font-bold">
  Magical Experience
</h1>

// Silver/Platinum - Premium metallic look
<h2 className="text-gradient-silver text-4xl font-semibold">
  Enterprise Grade
</h2>

// Ocean - Deep and calm
<h2 className="text-gradient-ocean text-3xl font-semibold">
  Fluid Design
</h2>

// Sunset - Warm and inviting
<h2 className="text-gradient-sunset text-3xl font-semibold">
  Creative Energy
</h2>

// Subtle white to gray - Elegant on dark backgrounds
<h1 className="text-gradient-subtle text-5xl font-bold">
  Clean & Minimal
</h1>
```

### Background Gradients

```tsx
// Mesh gradient - Modern blob/orb effect (great for hero sections)
<section className="bg-gradient-mesh min-h-screen">

// Aurora background - Subtle color shifts
<div className="bg-gradient-aurora">

// Radial glow - Spotlight from top
<section className="bg-gradient-radial">

// Animated gradient - Slowly shifting colors (attention-grabbing)
<div className="bg-gradient-animated">

// Add noise texture for depth (combine with any gradient)
<section className="bg-gradient-mesh bg-noise">
```

### Gradient Borders (For Cards)

```tsx
// Glowing gradient border effect
<div className="border-gradient p-6">
  <h3>Premium Card</h3>
</div>
```

### Glow Effects

```tsx
// Cyan glow (matches brand)
<Button className="glow-cyan">Primary Action</Button>

// Purple glow
<Card className="glow-purple">Featured</Card>

// Pink glow
<Badge className="glow-pink">New</Badge>
```

### Example: Stunning Hero Section

```tsx
<section className="bg-gradient-mesh bg-noise min-h-screen flex items-center">
  <div className="max-w-4xl mx-auto text-center px-6">
    <Badge variant="secondary" className="mb-6">Now Available</Badge>
    <h1 className="text-gradient-cyan-purple text-6xl md:text-7xl font-bold tracking-tight mb-6">
      The Future of Finance
    </h1>
    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
      Revolutionary tools for the modern investor.
    </p>
    <div className="flex gap-4 justify-center">
      <Button size="lg" className="glow-cyan">Get Started</Button>
      <Button size="lg" variant="outline">Learn More</Button>
    </div>
  </div>
</section>
```

---

## Creating Stunning UIs

### Do:
- **USE GRADIENT TEXT ON HEADINGS** - especially hero headlines
- **USE MESH/AURORA BACKGROUNDS** - for hero sections and key areas
- Apply `glow-cyan` to primary CTAs for emphasis
- Use `border-gradient` for featured cards
- Apply `hover-lift` to interactive cards
- Use `glass` for modern overlay effects
- Combine `Card` with `shadow-brand` for elevated sections
- Use `Badge` to highlight new/important items
- Apply proper spacing (py-24 for sections, gap-6 for grids)
- Use responsive classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Add `bg-noise` to gradients for texture and depth

### Don't:
- Use raw color values - always use semantic tokens
- Forget dark mode - test both themes
- Overcrowd layouts - embrace whitespace
- Skip loading states - use Skeleton and Spinner
- Create custom components when shadcn/ui has one
- Use plain white/black headings when a gradient would look better

---

## File Structure

```
app/
  layout.tsx      # Root layout with fonts & theme
  page.tsx        # Home page
  globals.css     # Design tokens & custom styles
components/
  ui/             # shadcn/ui components (56 total)
  theme-provider.tsx  # Dark mode provider
hooks/
  use-mobile.ts   # Mobile detection hook
lib/
  utils.ts        # Utility functions (cn helper)
public/
  fonts/          # Custom fonts (Have Heart)
```

## Utility Function

Use the `cn()` helper for conditional class names:

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />
```
