# Apple Design Guidelines Redesign + Liquid Glass Navbar

Date: 2026-08-16
Status: Approved design

## Goal

Redesign the StickerSmash starter template to follow Apple Human Interface
Guidelines (HIG) and ship a true iOS 26 Liquid Glass floating pill tab bar.
The app is a blank starter template for future apps, so the result must be a
clean, neutral, **modular** reference implementation — not sticker-specific
branding.

## Context

- Expo SDK 55 (`expo ~55.0.28`, `expo-router ~55.0.17`), React Native 0.83.
- iOS-focused. Android/web are out of scope for polish; their fallback screens
  simply must not break.
- Existing iOS UI uses `@expo/ui/swift-ui` (SwiftUI views: `Host`,
  `GlassEffectContainer`, `glassEffect`, `buttonStyle`) and `expo-mesh-gradient`.
- Current tab bar is a JS `<Tabs>` with a `BlurView` background — not Liquid
  Glass.
- `app.json` already sets `userInterfaceStyle: "automatic"` (light/dark).

## Approach (chosen)

**A — Full native Liquid Glass tab bar.** Replace the JS `<Tabs>` navigator with
`<NativeTabs>` from `expo-router/unstable-native-tabs` (SDK 55 compound API).
On iOS 26 the system renders the floating pill Liquid Glass tab bar and derives
its blur/refraction from the content behind it — no custom glass code in the
tab bar. Trade-off: `NativeTabs` is alpha API; Liquid Glass look is iOS 26+.

## 1. Navigation shell

- `app/(tabs)/_layout.tsx`: JS `<Tabs>` + `BlurView` replaced by `<NativeTabs>`.
- Triggers:
  - Home: `sf={{ default: 'house', selected: 'house.fill' }}`
  - About: `sf={{ default: 'info.circle', selected: 'info.circle.fill' }}`
- `minimizeBehavior="onScrollDown"` so the pill shrinks on scroll (iOS 26).
- Wrap tabs in `ThemeProvider` (light/dark based on `useColorScheme`). On SDK 55
  import `ThemeProvider`/`DarkTheme`/`DefaultTheme` from `@react-navigation/native`.
  Fixes the iOS 26 white-flash-on-tab-switch bug.
- Each screen keeps a soft mesh-gradient backdrop; the system tab bar refracts it.
- Root `_layout.tsx` stays a `Stack` with `headerShown: false` for `(tabs)`.

### Screen constraints (NativeTabs)

- `ScrollView` must be the first child of each screen component (or a wrapper
  with `collapsable={false}`) so scroll-to-top, minimize, and content-inset
  behavior work.
- Max 5 tabs (Android) — we use 2.
- No dynamic add/remove of tabs.
- On iOS 26, `backgroundColor`/`blurEffect`/`shadowColor` on the tab bar have no
  effect; the look comes from content behind it.

## 2. Visual language (Apple HIG)

- **Color:** subdued mesh palette — soft pastels (lavender/blue/pink/peach),
  muted saturation, low contrast between points. Text white with hierarchical
  opacity (primary/secondary/tertiary). One restrained accent `#FFD166` for
  small highlights only.
- **Typography:** system SF rounded. Large Title 34 bold (hero), Title 2 22
  (section headers), Headline 17 semibold (card titles), Body 15 (copy),
  Footnote/Caption 13/12 (metadata). Dynamic Type auto-scales.
- **Spacing:** 8pt grid. Screen margin ~20pt, card padding ~20–24pt, 16pt
  between cards, 8–12pt between text lines.
- **Glass:** keep `glassEffect` cards and `buttonStyle('glassProminent')` from
  `@expo/ui` — they blur/refract the softened mesh like the tab bar does.
- **Dark mode:** support light and dark via `userInterfaceStyle: automatic`;
  mesh and glass adapt, text keeps the white hierarchy.
- **Icons:** SF Symbols everywhere.

## 3. Home screen (template showcase)

- **Header:** AppHeader — Large Title "StickerSmash" + one-line tagline
  placeholder.
- **Hero card:** glass card demonstrating headline + body + SF-symbol accent.
- **Section "Typography":** sample rows showing title, body, secondary/tertiary
  hierarchy text.
- **Section "Glass components":** sample glass tiles + cards demonstrating the
  reusable primitives.
- **Primary action:** `glassProminent` "Get started" button + a secondary glass
  button — the CTA control styles template users copy.

## 4. About screen

- App icon tile + "StickerSmash" Large Title + version line.
- Two feature glass cards: "Native iOS feeling" and "Liquid Glass".
- Grouped `Form` (settings-style) rows: Version, Framework, Platform — values
  right-aligned in tertiary.
- Footer caption: "Built with Expo SDK 55".

## 5. Component architecture (modular)

Everything is a small, single-purpose, reusable component. No inline styling in
route files.

- `components/theme.ts` — tokens: mesh palette, accent, spacing scale, type
  scale. Single place to re-skin.
- `components/ui/GlassCard.ios.tsx` — glass card wrapper (children).
- `components/ui/GlassTile.ios.tsx` — small rounded glass tile (children).
- `components/ui/SectionHeader.ios.tsx` — Title 2 section title (+ optional
  icon / see-more row).
- `components/ui/AppHeader.ios.tsx` — icon tile + Large Title + subtitle.
- `components/ui/PrimaryButton.ios.tsx` — glassProminent CTA.
- `components/ui/SecondaryButton.ios.tsx` — glass secondary button.
- `components/ui/HeroCard.ios.tsx` — featured glass card pattern.
- Screen files `components/HomeScreen.ios.tsx` and
  `components/AboutScreen.ios.tsx` compose the primitives only (non-route code
  stays out of `app/`).
- Non-iOS fallbacks `components/HomeScreen.tsx` and `components/AboutScreen.tsx`
  stay simple (MeshGradientView + text) so nothing breaks.
- Route files (`app/(tabs)/index.tsx`, `about.tsx`) remain one-liners rendering
  the screens.
- `.ios.tsx` variants stay; non-iOS fallbacks remain simple (MeshGradientView +
  text) so nothing breaks.

## Out of scope

- New screens, data layer, navigation beyond the two tabs.
- Android/web visual polish (must not break only).
- Anything beyond the two-tab template structure.

## Files touched

- `app/(tabs)/_layout.tsx` — NativeTabs + ThemeProvider.
- `app/_layout.tsx` — unchanged (Stack wrapper).
- `app/(tabs)/index.tsx`, `app/(tabs)/about.tsx` — one-liners, unchanged shape.
- `components/LiquidGlassHome*.tsx`, `LiquidGlassAbout*.tsx` — replaced by the
  modular screens below (deleted).
- New: `components/theme.ts`, `components/HomeScreen.ios.tsx`,
  `components/AboutScreen.ios.tsx`, `components/HomeScreen.tsx`,
  `components/AboutScreen.tsx`, `components/ui/*` (7 primitives).
