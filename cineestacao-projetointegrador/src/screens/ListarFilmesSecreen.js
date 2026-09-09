import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { buscarAvaliacoes } from '../services/storage';

export default function ListaFilmesScreen() {
  const [filmes, setFilmes] = useState([]);

  async function carregarFilmes() {
    try {
      const avaliacoes = await buscarAvaliacoes();
      setFilmes(avaliacoes);
    } catch (error) {
      console.log('Erro ao carregar filmes:', error);
      Alert.alert('Erro', 'Não foi possível carregar as avaliações.');
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  function renderEstrelas(nota) {
    return (
      '⭐'.repeat(Number(nota))
    );
  }

  function renderFilme({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.titulo}>
          {item.titulo}
        </Text>

        <Text style={styles.estrelas}>
          {renderEstrelas(item.nota)}
        </Text>

        <Text style={styles.nota}>
          Nota: {item.nota}/5
        </Text>

        <Text style={styles.comentario}>
          {item.comentario}
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() =>
            Alert.alert(
              item.titulo,
              `Nota: ${item.nota}/5\n\nComentário:\n${item.comentario}`
            )
          }
        >
          <Text style={styles.textoBotao}>
            Ver avaliação
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.tituloTela}>
        🎬 CineEstação
      </Text>

      <Text style={styles.subtitulo}>
        Filmes avaliados
      </Text>

      <TouchableOpacity
        style={styles.botaoAtualizar}
        onPress={carregarFilmes}
      >
        <Text style={styles.textoBotao}>
          Atualizar avaliações
        </Text>
      </TouchableOpacity>

      {filmes.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.textoVazio}>
            Nenhum filme avaliado ainda.
          </Text>

          <Text style={styles.textoVazioSecundario}>
            Adicione uma avaliação para ela aparecer aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filmes}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderFilme}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() =>
          Alert.alert(
            'Adicionar filme',
            'Aqui depois vamos colocar a tela para cadastrar o filme.'
          )
        }
      >
        <Text style={styles.textoBotaoAdicionar}>
          + Avaliar filme
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },

  tituloTela: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
  },

  subtitulo: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 15,
    color: '#555',
  },

  botaoAtualizar: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  lista: {
    paddingBottom: 100,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,

    elevation: 3,
  },

  titulo: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  estrelas: {
    fontSize: 25,
    marginBottom: 5,
  },

  nota: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  comentario: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },

  botao: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  vazio: {
    alignItems: 'center',
    marginTop: 60,
  },

  textoVazio: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  textoVazioSecundario: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },

  botaoAdicionar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#e50914',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotaoAdicionar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});