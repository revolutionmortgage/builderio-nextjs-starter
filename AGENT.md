# Fusion Agent Instructions

This project uses a **shadcn/ui design system**. Always use the existing components from `@/components/ui/` instead of creating raw HTML elements or custom components.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix UI primitives + Tailwind)
- **Language:** TypeScript

## Component Usage Rules

### Always use design system components

Never create raw HTML elements when a component exists. For example:

```tsx
// DO THIS
import { Button } from "@/components/ui/button"
<Button variant="outline">Click me</Button>

// NOT THIS
<button className="border rounded px-4 py-2">Click me</button>
```

### Import path

All UI components are imported from `@/components/ui/`:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
```

## Available Components

### Button
**File:** `components/ui/button.tsx`
**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes:** `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`

```tsx
<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Small Outline</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
```

### Card
**File:** `components/ui/card.tsx`
**Exports:** `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content here</p>
  </CardContent>
</Card>
```

### Input
**File:** `components/ui/input.tsx`

```tsx
<Input type="email" placeholder="Email" />
```

### Label
**File:** `components/ui/label.tsx`

```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

### Textarea
**File:** `components/ui/textarea.tsx`

```tsx
<Textarea placeholder="Type your message here." />
```

### Select
**File:** `components/ui/select.tsx`
**Exports:** `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`, `SelectGroup`, `SelectLabel`, `SelectSeparator`

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox
**File:** `components/ui/checkbox.tsx`

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>
```

### Radio Group
**File:** `components/ui/radio-group.tsx`
**Exports:** `RadioGroup`, `RadioGroupItem`

```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
</RadioGroup>
```

### Switch
**File:** `components/ui/switch.tsx`

```tsx
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
```

### Dialog
**File:** `components/ui/dialog.tsx`
**Exports:** `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`

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

### Sheet (Slide-out panel)
**File:** `components/ui/sheet.tsx`
**Exports:** `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetClose`

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
    </SheetHeader>
    <div>Sheet content</div>
  </SheetContent>
</Sheet>
```

### Dropdown Menu
**File:** `components/ui/dropdown-menu.tsx`
**Exports:** `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup`

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Navigation Menu
**File:** `components/ui/navigation-menu.tsx`
**Exports:** `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuContent`, `NavigationMenuTrigger`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport`, `navigationMenuTriggerStyle`

### Tabs
**File:** `components/ui/tabs.tsx`
**Exports:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

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

### Accordion
**File:** `components/ui/accordion.tsx`
**Exports:** `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes, it follows WAI-ARIA guidelines.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Avatar
**File:** `components/ui/avatar.tsx`
**Exports:** `Avatar`, `AvatarImage`, `AvatarFallback`

```tsx
<Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Badge
**File:** `components/ui/badge.tsx`
**Variants:** `default`, `secondary`, `destructive`, `outline`

```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

### Separator
**File:** `components/ui/separator.tsx`

```tsx
<Separator />
<Separator orientation="vertical" />
```

### Skeleton (Loading placeholder)
**File:** `components/ui/skeleton.tsx`

```tsx
<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />
```

### Sonner (Toast notifications)
**File:** `components/ui/sonner.tsx`

```tsx
// Add <Toaster /> to your layout
import { Toaster } from "@/components/ui/sonner"

// Then use toast() anywhere
import { toast } from "sonner"
toast("Event has been created")
toast.success("Success!")
toast.error("Something went wrong")
```

## Styling Guidelines

### Use Tailwind CSS classes
All styling should use Tailwind CSS utility classes. The design tokens are defined in `globals.css`.

### Color tokens
Use semantic color tokens, not raw colors:
- `bg-background` / `text-foreground` - Main background/text
- `bg-primary` / `text-primary-foreground` - Primary actions
- `bg-secondary` / `text-secondary-foreground` - Secondary elements
- `bg-muted` / `text-muted-foreground` - Subdued elements
- `bg-accent` / `text-accent-foreground` - Accents/highlights
- `bg-destructive` - Destructive/error states
- `border-border` - Borders
- `ring-ring` - Focus rings

### Spacing
Use Tailwind's spacing scale consistently: `p-4`, `m-2`, `gap-4`, etc.

### Responsive design
Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## File Structure

```
app/
  layout.tsx      # Root layout
  page.tsx        # Home page
  globals.css     # Design tokens & global styles
components/
  ui/             # shadcn/ui components (DO NOT MODIFY)
lib/
  utils.ts        # Utility functions (cn helper)
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
