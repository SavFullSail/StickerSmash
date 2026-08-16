import { MeshGradientView } from 'expo-mesh-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { meshLight, meshPoints } from '@/components/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MeshGradientView
        style={StyleSheet.absoluteFill}
        columns={3}
        rows={3}
        colors={meshLight}
        points={meshPoints}
      />
      <Text style={styles.title}>StickerSmash</Text>
      <Text style={styles.subtitle}>A native iOS template built with Liquid Glass.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#1C1C1E', fontSize: 34, fontWeight: 'bold' },
  subtitle: { color: '#6E6E73', fontSize: 15, marginTop: 8 },
});
