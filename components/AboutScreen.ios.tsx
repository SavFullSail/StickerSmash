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
