# Navbar Design Specification

## Visual States

### STATE 1: FLAT NAVBAR (Initial - scrollY <= 10px)

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo]              Navigation Items              [Actions]    │
│ Kepsio              Home  Features  Pricing       Sign In|Start │
└────────────────────────────────────────────────────────────────┘

Layout:
- Full width (w-full)
- Height: 4rem (h-16)
- Background: #faf9f5 (bg-section)
- Border bottom: 1px solid #e8e6dc
- Padding: px-4 sm:px-6 lg:px-8
- Centered max-width container: max-w-7xl
```

### STATE 2: FLOATING NAVBAR (Scrolled - scrollY > 10px)

```
                  ╭─────────────────────────────────────────╮
                  │ [Logo]      Nav Items      [Actions]    │
                  │ Kepsio      Home Features  Sign In|Start │
                  ╰─────────────────────────────────────────╯
                  
Layout:
- Max width: 28rem (max-w-2xl)
- Height: auto (py-3)
- Background: rgba(255, 255, 255, 0.8) with backdrop blur
- Backdrop blur: md (8px blur)
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Rounded corners: 1rem (rounded-2xl)
- Box shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- Position: Fixed with inset (top-4 left-4 right-4)
- Padding: px-6 py-3
- Centered: mx-auto
```

## Animation Details

### Transition Properties
```css
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Animated Properties When Scrolling
1. **Width**: Full width → max-w-2xl
2. **Background**: bg-section → bg-white/80
3. **Border radius**: 0 → rounded-2xl
4. **Border color**: border-border → border-white/20
5. **Box shadow**: none/subtle → shadow-lg
6. **Padding**: px-8 py-16 → px-6 py-3
7. **Position**: sticky → fixed with insets

## Responsive Behavior

### Desktop (md and above)
- Full navigation menu visible
- All items displayed horizontally
- Responsive transition between states

### Mobile (below md)
- Hamburger menu button
- Navigation items collapse into dropdown
- Floating state still applies on scroll
- Touch-friendly spacing maintained

## Typography Adjustments

### Flat State
- Navigation items: text-sm font-medium
- Spacing: space-x-4
- Item padding: px-3 py-2

### Floating State
- Navigation items: text-xs font-medium
- Spacing: space-x-2
- Item padding: px-2 py-1

## Color Palette

- **Primary text**: #141413 (text-head)
- **Secondary text**: #5e5d59 (text-body)
- **Flat background**: #faf9f5 (section)
- **Floating background**: white with 80% opacity
- **Border (flat)**: #e8e6dc
- **Border (floating)**: white with 20% opacity
- **Accent**: #c96442

## Accessibility

✓ ARIA labels maintained
✓ Keyboard navigation preserved
✓ Focus ring visible at 2px
✓ Color contrast maintained (both states)
✓ Touch target sizes ≥ 44px (mobile)
✓ Reduced motion respects `prefers-reduced-motion` (for future enhancement)

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| backdrop-blur | 76+ | 103+ | 9+ | 79+ |
| CSS transitions | All | All | All | All |
| position: fixed | All | All | All | All |
| CSS Grid (nav) | All | All | All | All |

## Performance Metrics

- **Scroll listener**: Passive event (non-blocking)
- **Re-renders**: Only on scroll threshold change
- **Animation**: GPU-accelerated via CSS transitions
- **Paint operations**: Minimal (only blur update)
- **Bundle size impact**: 0 bytes (uses existing Tailwind utilities)

## Future Enhancements (Optional)

1. Add `prefers-reduced-motion` media query support
2. Customizable scroll threshold
3. Optional navbar items animation on floating
4. Sticky sections pattern compatibility
5. Dynamic backdrop blur intensity based on background content
