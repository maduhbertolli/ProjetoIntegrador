import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@cinerate_avaliacoes';

export async function buscarAvaliacoes() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE);

    if (dados === null) {
      return [];
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log('Erro ao buscar avaliações:', error);
    return [];
  }
}

export async function salvarAvaliacoes(avaliacoes) {
  try {
    await AsyncStorage.setItem(
      CHAVE,
      JSON.stringify(avaliacoes)
    );
  } catch (error) {
    console.log('Erro ao salvar avaliações:', error);
  }
}

export async function adicionarAvaliacao(avaliacao) {
  try {
    const avaliacoes = await buscarAvaliacoes();

    avaliacoes.push(avaliacao);

    await salvarAvaliacoes(avaliacoes);
  } catch (error) {
    console.log('Erro ao adicionar avaliação:', error);
  }
}

export async function limparAvaliacoes() {
  try {
    await AsyncStorage.removeItem(CHAVE);
  } catch (error) {
    console.log('Erro ao limpar avaliações:', error);
  }
}