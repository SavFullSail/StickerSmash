# Apple HIG Redesign + Liquid Glass Navbar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the StickerSmash starter template to Apple HIG with a modular component library and a true iOS 26 floating-pill Liquid Glass tab bar (`NativeTabs`).

**Architecture:** Swap the JS `<Tabs>` navigator for `NativeTabs` (expo-router/unstable-native-tabs) — on iOS 26 the system renders the floating pill Liquid Glass tab bar and derives its blur from the backdrop. The Home/About screens become thin compositions of small reusable SwiftUI-glass primitives (`@expo/ui/swift-ui` + `expo-mesh-gradient`) driven by design tokens in `theme.ts`. iOS screens live in `.ios.tsx` files; simple non-iOS fallbacks keep other platforms working.

**Tech Stack:** Expo SDK 55, expo-router 55, `expo-router/unstable-native-tabs` (NativeTabs), `@expo/ui/swift-ui`, `expo-mesh-gradient`, `@react-navigation/native` (ThemeProvider/DarkTheme/DefaultTheme).

**Verification model:** This project has no unit-test framework (no jest — see `package.json`). Per AGENTS.md, every task is verified with `bunx tsc --noEmit` and `bunx expo lint` (bun.lock present, so use `bunx`, not `npx`). Final manual check is on an iOS 26 simulator via `bunx expo start`.

---

### Task 1: Design tokens — `components/theme.ts`

**Files:**
- Create: `components/theme.ts`

- [ ] **Step 1: Create `components/theme.ts`**

```ts
export const accent = '#FFD166';

export const meshLight = [
  '#FDE7F1', '#E7F0FD', '#FDF2E3',
  '#E5F6F3', '#F3E8FD', '#EAF3E7',
  '#E7F3FA', '#FCEBE7', '#EEF0F9',
];

export const meshDark = [
  '#2A1624', '#16223A', '#2A2415',
  '#15302B', '#241640', '#202E18',
  '#162A3A', '#301D18', '#1E2038',
];

export const meshPoints = [
  [0.0, 0.0],
  [0.5, 0.0],
  [1.0, 0.0],
  [0.0, 0.5],
  [0.5, 0.5],
  [1.0, 0.5],
  [0.0, 1.0],
  [0.5, 1.0],
  [1.0, 1.0],
];

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const typeScale = {
  largeTitle: { size: 34, weight: 'bold', design: 'rounded' } as const,
  title2: { size: 22, weight: 'semibold', design: 'rounded' } as const,
  headline: { size: 17, weight: 'semibold' } as const,
  body: { size: 15 } as const,
  footnote: { size: 13 } as const,
  caption: { size: 12 } as const,
};
```

> `as const` is required so the `weight`/`design` string literals pass straight into the `font()` modifier's union types without widening to `string`.

- [ ] **Step 2: Verify typecheck**

Run: `bunx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/theme.ts
git commit -m "feat: add design tokens for Apple HIG template"
```

---

### Task 2: Modular glass UI primitives

All primitives are `.ios.tsx` (SwiftUI glass via `@expo/ui`). They live under `components/ui/` and take plain children/props — no styling lives in screens.

**Files:**
- Create: `components/ui/GlassCard.ios.tsx`
- Create: `components/ui/GlassTile.ios.tsx`
- Create: `components/ui/SectionHeader.ios.tsx`
- Create: `components/ui/AppHeader.ios.tsx`
- Create: `components/ui/HeroCard.ios.tsx`
- Create: `components/ui/PrimaryButton.ios.tsx`
- Create: `components/ui/SecondaryButton.ios.tsx`

- [ ] **Step 1: Create `components/ui/GlassCard.ios.tsx`**

```tsx
import { VStack } from '@expo/ui/swift-ui';
import { background, glassEffect, padding } from '@expo/ui/swift-ui/modifiers';
import { spacing as spacingTokens } from '@/components/theme';

const glass = glassEffect({
  glass: { variant: 'regular', interactive: true },
  shape: 'roundedRectangle',
  cornerRadius: 28,
});

export function GlassCard({
  children,
  gap = 16,
  paddingSize = 'lg',
}: {
  children: React.ReactNode;
  gap?: number;
  paddingSize?: keyof typeof spacingTokens;
}) {
  return (
    <VStack
      spacing={gap}
      alignment="leading"
      modifiers={[
        glass,
        background('#FFFFFF22'),
        padding({ all: spacingTokens[paddingSize] }),
      ]}
    >
      {children}
    </VStack>
  );
}
```

