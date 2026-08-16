import { VStack } from '@expo/ui/swift-ui';
import { background, frame, glassEffect, shapes } from '@expo/ui/swift-ui/modifiers';

const TILE_RADIUS = 18;

const tileGlass = glassEffect({
  glass: { variant: 'regular', interactive: false },
  shape: 'roundedRectangle',
  cornerRadius: TILE_RADIUS,
});

export function GlassTile({ children, size = 64 }: { children: React.ReactNode; size?: number }) {
  return (
    <VStack
      alignment="center"
      modifiers={[
        tileGlass,
        background('#FFFFFF22', shapes.roundedRectangle({ cornerRadius: TILE_RADIUS })),
        frame({ width: size, height: size }),
      ]}
    >
      {children}
    </VStack>
  );
}
