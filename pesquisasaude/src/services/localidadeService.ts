// src/services/ibgeService.ts

import axios from 'axios';

export interface Municipio {
  id: number;
  nome: string;
}

export const fetchLocalidades = async () => {
  try {
    const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/50/municipios');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar municípios:', error);
    return [];
  }
};
