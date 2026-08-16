import { MeshGradientView } from 'expo-mesh-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function LiquidGlassHome() {
  return (
    <View style={styles.container}>
      <MeshGradientView style={StyleSheet.absoluteFill} columns={3} rows={3} colors={MESH_COLORS} points={MESH_POINTS} />
      <Text style={styles.title}>StickerSmash</Text>
      <Text style={styles.subtitle}>A native iOS feeling, with Liquid Glass.</Text>
    </View>
  );
}

const MESH_COLORS = ['#FF7AB8', '#FFD166', '#06D6A0', '#118AB2', '#EC4899', '#F59E0B', '#84CC16', '#0EA5E9', '#8B5CF6'];

const MESH_POINTS = [
  [0.0, 0.0],
  [0.5, 0.0],
  [1.0, 0.0],
  [0.0, 0.5],
  [0.5, 0.5],
  [1.0, 0.5],
  [0.0, 1.0],
  [0.5, 1.0],
  [1.0, 1.0],
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    marginTop: 8,
  },
});