import {
  Divider,
  GlassEffectContainer,
  Host,
  HStack,
  Image,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from '@expo/ui/swift-ui';
import {
  font,
  foregroundStyle,
  frame,
  monospacedDigit,
  opacity,
  padding,
  textCase,
} from '@expo/ui/swift-ui/modifiers';
import { MeshGradientView } from 'expo-mesh-gradient';
import { Fragment } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { accent, meshDark, meshLight, meshPoints, spacing, typeScale } from '@/components/theme';
import type { SFSymbol } from 'sf-symbols-typescript';

const trendGreen = '#4ADE80';

const quickActions: { symbol: SFSymbol; label: string; color: string }[] = [
  { symbol: 'plus', label: 'New', color: accent },
  { symbol: 'wand.and.stars', label: 'Create', color: '#FF7AB8' },
  { symbol: 'square.and.arrow.up', label: 'Share', color: '#38BDF8' },
  { symbol: 'heart.fill', label: 'Favorites', color: trendGreen },
];

const libraryRows: { symbol: SFSymbol; label: string; count: string }[] = [
  { symbol: 'heart.fill', label: 'Favorites', count: '12' },
  { symbol: 'clock.fill', label: 'Recently added', count: '5' },
  { symbol: 'folder.fill', label: 'Collections', count: '3' },
  { symbol: 'person.2.fill', label: 'Shared with you', count: '8' },
];

export default function HomeScreen() {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? meshDark : meshLight;
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateLabel = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

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
            <VStack
              spacing={spacing.lg}
              alignment="leading"
              modifiers={[padding({ all: 20 }), frame({ maxWidth: 480 })]}>
              <VStack spacing={4} alignment="leading">
                <Text
                  modifiers={[
                    font(typeScale.footnote),
                    foregroundStyle({ type: 'hierarchical', style: 'tertiary' }),
                    textCase('uppercase'),
                  ]}>
                  {dateLabel}
                </Text>
                <Text modifiers={[font(typeScale.largeTitle), foregroundStyle('#FFFFFF')]}>
                  {greeting}
                </Text>
              </VStack>

              <StatCard />

              <QuickActions />

              <LibrarySection />

              <HStack>
                <Spacer />
                <PrimaryButton label="New Sticker" systemImage="plus" />
                <Spacer />
              </HStack>
            </VStack>
          </GlassEffectContainer>
        </ScrollView>
      </Host>
    </View>
  );
}

function StatCard() {
  return (
    <GlassCard>
      <HStack alignment="center">
        <VStack spacing={2} alignment="leading">
          <Text modifiers={[font(typeScale.display), foregroundStyle('#FFFFFF'), monospacedDigit()]}>
            24
          </Text>
          <Text
            modifiers={[
              font(typeScale.body),
              foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
            ]}>
            Stickers in your library
          </Text>
        </VStack>
        <Spacer />
        <VStack spacing={4} alignment="trailing">
          <HStack spacing={4} alignment="center">
            <Image systemName="arrow.up.right" size={14} color={trendGreen} />
            <Text modifiers={[font(typeScale.footnote), foregroundStyle(trendGreen)]}>+12</Text>
          </HStack>
          <Text
            modifiers={[
              font(typeScale.footnote),
              foregroundStyle({ type: 'hierarchical', style: 'tertiary' }),
            ]}>
            this week
          </Text>
        </VStack>
      </HStack>
    </GlassCard>
  );
}

function QuickActions() {
  return (
    <HStack>
      {quickActions.map((action, index) => (
        <Fragment key={action.label}>
          {index > 0 && <Spacer />}
          <VStack spacing={8} alignment="center">
            <Image systemName={action.symbol} size={28} color={action.color} />
            <Text
              modifiers={[
                font(typeScale.footnote),
                foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
              ]}>
              {action.label}
            </Text>
          </VStack>
        </Fragment>
      ))}
    </HStack>
  );
}

function LibrarySection() {
  return (
    <VStack spacing={spacing.md} alignment="leading">
      <SectionHeader title="Library" icon="square.grid.2x2" />
      <GlassCard gap={0}>
        {libraryRows.map((row, index) => (
          <Fragment key={row.label}>
            {index > 0 && <Divider />}
            <HStack spacing={12} alignment="center">
              <Image systemName={row.symbol} size={22} color="#FFFFFF" />
              <Text modifiers={[font(typeScale.body), foregroundStyle('#FFFFFF')]}>{row.label}</Text>
              <Spacer />
              <Text
                modifiers={[
                  font(typeScale.body),
                  foregroundStyle({ type: 'hierarchical', style: 'tertiary' }),
                ]}>
                {row.count}
              </Text>
              <Image
                systemName="chevron.right"
                size={14}
                color="#FFFFFF"
                modifiers={[opacity(0.4)]}
              />
            </HStack>
          </Fragment>
        ))}
      </GlassCard>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  host: { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 },
});
