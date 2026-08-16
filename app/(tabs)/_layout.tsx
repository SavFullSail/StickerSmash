import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS, Platform, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const fallback = colorScheme === 'dark' ? '#FFFFFF' : '#1C1C1E';
  const tintColor = Platform.OS === 'ios' ? DynamicColorIOS({ light: '#1C1C1E', dark: '#FFFFFF' }) : fallback;

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      labelStyle={{ color: tintColor }}
      tintColor={tintColor}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="about">
        <NativeTabs.Trigger.Icon sf={{ default: 'info.circle', selected: 'info.circle.fill' }} md="info" />
        <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