- [ ] **Step 2: Create `components/ui/GlassTile.ios.tsx`**

```tsx
import { VStack } from '@expo/ui/swift-ui';
import { background, frame, glassEffect } from '@expo/ui/swift-ui/modifiers';

const tileGlass = glassEffect({
  glass: { variant: 'regular', interactive: false },
  shape: 'roundedRectangle',
  cornerRadius: 18,
});

export function GlassTile({ children, size = 64 }: { children: React.ReactNode; size?: number }) {
  return (
    <VStack
      alignment="center"
      modifiers={[tileGlass, background('#FFFFFF22'), frame({ width: size, height: size })]}
    >
      {children}
    </VStack>
  );
}
```

- [ ] **Step 3: Create `components/ui/SectionHeader.ios.tsx`**

```tsx
import { HStack, Image, Spacer, Text } from '@expo/ui/swift-ui';
import { font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import { accent, typeScale } from '@/components/theme';
import type { SFSymbol } from 'sf-symbols-typescript';

export function SectionHeader({ title, icon }: { title: string; icon?: SFSymbol }) {
  return (
    <HStack spacing={8} alignment="center">
      {icon && <Image systemName={icon} size={18} color={accent} />}
      <Text modifiers={[font(typeScale.title2), foregroundStyle('#FFFFFF')]}>{title}</Text>
      <Spacer />
    </HStack>
  );
}
```

- [ ] **Step 4: Create `components/ui/AppHeader.ios.tsx`**

```tsx
import { HStack, Image, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import { GlassTile } from '@/components/ui/GlassTile';
import { typeScale } from '@/components/theme';
import type { SFSymbol } from 'sf-symbols-typescript';

export function AppHeader({
  icon,
  title,
  subtitle,
}: {
  icon: SFSymbol;
  title: string;
  subtitle?: string;
}) {
  return (
    <HStack spacing={16} alignment="center">
      <GlassTile size={64}>
        <Image systemName={icon} size={32} color="white" />
      </GlassTile>
      <VStack spacing={4} alignment="leading">
        <Text modifiers={[font(typeScale.largeTitle), foregroundStyle('#FFFFFF')]}>{title}</Text>
        {subtitle && (
          <Text
            modifiers={[
              font(typeScale.body),
              foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
            ]}>
            {subtitle}
          </Text>
        )}
      </VStack>
      <Spacer />
    </HStack>
  );
}
```

- [ ] **Step 5: Create `components/ui/HeroCard.ios.tsx`**

```tsx
import { Image, Text } from '@expo/ui/swift-ui';
import { font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import { GlassCard } from '@/components/ui/GlassCard';
import { accent, typeScale } from '@/components/theme';
import type { SFSymbol } from 'sf-symbols-typescript';

export function HeroCard({ icon, title, body }: { icon: SFSymbol; title: string; body: string }) {
  return (
    <GlassCard>
      <Image systemName={icon} size={26} color={accent} />
      <Text modifiers={[font(typeScale.headline), foregroundStyle('#FFFFFF')]}>{title}</Text>
      <Text
        modifiers={[
          font(typeScale.body),
          foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
        ]}>
        {body}
      </Text>
    </GlassCard>
  );
}
```

- [ ] **Step 6: Create `components/ui/PrimaryButton.ios.tsx`**

```tsx
import { Button } from '@expo/ui/swift-ui';
import { buttonStyle, font, padding } from '@expo/ui/swift-ui/modifiers';
import type { SFSymbol } from 'sf-symbols-typescript';

export function PrimaryButton({
  label,
  systemImage,
  onPress,
}: {
  label: string;
  systemImage?: SFSymbol;
  onPress?: () => void;
}) {
  return (
    <Button
      label={label}
      systemImage={systemImage}
      onPress={onPress}
      modifiers={[
        buttonStyle('glassProminent'),
        font({ size: 16, weight: 'semibold' }),
        padding({ horizontal: 24, vertical: 12 }),
      ]}
    />
  );
}
```

- [ ] **Step 7: Create `components/ui/SecondaryButton.ios.tsx`**

```tsx
import { Button } from '@expo/ui/swift-ui';
import { buttonStyle, font, padding } from '@expo/ui/swift-ui/modifiers';
import type { SFSymbol } from 'sf-symbols-typescript';

export function SecondaryButton({
  label,
  systemImage,
  onPress,
}: {
  label: string;
  systemImage?: SFSymbol;
  onPress?: () => void;
}) {
  return (
    <Button
      label={label}
      systemImage={systemImage}
      onPress={onPress}
      modifiers={[
        buttonStyle('glass'),
        font({ size: 16, weight: 'semibold' }),
        padding({ horizontal: 24, vertical: 12 }),
      ]}
    />
  );
}
```

