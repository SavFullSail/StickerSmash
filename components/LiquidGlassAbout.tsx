import { MeshGradientView } from 'expo-mesh-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function LiquidGlassAbout() {
  return (
    <View style={styles.container}>
      <MeshGradientView style={StyleSheet.absoluteFill} columns={3} rows={3} colors={MESH_COLORS} points={MESH_POINTS} />
      <Text style={styles.title}>About</Text>
      <Text style={styles.subtitle}>StickerSmash scaffold</Text>
    </View>
  );
}

const MESH_COLORS = ['#0EA5E9', '#8B5CF6', '#EC4899', '#06D6A0', '#FFD166', '#FF7AB8', '#118AB2', '#F59E0B', '#84CC16'];

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
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    marginTop: 8,
  },
});