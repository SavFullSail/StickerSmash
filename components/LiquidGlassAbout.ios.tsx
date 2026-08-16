import { Form, Host, HStack, Image, Section, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle, glassEffect, padding } from '@expo/ui/swift-ui/modifiers';
import { MeshGradientView } from 'expo-mesh-gradient';
import { View } from 'react-native';

const MESH_COLORS = ['#0EA5E9', '#8B5CF6', '#EC4899', '#06D6A0', '#FFD166', '#FF7AB8', '#118AB2', '#F59E0B', '#84CC16'];

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

const glassCard = glassEffect({
  glass: { variant: 'regular', interactive: true },
  shape: 'roundedRectangle',
  cornerRadius: 24,
});

export default function LiquidGlassAbout() {
  return (
    <View style={{ flex: 1 }}>
      <MeshGradientView style={{ flex: 1 }} columns={3} rows={3} colors={MESH_COLORS} points={MESH_POINTS} />
      <Host style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
        <VStack spacing={24} modifiers={[padding({ all: 24 })]}>
          <VStack spacing={8} alignment="leading">
            <Text modifiers={[font({ size: 30, weight: 'bold', design: 'rounded' }), foregroundStyle('#FFFFFF')]}>
              About
            </Text>
            <Text modifiers={[font({ size: 15 }), foregroundStyle({ type: 'hierarchical', style: 'secondary' })]}>
              StickerSmash is built with React Native, SwiftUI, and Liquid Glass.
            </Text>
          </VStack>

          <VStack spacing={16} alignment="leading" modifiers={[glassCard, padding({ all: 20 })]}>
            <HStack spacing={12}>
              <Image systemName="sparkles.tv" size={22} color="#FFD166" />
              <Text modifiers={[font({ size: 17, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
                Native iOS feeling
              </Text>
            </HStack>
            <Text modifiers={[font({ size: 14 }), foregroundStyle({ type: 'hierarchical', style: 'secondary' })]}>
              Real SwiftUI views render inside React Native through Expo UI, giving the app an
              unmistakably native iOS look and feel.
            </Text>
            <HStack spacing={12}>
              <Image systemName="drop.fill" size={22} color="#38BDF8" />
              <Text modifiers={[font({ size: 17, weight: 'semibold' }), foregroundStyle('#FFFFFF')]}>
                Liquid Glass
              </Text>
            </HStack>
            <Text modifiers={[font({ size: 14 }), foregroundStyle({ type: 'hierarchical', style: 'secondary' })]}>
              The glassEffect modifier from {'SwiftUI\u2019s'} Liquid Glass design language blurs and
              refracts the colorful mesh backdrop behind every card and button.
            </Text>
          </VStack>

          <Form>
            <Section header={<Text>Details</Text>}>
              <VStack spacing={8}>
                <HStack>
                  <Text>Version</Text>
                  <Spacer />
                  <Text modifiers={[foregroundStyle({ type: 'hierarchical', style: 'secondary' })]}>1.0.0</Text>
                </HStack>
                <HStack>
                  <Text>Framework</Text>
                  <Spacer />
                  <Text modifiers={[foregroundStyle({ type: 'hierarchical', style: 'secondary' })]}>Expo SDK 54</Text>
                </HStack>
              </VStack>
            </Section>
          </Form>
        </VStack>
      </Host>
    </View>
  );
}