# Navbar CSS Class Reference

## Complete CSS Class Breakdown

### 1. SCROLL DETECTION STATE

```typescript
const [isScrolled, setIsScrolled] = useState(false);

// Triggers when window.scrollY > 10
```

### 2. BASE STYLES (Always Applied)

```typescript
const baseStyles = "transition-all duration-300 ease-in-out";
```

**Breakdown:**
- `transition-all` - Animate all CSS property changes
- `duration-300` - Animation duration: 300ms
- `ease-in-out` - Easing function: smooth acceleration/deceleration

### 3. FLAT STATE STYLES (When isScrolled = false)

```typescript
const flatStyles = "w-full border-b border-border bg-section";
```

**Breakdown:**
| Class | Purpose | Value |
|-------|---------|-------|
| `w-full` | Width | 100% of viewport |
| `border-b` | Border | Bottom border only |
| `border-border` | Border color | #e8e6dc (from design tokens) |
| `bg-section` | Background | #faf9f5 (from design tokens) |

### 4. FLOATING STATE STYLES (When isScrolled = true)

```typescript
const floatingStyles = "max-w-2xl mx-auto px-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg";
```

**Breakdown:**
| Class | Purpose | Value |
|-------|---------|-------|
| `max-w-2xl` | Max width | 28rem (448px) |
| `mx-auto` | Margin | Horizontal centering |
| `px-4` | Padding horizontal | 1rem (16px each side) |
| `rounded-2xl` | Border radius | 1rem (16px) |
| `bg-white/80` | Background | White with 80% opacity |
| `backdrop-blur-md` | Blur effect | 8px blur filter |
| `border` | Border | 1px all sides |
| `border-white/20` | Border color | White with 20% opacity |
| `shadow-lg` | Box shadow | `0 10px 15px -3px rgba(0,0,0,0.1)` |

### 5. FLOATING POSITION ADJUSTMENTS (When isScrolled = true)

```typescript
isScrolled && "top-4 left-4 right-4";
```

**Breakdown:**
| Class | Purpose | Value |
|-------|---------|-------|
| `top-4` | Top position | 1rem (16px) |
| `left-4` | Left position | 1rem (16px) |
| `right-4` | Right position | 1rem (16px) |

### 6. CONTAINER INNER PADDING

**Flat State:**
```typescript
isScrolled ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16"
```

| Class | Purpose | Value |
|-------|---------|-------|
| `max-w-7xl` | Container max width | 80rem (1280px) |
| `mx-auto` | Centering | Horizontal |
| `px-4` | Padding (mobile) | 1rem |
| `sm:px-6` | Padding (small screens) | 1.5rem |
| `lg:px-8` | Padding (large screens) | 2rem |
| `h-16` | Height | 4rem (64px) |

**Floating State:**
```typescript
isScrolled && "px-6 py-3"
```

| Class | Purpose | Value |
|-------|---------|-------|
| `px-6` | Padding horizontal | 1.5rem |
| `py-3` | Padding vertical | 0.75rem |

### 7. NAVIGATION ITEMS STYLING

**Flat State:**
```typescript
"flex items-baseline space-x-4"
```

| Class | Purpose | Value |
|-------|---------|-------|
| `flex` | Display | Flexbox |
| `items-baseline` | Alignment | Baseline aligned |
| `space-x-4` | Spacing | 1rem gap between items |

**Floating State:**
```typescript
isScrolled && "space-x-2"
```

| Class | Purpose | Value |
|-------|---------|-------|
| `space-x-2` | Spacing | 0.5rem gap (compact) |

### 8. INDIVIDUAL NAV ITEM STYLING

**Flat State:**
```typescript
"px-3 py-2 rounded-md text-sm font-medium transition-colors"
```

| Class | Purpose | Value |
|-------|---------|-------|
| `px-3` | Padding horizontal | 0.75rem |
| `py-2` | Padding vertical | 0.5rem |
| `rounded-md` | Border radius | 0.375rem (6px) |
| `text-sm` | Font size | 0.875rem |
| `font-medium` | Font weight | 500 |
| `transition-colors` | Hover animation | Color change transition |

**Floating State:**
```typescript
isScrolled && "px-2 py-1 text-xs"
```

| Class | Purpose | Value |
|-------|---------|-------|
| `px-2` | Padding horizontal | 0.5rem (compact) |
| `py-1` | Padding vertical | 0.25rem (compact) |
| `text-xs` | Font size | 0.75rem (compact) |