- [ ] **Step 8: Verify typecheck + lint**

Run: `bunx tsc --noEmit` then `bunx expo lint`
Expected: both clean (unused imports will be flagged by lint — remove any that end up unused).

- [ ] **Step 9: Commit**

```bash
git add components/ui
git commit -m "feat: add modular glass UI primitives"
```

---

### Task 3: Home screen (iOS + fallback) and route wiring

**Files:**
- Create: `components/HomeScreen.ios.tsx`
- Create: `components/HomeScreen.tsx`
- Modify: `app/(tabs)/index.tsx`

- [ ] **Step 1: Create `components/HomeScreen.ios.tsx`**

```tsx
import { GlassEffectContainer, Host, HStack, Image, ScrollView, Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle, frame, padding } from '@expo/ui/swift-ui/modifiers';
import { MeshGradientView } from 'expo-mesh-gradient';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { AppHeader } from '@/components/ui/AppHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassTile } from '@/components/ui/GlassTile';
import { HeroCard } from '@/components/ui/HeroCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { accent, meshDark, meshLight, meshPoints, spacing, typeScale } from '@/components/theme';

export default function HomeScreen() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? meshDark : meshLight;

  return (
    <View style={styles.container} collapsable={false}>
      <MeshGradientView
        style={StyleSheet.absoluteFill}
        columns={3}
        rows={3}
        colors={colors}
        points={meshPoints}
      />
      <Host style={styles.host}>
        <ScrollView showsIndicators={false}>
          <GlassEffectContainer spacing={16}>
            <VStack spacing={spacing.lg} modifiers={[padding({ all: 20 }), frame({ maxWidth: 480 })]}>
              <AppHeader
                icon="sparkles"
                title="StickerSmash"
                subtitle="A native iOS template built with Liquid Glass."
              />

              <HeroCard
                icon="wand.and.stars"
                title="Apple design, out of the box"
                body="Every screen follows the Human Interface Guidelines — system type, SF Symbols, 8pt spacing, and glass that refracts the backdrop."
              />

              <VStack spacing={spacing.md} alignment="leading">
                <SectionHeader title="Typography" icon="textformat" />
                <GlassCard gap={10}>
                  <Text
                    modifiers={[
                      font({ size: 22, weight: 'semibold', design: 'rounded' }),
                      foregroundStyle('#FFFFFF'),
                    ]}>
                    Title 2 — section headers
                  </Text>
                  <Text modifiers={[font(typeScale.body), foregroundStyle('#FFFFFF')]}>
                    Body — primary copy.
                  </Text>
                  <Text
                    modifiers={[
                      font(typeScale.body),
                      foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                    ]}>
                    Secondary — supporting text.
                  </Text>
                  <Text
                    modifiers={[
                      font(typeScale.caption),
                      foregroundStyle({ type: 'hierarchical', style: 'tertiary' }),
                    ]}>
                    Tertiary — captions and metadata.
                  </Text>
                </GlassCard>
              </VStack>

              <VStack spacing={spacing.md} alignment="leading">
                <SectionHeader title="Glass components" icon="cube.transparent" />
                <GlassCard gap={12}>
                  <HStackTiles />
                  <Text
                    modifiers={[
                      font(typeScale.footnote),
                      foregroundStyle({ type: 'hierarchical', style: 'tertiary' }),
                    ]}>
                    Glass tiles & cards — drop-in components for your content.
                  </Text>
                </GlassCard>
              </VStack>

              <VStack spacing={spacing.sm} alignment="center">
                <PrimaryButton label="Get started" systemImage="arrow.right.circle" />
                <SecondaryButton label="Secondary action" systemImage="hand.thumbsup" />
              </VStack>
            </VStack>
          </GlassEffectContainer>
        </ScrollView>
      </Host>
    </View>
  );
}

function HStackTiles() {
  return (
    <HStack spacing={12}>
      <GlassTile size={56}>
        <Image systemName="heart.fill" size={24} color="#FF7AB8" />
      </GlassTile>
      <GlassTile size={56}>
        <Image systemName="star.fill" size={24} color={accent} />
      </GlassTile>
      <GlassTile size={56}>
        <Image systemName="bolt.fill" size={24} color="#38BDF8" />
      </GlassTile>
      <GlassTile size={56}>
        <Image systemName="leaf.fill" size={24} color="#4ADE80" />
      </GlassTile>
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  host: { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 },
});
```

