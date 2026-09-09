import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput
} from 'react-native';

import Estrelas from '../components/Estrelas';
import { atualizarAvaliacao, deletarAvaliacao } from '../services/storage';

export default function DetalhesFilmesScreen({ route, navigation }) {
  const { filme } = route.params;

  // Estado para edição
  const [editando, setEditando] = useState(false);
  const [notaEditada, setNotaEditada] = useState(filme.nota);
  const [comentarioEditado, setComentarioEditado] = useState(filme.comentario);

  // Função para salvar as edições
  const handleSalvarEdicao = async () => {
    if (comentarioEditado.trim() === '') {
      Alert.alert('Atenção', 'O comentário não pode estar vazio.');
      return;
    }

    try {
      await atualizarAvaliacao(filme.id, {
        nota: notaEditada,
        comentario: comentarioEditado.trim()
      });

      Alert.alert('Sucesso', 'Filme atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o filme.');
    }
  };

  // Função para deletar o filme
  const handleDeletar = () => {
    Alert.alert(
      'Deletar filme',
      `Tem certeza que deseja deletar "${filme.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: async () => {
            await deletarAvaliacao(filme.id);
            navigation.goBack();
          },
          style: 'destructive'
        }
      ]
    );
  };

  // Formata a data
  const formatarData = (dataString) => {
    if (!dataString) return 'Data desconhecida';
    const data = new Date(dataString);
    const opcoes = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return data.toLocaleDateString('pt-BR', opcoes);
  };

  const notaInteira = Math.floor(editando ? notaEditada : filme.nota);
  const temMeia = (editando ? notaEditada : filme.nota) % 1 !== 0;

  let displayNota = '★'.repeat(notaInteira);
  if (temMeia) {
    displayNota += '½';
  }
  displayNota += '☆'.repeat(5 - Math.ceil(editando ? notaEditada : filme.nota));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      {/* Header com cor do filme */}
      <View style={[styles.header, { backgroundColor: filme.cor }]}>
        <Text style={styles.headerTitulo}>{filme.titulo}</Text>
      </View>

      {/* Informações básicas */}
      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>📊 Avaliação</Text>

        {!editando ? (
          <View>
            <Text style={styles.notaGrande}>{displayNota}</Text>
            <Text style={styles.notaNumero}>
              {filme.nota.toFixed(1)} de 5 estrelas
            </Text>
          </View>
        ) : (
          <View style={styles.edicaoNota}>
            <Text style={styles.label}>Editar avaliação:</Text>
            <Estrelas
              nota={notaEditada}
              setNota={setNotaEditada}
              tamanho={48}
              permitirMeias={true}
            />
            <Text style={styles.notaNumeroEdicao}>
              {notaEditada.toFixed(1)} de 5 estrelas
            </Text>
          </View>
        )}
      </View>

      {/* Cor do filme */}
      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>🎨 Cor</Text>
        <View style={styles.linhaInfo}>
          <View style={[styles.corDisplay, { backgroundColor: filme.cor }]} />
          <Text style={styles.textoInfo}>{filme.cor}</Text>
        </View>
      </View>

      {/* Data de criação */}
      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>📅 Data</Text>
        <Text style={styles.textoInfo}>{formatarData(filme.dataCriacao)}</Text>
      </View>

      {/* Comentário */}
      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>💬 Comentário</Text>

        {!editando ? (
          <Text style={styles.comentario}>{filme.comentario}</Text>
        ) : (
          <TextInput
            style={[styles.input, styles.comentarioEditavel]}
            value={comentarioEditado}
            onChangeText={setComentarioEditado}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            placeholder="Seu comentário aqui..."
            placeholderTextColor="#999"
          />
        )}
      </View>

      {/* Botões de ação */}
      <View style={styles.botoes}>
        {!editando ? (
          <>
            <TouchableOpacity
              style={[styles.botao, styles.botaoEditar]}
              onPress={() => setEditando(true)}
            >
              <Text style={styles.textoBotaoEditar}>✏️ Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.botaoDeletar]}
              onPress={handleDeletar}
            >
              <Text style={styles.textoBotaoDeletar}>🗑️ Deletar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.botao, styles.botaoSalvar]}
              onPress={handleSalvarEdicao}
            >
              <Text style={styles.textoBotaoSalvar}>💾 Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.botaoCancelar]}
              onPress={() => {
                setEditando(false);
                setNotaEditada(filme.nota);
                setComentarioEditado(filme.comentario);
              }}
            >
              <Text style={styles.textoBotaoCancelar}>❌ Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  conteudo: {
    paddingBottom: 40
  },
  header: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    minHeight: 140,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  headerTitulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  },
  secao: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eeeeee'
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#171717'
  },
  notaGrande: {
    fontSize: 40,
    color: '#f5a623',
    letterSpacing: 4,
    textAlign: 'center',
    marginVertical: 8
  },
  notaNumero: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500'
  },
  notaNumeroEdicao: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500'
  },
  edicaoNota: {
    alignItems: 'center'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  linhaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  corDisplay: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  textoInfo: {
    fontSize: 15,
    color: '#666',
    flex: 1
  },
  comentario: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#333'
  },
  comentarioEditavel: {
    minHeight: 140,
    paddingTop: 12
  },
  botoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 12
  },
  botao: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoEditar: {
    backgroundColor: '#4D96FF',
    flexGrow: 1
  },
  botaoDeletar: {
    backgroundColor: '#FFE6E6',
    flexGrow: 1
  },
  botaoSalvar: {
    backgroundColor: '#6BCB77',
    flexGrow: 1
  },
  botaoCancelar: {
    backgroundColor: '#FFC0CB',
    flexGrow: 1
  },
  textoBotaoEditar: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  textoBotaoDeletar: {
    color: '#d32f2f',
    fontSize: 14,
    fontWeight: 'bold'
  },
  textoBotaoSalvar: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  textoBotaoCancelar: {
    color: '#d32f2f',
    fontSize: 14,
    fontWeight: 'bold'
  },
  botaoVoltar: {
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  textoBotaoVoltar: {
    color: '#171717',
    fontSize: 16,
    fontWeight: '600'
  }
});