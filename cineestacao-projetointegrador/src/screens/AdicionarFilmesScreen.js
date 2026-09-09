import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

import Estrelas from '../components/Estrelas';
import EscolherCor, { CORES_FILME } from '../components/EscolherCor';
import { buscarAvaliacoes, salvarAvaliacoes } from '../services/storage';

export default function AdicionarFilmesScreen({ navigation }) {
  // Guarda o nome do filme
  const [titulo, setTitulo] = useState('');

  // Guarda a quantidade de estrelas
  const [nota, setNota] = useState(0);

  // Guarda a cor escolhida
  const [corSelecionada, setCorSelecionada] = useState(CORES_FILME[0].valor);

  // Guarda o comentário
  const [comentario, setComentario] = useState('');

  // Função para salvar o filme
  async function salvarFilme() {
    // Verifica se o nome foi preenchido
    if (titulo.trim() === '') {
      Alert.alert('Atenção', 'Digite o nome do filme.');
      return;
    }

    // Verifica se alguma estrela foi selecionada
    if (nota === 0) {
      Alert.alert('Atenção', 'Escolha uma nota de 1 a 5 estrelas.');
      return;
    }

    // Verifica se o comentário foi preenchido
    if (comentario.trim() === '') {
      Alert.alert('Atenção', 'Digite um comentário.');
      return;
    }

    try {
      // Busca as avaliações que já existem
      const filmes = await buscarAvaliacoes();

      // Cria o novo filme
      const novoFilme = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        nota: nota,
        cor: corSelecionada,
        comentario: comentario.trim(),
        dataCriacao: new Date().toISOString()
      };

      // Coloca o novo filme junto com os antigos
      const novaLista = [novoFilme, ...filmes];

      // Salva no celular
      await salvarAvaliacoes(novaLista);

      // Mostra mensagem de sucesso e volta para a lista
      Alert.alert('Sucesso!', 'Filme avaliado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar a avaliação.');
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      {/* Título da tela */}
      <Text style={styles.titulo}>Avaliar Filme 🎬</Text>

      {/* Nome do filme */}
      <Text style={styles.label}>Nome do filme</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme"
        value={titulo}
        onChangeText={setTitulo}
      />

      {/* Avaliação */}
      <Text style={styles.label}>Sua avaliação</Text>
      <Estrelas nota={nota} setNota={setNota} tamanho={48} />

      {/* Mostra a nota escolhida */}
      <Text style={styles.notaTexto}>
        {nota === 0 ? 'Escolha uma nota' : `${nota} de 5 estrelas`}
      </Text>

      {/* Cor do filme */}
      <Text style={styles.label}>🎨 Cor do filme</Text>
      <EscolherCor
        corSelecionada={corSelecionada}
        setCorSelecionada={setCorSelecionada}
      />

      {/* Nome da cor selecionada */}
      <Text style={styles.corTexto}>
        {CORES_FILME.find((cor) => cor.valor === corSelecionada)?.nome}
      </Text>

      {/* Comentário */}
      <Text style={styles.label}>Comentário</Text>
      <TextInput
        style={[styles.input, styles.comentario]}
        placeholder="Escreva o que você achou do filme..."
        value={comentario}
        onChangeText={setComentario}
        multiline={true}
        numberOfLines={6}
        textAlignVertical="top"
      />

      {/* Botão salvar */}
      <TouchableOpacity style={styles.botao} onPress={salvarFilme}>
        <Text style={styles.textoBotao}>⭐ Salvar avaliação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },

  conteudo: {
    padding: 20,
    paddingBottom: 40
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25
  },

  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16
  },

  comentario: {
    minHeight: 140
  },

  notaTexto: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777777',
    marginTop: 8
  },

  corTexto: {
    textAlign: 'center',
    fontSize: 15,
    color: '#777777',
    marginTop: 2
  },

  botao: {
    backgroundColor: '#171717',
    padding: 17,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});