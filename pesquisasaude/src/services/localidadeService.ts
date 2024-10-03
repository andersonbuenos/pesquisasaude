import axios from 'axios';

// Interface para representar o endereço geográfico
export interface Endereco {
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

// Função para buscar informações de endereço
export const buscarEndereco = async (logradouro: string, numero?: string): Promise<Endereco | null> => {
  try {
    // Monta a URL da API com os parâmetros
    const response = await axios.get(`/api/geographicAddress`, {
      params: {
        address: logradouro,
        number: numero,
      },
    });

    // Supondo que a API retorne os dados em um formato que contém as informações do endereço
    return response.data; // Ajuste conforme a estrutura da resposta da API
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    return null; // Retorna null em caso de erro
  }
};
