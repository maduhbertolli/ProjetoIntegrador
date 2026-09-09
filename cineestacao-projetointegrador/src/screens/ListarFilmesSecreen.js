import { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { buscarAvaliacoes, deletarAvaliacao } from '../services/storage';

export default function ListarFilmesScreen({ navigation }) {
  // Guarda a lista de filmes avaliados
  const [filmes, setFilmes] = useState([]);

  // Guarda o tipo de ordenação
  const [ordenacao, setOrdenacao] = useState('recentes'); // 'recentes' ou 'nota'

  // Recarrega a lista toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const lista = await buscarAvaliacoes();
        setFilmes(lista);
      }

      carregar();
    }, [])
  );

  // Função para ordenar os filmes
  const filmesordenados = () => {
    const copia = [...filmes];

    if (ordenacao === 'recentes') {
      return copia.sort((a, b) => {
        const dataA = new Date(a.dataCriacao || 0);
        const dataB = new Date(b.dataCriacao || 0);
        return dataB - dataA; // Mais recentes primeiro
      });
    } else if (ordenacao === 'nota') {
      return copia.sort((a, b) => b.nota - a.nota); // Nota mais alta primeiro
    }

    return copia;
  };

  // Função para deletar um filme
  const handleDeletar = (id, titulo) => {
    Alert.alert(
      'Deletar filme',
      `Tem certeza que deseja deletar "${titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: async () => {
            await deletarAvaliacao(id);
            const lista = await buscarAvaliacoes();
            setFilmes(lista);
          },
          style: 'destructive'
        }
      ]
    );
  };

  // Renderiza cada item da lista
  function renderItem({ item }) {
    const notaInteira = Math.floor(item.nota);
    const temMeia = item.nota % 1 !== 0;

    let displayNota = '★'.repeat(notaInteira);
    if (temMeia) {
      displayNota += '½';
    }
    displayNota += '☆'.repeat(5 - Math.ceil(item.nota));

    return (
      <TouchableOpacity
        style={[styles.card, { borderLeftColor: item.cor, borderLeftWidth: 6 }]}
        onPress={() => navigation.navigate('Detalhes', { filme: item })}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitulo} numberOfLines={2}>{item.titulo}</Text>
          <View style={[styles.badgeCor, { backgroundColor: item.cor }]} />
        </View>

        <Text style={styles.cardNota}>{displayNota}</Text>
        <Text style={styles.notaNumero}>{item.nota.toFixed(1)} de 5</Text>

        <Text style={styles.cardComentario} numberOfLines={3}>
          {item.comentario}
        </Text>

        <TouchableOpacity
          style={styles.botaoDeletar}
          onPress={() => handleDeletar(item.id, item.titulo)}
        >
          <Text style={styles.textoDeletar}>🗑️ Deletar</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* Controles de ordenação */}
      <View style={styles.controles}>
        <TouchableOpacity
          style={[
            styles.botaoOrdenacao,
            ordenacao === 'recentes' && styles.botaoOrdenacaoAtivo
          ]}
          onPress={() => setOrdenacao('recentes')}
        >
          <Text
            style={[
              styles.textoOrdenacao,
              ordenacao === 'recentes' && styles.textoOrdenacaoAtivo
            ]}
          >
            📅 Recentes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoOrdenacao,
            ordenacao === 'nota' && styles.botaoOrdenacaoAtivo
          ]}
          onPress={() => setOrdenacao('nota')}
        >
          <Text
            style={[
              styles.textoOrdenacao,
              ordenacao === 'nota' && styles.textoOrdenacaoAtivo
            ]}
          >
            ⭐ Melhor nota
          </Text>
        </TouchableOpacity>
      </View>

      {filmesordenados().length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTexto}>🎬</Text>
          <Text style={styles.vazioTextoSecundario}>
            Nenhum filme avaliado ainda.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filmesordenados()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Botão para ir até a tela de adicionar filme */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('AdicionarFilme')}
      >
        <Text style={styles.textoBotaoAdicionar}>+ Avaliar novo filme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16
  },
  controles: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
    gap: 10
  },
  botaoOrdenacao: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center'
  },
  botaoOrdenacaoAtivo: {
    backgroundColor: '#171717',
    borderColor: '#171717'
  },
  textoOrdenacao: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
  },
  textoOrdenacaoAtivo: {
    color: '#fff'
  },
  lista: {
    paddingBottom: 20
  },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  vazioTexto: {
    fontSize: 60,
    marginBottom: 12
  },
  vazioTextoSecundario: {
    fontSize: 16,
    color: '#999'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#eeeeee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    flex: 1,
    color: '#171717'
  },
  badgeCor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 8
  },
  cardNota: {
    fontSize: 18,
    color: '#f5a623',
    marginBottom: 4,
    letterSpacing: 2
  },
  notaNumero: {
    fontSize: 13,
    color: '#999',
    marginBottom: 10,
    fontWeight: '500'
  },
  cardComentario: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12
  },
  botaoDeletar: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffe6e6',
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  textoDeletar: {
    color: '#d32f2f',
    fontSize: 13,
    fontWeight: '600'
  },
  botaoAdicionar: {
    backgroundColor: '#171717',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5.46,
    elevation: 8
  },
  textoBotaoAdicionar: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});