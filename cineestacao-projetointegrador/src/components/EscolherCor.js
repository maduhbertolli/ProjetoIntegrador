import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export const CORES_FILME = [
  { nome: 'Vermelho', valor: '#FF6B6B' },
  { nome: 'Laranja', valor: '#FFA500' },
  { nome: 'Amarelo', valor: '#FFD93D' },
  { nome: 'Verde', valor: '#6BCB77' },
  { nome: 'Azul', valor: '#4D96FF' },
  { nome: 'Roxo', valor: '#A569BD' },
  { nome: 'Rosa', valor: '#FF69B4' },
  { nome: 'Cinza', valor: '#9B9B9B' }
];

export default function EscolherCor({ corSelecionada, setCorSelecionada }) {
  return (
    <View style={styles.container}>
      {CORES_FILME.map((cor) => (
        <TouchableOpacity
          key={cor.valor}
          style={[
            styles.botaoCor,
            { backgroundColor: cor.valor },
            corSelecionada === cor.valor && styles.corSelecionada
          ]}
          onPress={() => setCorSelecionada(cor.valor)}
        >
          {corSelecionada === cor.valor && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkTexto}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginVertical: 10
  },

  botaoCor: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  corSelecionada: {
    borderColor: '#000',
    borderWidth: 4
  },

  checkmark: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  checkmarkTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  }
});