- [ ] **Step 2: Create `components/HomeScreen.tsx` (non-iOS fallback)**

```tsx
import { MeshGradientView } from 'expo-mesh-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { meshLight, meshPoints } from '@/components/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MeshGradientView
        style={StyleSheet.absoluteFill}
        columns={3}
        rows={3}
        colors={meshLight}
        points={meshPoints}
      />
      <Text style={styles.title}>StickerSmash</Text>
      <Text style={styles.subtitle}>A native iOS template built with Liquid Glass.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#1C1C1E', fontSize: 34, fontWeight: 'bold' },
  subtitle: { color: '#6E6E73', fontSize: 15, marginTop: 8 },
});
```

- [ ] **Step 3: Update `app/(tabs)/index.tsx`**

```tsx
import HomeScreen from '@/components/HomeScreen';

export default function Index() {
  return <HomeScreen />;
}
```

- [ ] **Step 4: Verify typecheck + lint**

Run: `bunx tsc --noEmit` then `bunx expo lint`
Expected: both clean. If `expo lint` reports missing imports, fix the import list in `HomeScreen.ios.tsx` to match what's actually used.

- [ ] **Step 5: Commit**

```bash
git add components/HomeScreen.ios.tsx components/HomeScreen.tsx "app/(tabs)/index.tsx"
git commit -m "feat: redesign Home screen with modular glass components"
```

---

### Task 4: About screen (iOS + fallback) and route wiring

**Files:**
- Create: `components/AboutScreen.ios.tsx`
- Create: `components/AboutScreen.tsx`
- Modify: `app/(tabs)/about.tsx`

- [ ] **Step 1: Create `components/AboutScreen.ios.tsx`**

```tsx
import {
  GlassEffectContainer,
  Host,
  HStack,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from '@expo/ui/swift-ui';
import { font, foregroundStyle, frame, padding } from '@expo/ui/swift-ui/modifiers';
import { MeshGradientView } from 'expo-mesh-gradient';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { AppHeader } from '@/components/ui/AppHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { HeroCard } from '@/components/ui/HeroCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { meshDark, meshLight, meshPoints, spacing, typeScale } from '@/components/theme';

export default function AboutScreen() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? meshDark : meshLight;

  return (
    <View style={styles.container} collapsable={false}>
      <MeshGradientView
        style={StyleSheet.absoluteFill}
        columns={3}
        rows={3}
        colors={colors}
        points={meshPoints}
      />
      <Host style={styles.host}>
        <ScrollView showsIndicators={false}>
          <GlassEffectContainer spacing={16}>
            <VStack spacing={spacing.lg} modifiers={[padding({ all: 20 }), frame({ maxWidth: 480 })]}>
              <AppHeader
                icon="face.smiling"
                title="About"
                subtitle="StickerSmash — a starting point for iOS apps."
              />

              <HeroCard
                icon="sparkles.tv"
                title="Native iOS feeling"
                body="Real SwiftUI views render inside React Native through Expo UI, giving the app an unmistakably native iOS look and feel."
              />

              <HeroCard
                icon="drop.fill"
                title="Liquid Glass"
                body="The glassEffect modifier blurs and refracts the mesh backdrop behind every card and button."
              />

              <VStack spacing={spacing.md} alignment="leading">
                <SectionHeader title="Details" icon="list.bullet" />
                <GlassCard gap={12}>
                  <HStack spacing={8} alignment="center">
                    <Text modifiers={[font(typeScale.body), foregroundStyle('#FFFFFF')]}>Version</Text>
                    <Spacer />
                    <Text
                      modifiers={[
                        font(typeScale.body),
                        foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                      ]}>
                      1.0.0
                    </Text>
                  </HStack>
                  <HStack spacing={8} alignment="center">
                    <Text modifiers={[font(typeScale.body), foregroundStyle('#FFFFFF')]}>Framework</Text>
                    <Spacer />
                    <Text
                      modifiers={[
                        font(typeScale.body),
                        foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                      ]}>
                      Expo SDK 55
                    </Text>
                  </HStack>
                  <HStack spacing={8} alignment="center">
                    <Text modifiers={[font(typeScale.body), foregroundStyle('#FFFFFF')]}>Platform</Text>
                    <Spacer />
                    <Text
                      modifiers={[
                        font(typeScale.body),
                        foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                      ]}>
                      iOS 26
                    </Text>
                  </HStack>
                </GlassCard>
              </VStack>

              <Text
                modifiers={[
                  font(typeScale.caption),
                  foregroundStyle({ type: 'hierarchical', style: 'tertiary' }),
                ]}>
                Built with Expo SDK 55
              </Text>
            </VStack>
          </GlassEffectContainer>
        </ScrollView>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  host: { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 },
});
```

