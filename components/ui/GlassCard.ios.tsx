import { VStack } from '@expo/ui/swift-ui';
import { background, glassEffect, padding, shapes } from '@expo/ui/swift-ui/modifiers';
import { spacing as spacingTokens } from '@/components/theme';

const CARD_RADIUS = 28;

const glass = glassEffect({
  glass: { variant: 'regular', interactive: true },
  shape: 'roundedRectangle',
  cornerRadius: CARD_RADIUS,
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
        padding({ all: spacingTokens[paddingSize] }),
        glass,
        background('#FFFFFF22', shapes.roundedRectangle({ cornerRadius: CARD_RADIUS })),
      ]}
    >
      {children}
    </VStack>
  );
}
