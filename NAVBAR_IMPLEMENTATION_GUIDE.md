# Navbar UI Implementation Guide

## Quick Start

The navbar component in `components/shared/Navbar.tsx` now includes built-in scroll detection and state-based styling. No additional setup required!

## How It Works

### Step 1: Scroll Detection (Automatic)
```typescript
// Triggers when user scrolls > 10px
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Step 2: State-Based Styling
```typescript
// Applies different styles based on scroll position
isScrolled ? floatingStyles : flatStyles
```

### Step 3: Smooth Animation
```typescript
// All transitions are automatically smooth (300ms)
const baseStyles = "transition-all duration-300 ease-in-out";
```

## Visual Flow

```
User lands on page (scrollY = 0)
           ↓
    [FLAT NAVBAR SHOWN]
    Full width, section background
    Matches hero section
           ↓
   User scrolls down (scrollY > 10)
           ↓
    [TRANSITION BEGINS - 300ms]
    Smooth animation of all properties
           ↓
    [FLOATING NAVBAR SHOWN]
    Compact width, blur background
    Fixed positioning with insets
           ↓
   User scrolls back up (scrollY < 10)
           ↓
    [TRANSITION BACK - 300ms]
    Returns to flat state
```

## CSS Classes Applied

### Flat State
```
w-full                    // Full viewport width
border-b                  // Bottom border
border-border             // Color: #e8e6dc
bg-section                // Background: #faf9f5
```

### Floating State
```
max-w-2xl                 // Width: 28rem (448px)
mx-auto                   // Center horizontally
px-4                      // Padding horizontal
rounded-2xl               // Border radius: 1rem (16px)
bg-white/80               // Background: white with 80% opacity
backdrop-blur-md          // Blur effect: 8px
border border-white/20    // Border: white with 20% opacity
shadow-lg                 // Box shadow
top-4 left-4 right-4      // Inset spacing: 16px
```

## Customization

### Adjust Scroll Threshold
Change this value in the `handleScroll` function:
```typescript
setIsScrolled(window.scrollY > 10);  // Change 10 to desired value
```

### Modify Floating Width
Edit the `floatingStyles`:
```typescript
const floatingStyles = "max-w-3xl ..."; // Change max-w-2xl to max-w-3xl
```

### Change Animation Duration
Edit the `baseStyles`:
```typescript
const baseStyles = "transition-all duration-500 ..."; // 300ms to 500ms
```

### Adjust Blur Intensity
Edit the `floatingStyles`:
```typescript
backdrop-blur-lg    // Stronger blur (12px)
backdrop-blur-xl    // Even stronger (16px)
```

## Integration Points

### Marketing Layout (Already Integrated)
```typescript
// In app/(marketing)/layout.tsx
<Navbar
  brand={brand}
  items={NAV_ITEMS}
  actions={navActions}
  variant="elevated"
  position="sticky"
/>
```

No changes needed! The navbar works out of the box.

### Custom Implementation
```typescript
import { Navbar } from "@/components/shared/Navbar";

export default function MyPage() {
  return (
    <Navbar
      brand={<YourBrand />}
      items={navigationItems}
      actions={ctaButtons}
    />
  );
}
```

## Responsive Behavior

### Desktop (≥ md breakpoint)
- Full navigation visible
- All adjustments apply
- Smooth transitions on all properties

### Mobile (< md breakpoint)
- Hamburger menu button visible
- Navigation collapses in dropdown
- Floating state still applies on scroll
- Touch-friendly spacing maintained

## Accessibility

✅ **Keyboard Navigation**: All links remain keyboard accessible
✅ **ARIA Labels**: Mobile menu button has proper aria-expanded
✅ **Focus Rings**: Visible focus indicator (ring-2 ring-primary)
✅ **Color Contrast**: Maintained in both states
✅ **Touch Targets**: ≥ 44px minimum (mobile)

## Performance Notes

### Why Passive Scroll Listener?
- Non-blocking main thread
- Scroll performance not affected
- Modern best practice

### Why GPU-Accelerated Transitions?
- Smooth 60fps animations
- Better performance than JavaScript animations
- Less CPU usage

### Bundle Impact
- **+0 bytes**: Uses existing Tailwind utilities
- **No new dependencies**: Pure CSS and React

## Troubleshooting

### Navbar Not Floating?
1. Check scroll position: `console.log(window.scrollY)`
2. Verify page has scrollable content
3. Check if threshold (10px) is being exceeded

### Transitions Choppy?
1. Verify CSS transitions are not overridden
2. Check for conflicting global styles
3. Clear browser cache

### Blur Not Showing?
1. Browser support: backdrop-blur requires modern browser
2. Verify Tailwind is properly configured
3. Check z-index doesn't conflict

## Browser Compatibility Matrix

| Feature | Support | Minimum Version |
|---------|---------|-----------------|
| CSS transitions | ✅ | All modern browsers |
| backdrop-blur | ✅ | Chrome 76+, Firefox 103+, Safari 9+, Edge 79+ |
| Passive events | ✅ | Chrome 51+, Firefox 68+, Safari 12.1+, Edge 79+ |
| position: fixed | ✅ | All browsers |
| CSS custom properties | ✅ | All modern browsers |

## Code Examples

### Example 1: Different Navbar for Subpage
```typescript
import { Navbar } from "@/components/shared/Navbar";

export default function SettingsLayout() {
  return (
    <Navbar
      brand={<Logo />}
      items={[]}  // No navigation items
      actions={<SignOut />}
      position="sticky"
    />
  );
}
```

### Example 2: Custom Styling
```typescript
<Navbar
  className="custom-navbar-class"  // Add custom classes
  brand={<Logo />}
  items={navItems}
  actions={buttons}
/>
```

## Best Practices

1. **Keep it simple**: Navbar works best with 3-5 navigation items
2. **Consistent branding**: Use the same brand component everywhere
3. **Clear CTAs**: Action buttons should be obvious
4. **Mobile-first**: Test on mobile devices first
5. **Scroll context**: Only use on pages with scrollable content

## Support

For issues or enhancements:
1. Check the Navbar component code
2. Verify Tailwind CSS is properly configured
3. Test in different browsers
4. Review the design specification document

---

**Component**: `components/shared/Navbar.tsx`
**Status**: Production Ready ✅
**Last Updated**: October 27, 2025
