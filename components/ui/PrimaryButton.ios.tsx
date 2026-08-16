import { Button } from '@expo/ui/swift-ui';
import { buttonStyle, font, padding } from '@expo/ui/swift-ui/modifiers';
import type { SFSymbol } from 'sf-symbols-typescript';

export function PrimaryButton({
  label,
  systemImage,
  onPress,
}: {
  label: string;
  systemImage?: SFSymbol;
  onPress?: () => void;
}) {
  return (
    <Button
      label={label}
      systemImage={systemImage}
      onPress={onPress}
      modifiers={[
        buttonStyle('glassProminent'),
        font({ size: 16, weight: 'semibold' }),
        padding({ horizontal: 28, vertical: 14 }),
      ]}
    />
  );
}