- [ ] **Step 2: Create `components/AboutScreen.tsx` (non-iOS fallback)**

```tsx
import { MeshGradientView } from 'expo-mesh-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { meshLight, meshPoints } from '@/components/theme';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <MeshGradientView
        style={StyleSheet.absoluteFill}
        columns={3}
        rows={3}
        colors={meshLight}
        points={meshPoints}
      />
      <Text style={styles.title}>About</Text>
      <Text style={styles.subtitle}>StickerSmash — a starting point for iOS apps.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#1C1C1E', fontSize: 30, fontWeight: 'bold' },
  subtitle: { color: '#6E6E73', fontSize: 15, marginTop: 8 },
});
```

- [ ] **Step 3: Update `app/(tabs)/about.tsx`**

```tsx
import AboutScreen from '@/components/AboutScreen';

export default function AboutScreenRoute() {
  return <AboutScreen />;
}
```

- [ ] **Step 4: Verify typecheck + lint**

Run: `bunx tsc --noEmit` then `bunx expo lint`
Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add components/AboutScreen.ios.tsx components/AboutScreen.tsx "app/(tabs)/about.tsx"
git commit -m "feat: redesign About screen with modular glass components"
```

---

### Task 5: Native Liquid Glass tab bar + theme provider

**Files:**
- Modify: `app/(tabs)/_layout.tsx`
- Modify: `app/_layout.tsx`

- [ ] **Step 1: Replace `app/(tabs)/_layout.tsx` with NativeTabs**

```tsx
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = colorScheme === 'dark' ? '#FFFFFF' : '#1C1C1E';

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      labelStyle={{ color: tintColor }}
      tintColor={tintColor}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="about">
        <NativeTabs.Trigger.Icon sf={{ default: 'info.circle', selected: 'info.circle.fill' }} md="info" />
        <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

- [ ] **Step 2: Add ThemeProvider to `app/_layout.tsx`** (fixes iOS 26 white-flash-on-tab-switch; needed by NativeTabs docs for SDK 55)

```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
```

- [ ] **Step 3: Verify typecheck + lint**

Run: `bunx tsc --noEmit` then `bunx expo lint`
Expected: both clean. (`ThemeProvider`, `DarkTheme`, `DefaultTheme` are all re-exported by `@react-navigation/native` via `@react-navigation/core`.)

- [ ] **Step 4: Commit**

```bash
git add "app/(tabs)/_layout.tsx" "app/_layout.tsx"
git commit -m "feat: switch to native iOS 26 Liquid Glass tab bar"
```

---

### Task 6: Remove legacy screens + final verification

**Files:**
- Delete: `components/LiquidGlassHome.ios.tsx`
- Delete: `components/LiquidGlassHome.tsx`
- Delete: `components/LiquidGlassAbout.ios.tsx`
- Delete: `components/LiquidGlassAbout.tsx`

- [ ] **Step 1: Delete legacy files**

```bash
git rm components/LiquidGlassHome.ios.tsx components/LiquidGlassHome.tsx components/LiquidGlassAbout.ios.tsx components/LiquidGlassAbout.tsx
```

- [ ] **Step 2: Confirm nothing references them**

Run: `bunx tsc --noEmit`
Expected: no errors (the only importers were the route files, already rewired in Tasks 3–4).

- [ ] **Step 3: Final full checks**

Run: `bunx tsc --noEmit` and `bunx expo lint`
Expected: both clean.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove legacy liquid glass screens"
```

- [ ] **Step 5: Manual smoke test (iOS 26 device/simulator)**

Run: `bunx expo start`, open on an iOS 26 simulator (requires Xcode 26). Verify:
- Floating pill Liquid Glass tab bar appears with Home/About icons and labels.
- Tab switching works; no white flash between tabs.
- Scrolling the Home screen minimizes the tab bar to the compact pill.
- Cards and buttons render with glass refraction over the softened mesh in both light and dark mode.
