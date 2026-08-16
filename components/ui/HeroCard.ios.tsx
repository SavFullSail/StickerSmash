import { Image, Text } from '@expo/ui/swift-ui';
import { font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import { GlassCard } from '@/components/ui/GlassCard';
import { accent, typeScale } from '@/components/theme';
import type { SFSymbol } from 'sf-symbols-typescript';

export function HeroCard({ icon, title, body }: { icon: SFSymbol; title: string; body: string }) {
  return (
    <GlassCard>
      <Image systemName={icon} size={26} color={accent} />
      <Text modifiers={[font(typeScale.headline), foregroundStyle('#FFFFFF')]}>{title}</Text>
      <Text
        modifiers={[
          font(typeScale.body),
          foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
        ]}>
        {body}
      </Text>
    </GlassCard>
  );
}
