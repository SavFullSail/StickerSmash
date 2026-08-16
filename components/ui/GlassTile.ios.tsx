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
