import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Estrelas({ nota, setNota, tamanho = 40, permitirMeias = false }) {
  // Cria um array [1, 2, 3, 4, 5] para desenhar as 5 estrelas
  const numeros = [1, 2, 3, 4, 5];

  const handlePress = (numero, ehMeia) => {
    if (permitirMeias && ehMeia) {
      setNota(numero - 0.5);
    } else {
      setNota(numero);
    }
  };

  return (
    <View style={styles.container}>
      {numeros.map((numero) => {
        const notaInteira = Math.floor(nota);
        const temMeia = nota % 1 !== 0;
        const meia = temMeia ? nota - notaInteira : 0;

        return (
          <View key={numero} style={styles.estrelaContainer}>
            <TouchableOpacity
              onPress={() => handlePress(numero, true)}
              activeOpacity={0.7}
              style={[styles.estrelaBotao, styles.metadeEsquerda]}
            >
              <Text
                style={[
                  { fontSize: tamanho },
                  numero < notaInteira || (numero === notaInteira + 1 && meia >= 0.5)
                    ? styles.estrelaPreenchida
                    : styles.estrelaVazia
                ]}
              >
                ★
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePress(numero, false)}
              activeOpacity={0.7}
              style={[styles.estrelaBotao, styles.metadeDireita]}
            >
              <Text
                style={[
                  { fontSize: tamanho },
                  numero <= notaInteira ? styles.estrelaPreenchida : styles.estrelaVazia
                ]}
              >
                ★
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2
  },
  estrelaContainer: {
    flexDirection: 'row',
    width: 45,
    height: 45,
    overflow: 'hidden'
  },
  estrelaBotao: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  metadeEsquerda: {
    marginRight: -22.5
  },
  metadeDireita: {
    marginLeft: -22.5
  },
  estrelaPreenchida: {
    color: '#f5a623'
  },
  estrelaVazia: {
    color: '#cccccc'
  }
});