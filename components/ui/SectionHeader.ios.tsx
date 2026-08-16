import { HStack, Image, Spacer, Text } from '@expo/ui/swift-ui';
import { font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import { accent, typeScale } from '@/components/theme';
import type { SFSymbol } from 'sf-symbols-typescript';

export function SectionHeader({ title, icon }: { title: string; icon?: SFSymbol }) {
  return (
    <HStack spacing={8} alignment="center">
      {icon && <Image systemName={icon} size={18} color={accent} />}
      <Text modifiers={[font(typeScale.title2), foregroundStyle('#FFFFFF')]}>{title}</Text>
      <Spacer />
    </HStack>
  );
}
