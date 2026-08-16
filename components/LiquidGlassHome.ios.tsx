import { Host, HStack, VStack, Button, Text, Image, Spacer, GlassEffectContainer } from '@expo/ui/swift-ui';
import {
  background,
  buttonStyle,
  font,
  foregroundStyle,
  frame,
  glassEffect,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { MeshGradientView } from 'expo-mesh-gradient';
import { View } from 'react-native';

const MESH_COLORS = ['#FF7AB8', '#FFD166', '#06D6A0', '#118AB2', '#EC4899', '#F59E0B', '#84CC16', '#0EA5E9', '#8B5CF6'];

const MESH_POINTS = [
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

const glass = glassEffect({
  glass: { variant: 'regular', interactive: true },
  shape: 'roundedRectangle',
  cornerRadius: 28,
});

export default function LiquidGlassHome() {
  return (
    <View style={{ flex: 1 }}>
      <MeshGradientView style={{ flex: 1 }} columns={3} rows={3} colors={MESH_COLORS} points={MESH_POINTS} />
      <Host style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
        <GlassEffectContainer spacing={16}>
          <VStack spacing={24} alignment="center" modifiers={[padding({ all: 32 }), frame({ maxWidth: 480 })]}>
            <VStack spacing={8} alignment="center">
              <Image systemName="smiley" size={72} color="white" />
              <Text
                modifiers={[
                  font({ size: 34, weight: 'bold', design: 'rounded' }),
                  foregroundStyle('#FFFFFF'),
                ]}>
                StickerSmash
              </Text>
              <Text
                modifiers={[
                  font({ size: 15 }),
                  foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                ]}>
                A native iOS feeling, with Liquid Glass.
              </Text>
            </VStack>

            <VStack
              spacing={16}
              alignment="center"
              modifiers={[
                glass,
                background('#FFFFFF22'),
                padding({ all: 24 }),
                frame({ maxWidth: 380 }),
              ]}>
              <Text modifiers={[font({ size: 20, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
                Start building
              </Text>
              <Text
                modifiers={[
                  font({ size: 14 }),
                  foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
                ]}>
                This placeholder is ready for your app content. Add screens, components, and more to
                make it yours.
              </Text>
              <Button
                label="Get started"
                systemImage="arrow.right.circle"
                onPress={() => console.log('Get started')}
                modifiers={[
                  buttonStyle('glassProminent'),
                  font({ size: 16, weight: 'semibold' }),
                  padding({ horizontal: 20, vertical: 12 }),
                ]}
              />
              <HStack spacing={10}>
                <Image systemName="sparkles" size={16} color="#FFD166" />
                <Text
                  modifiers={[
                    font({ size: 13 }),
                    foregroundStyle({ type: 'hierarchical', style: 'tertiary' }),
                  ]}>
                  Built with SwiftUI + Liquid Glass
                </Text>
                <Image systemName="sparkles" size={16} color="#FFD166" />
              </HStack>
            </VStack>

            <Button
              label="Secondary action"
              systemImage="hand.thumbsup"
              modifiers={[
                buttonStyle('glass'),
                font({ size: 16, weight: 'semibold' }),
                padding({ horizontal: 24, vertical: 12 }),
              ]}
            />
            <Spacer />
          </VStack>
        </GlassEffectContainer>
      </Host>
    </View>
  );
}