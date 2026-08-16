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
      <VStack spacing={6} alignment="leading">
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