### 9. NAV ITEM STATE STYLING

**Active Item:**
```typescript
item.active && "bg-section-light text-text-head"
```

| Class | Purpose | Value |
|-------|---------|-------|
| `bg-section-light` | Background | #f0eee6 |
| `text-text-head` | Text color | #141413 |

**Inactive Item (Hover):**
```typescript
"text-text-body hover:bg-section-light hover:text-text-head"
```

| Class | Purpose | Value |
|-------|---------|-------|
| `text-text-body` | Text color | #5e5d59 |
| `hover:bg-section-light` | Hover background | #f0eee6 |
| `hover:text-text-head` | Hover text | #141413 |

### 10. MOBILE MENU BUTTON

```typescript
"inline-flex items-center justify-center rounded-md p-2 text-text-body hover:bg-section-light hover:text-text-head focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
```

| Class | Purpose | Value |
|-------|---------|-------|
| `inline-flex` | Display | Inline flexbox |
| `items-center` | Alignment | Center vertically |
| `justify-center` | Alignment | Center horizontally |
| `rounded-md` | Border radius | 0.375rem (6px) |
| `p-2` | Padding | 0.5rem all sides |
| `text-text-body` | Text color | #5e5d59 |
| `hover:bg-section-light` | Hover background | #f0eee6 |
| `hover:text-text-head` | Hover text | #141413 |
| `focus:outline-none` | Focus style | Remove default outline |
| `focus:ring-2` | Focus ring | 2px outline |
| `focus:ring-primary` | Focus color | #141413 |
| `focus:ring-offset-2` | Ring offset | 2px gap |
| `transition-colors` | Animation | Color changes animate |

## Complete State Transitions

### Transition 1: Navbar on Scroll Down (scrollY: 0 → 15)

```
BEFORE (isScrolled = false):
┌─────────────────────────────────────────────────────┐
│ w-full border-b border-border bg-section            │
│ max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16        │
└─────────────────────────────────────────────────────┘

DURING ANIMATION (300ms transition-all):
├─ Width: 100% → 28rem
├─ Background: #faf9f5 → rgba(255,255,255,0.8)
├─ Border radius: 0 → 1rem
├─ Border: bottom-only → full with opacity
├─ Shadow: none → shadow-lg
├─ Position: static → fixed with insets
└─ Padding: large → compact

AFTER (isScrolled = true):
             ╭─────────────────────────╮
             │ max-w-2xl mx-auto px-4  │
             │ rounded-2xl             │
             │ bg-white/80             │
             │ backdrop-blur-md        │
             │ border border-white/20  │
             │ shadow-lg               │
             │ top-4 left-4 right-4    │
             ╰─────────────────────────╯
```

### Transition 2: Navigation Items on Scroll Down

```
FLAT STATE:
flex items-baseline space-x-4
├─ Item 1: px-3 py-2 text-sm font-medium
├─ Item 2: px-3 py-2 text-sm font-medium
└─ Item 3: px-3 py-2 text-sm font-medium

FLOATING STATE (compact):
flex items-baseline space-x-2
├─ Item 1: px-2 py-1 text-xs font-medium
├─ Item 2: px-2 py-1 text-xs font-medium
└─ Item 3: px-2 py-1 text-xs font-medium
```

## Color Reference

| Token | Variable | Hex Value | Usage |
|-------|----------|-----------|-------|
| `bg-section` | --color-section | #faf9f5 | Flat navbar background |
| `bg-white/80` | N/A | rgba(255,255,255,0.8) | Floating navbar background |
| `bg-section-light` | --color-section-light | #f0eee6 | Active nav item background |
| `border-border` | --color-border | #e8e6dc | Flat navbar border |
| `border-white/20` | N/A | rgba(255,255,255,0.2) | Floating navbar border |
| `text-text-head` | --color-text-head | #141413 | Active text color |
| `text-text-body` | --color-text-body | #5e5d59 | Inactive text color |

## Animation Timing

| Property | Value | Effect |
|----------|-------|--------|
| Duration | 300ms | Fast enough to feel responsive |
| Easing | cubic-bezier(0.4, 0, 0.2, 1) | Smooth acceleration/deceleration |
| Animated properties | all | Width, background, border, shadow, etc. |

---

**Total CSS Classes Used**: 50+
**Tailwind Utilities**: 100% (no custom CSS needed)
**Bundle Impact**: 0 bytes (existing Tailwind v4)

