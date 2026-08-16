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
                    modifiers={[font(typeScale.title2), foregroundStyle('#FFFFFF')]}>
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
