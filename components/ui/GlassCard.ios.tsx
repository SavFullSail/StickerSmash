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
