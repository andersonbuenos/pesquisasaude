// src/components/Register.tsx

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

  const [municipios, setMunicipios] = useState<string[]>([]);
  const [bairros, setBairros] = useState<string[]>([]);
  const [ruas, setRuas] = useState<string[]>([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>('');
  const [selectedBairro, setSelectedBairro] = useState<string>('');

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    nomeUnidade: '',
    street: '',
    bairro: '',
    city: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Por favor entre com o seu primeiro nome')
      .min(2, 'O nome deve ter pelo menos 2 caracteres')
      .matches(/^[a-zA-Z]+$/, 'Não são permitidos caracteres especiais'),
    lastName: Yup.string().required('Por favor entre com seu último nome'),
    email: Yup.string()
      .required('Por favor entre com seu email')
      .email('Formato inválido'),
    phoneNumber: Yup.string()
      .required('Por favor insira seu número de telefone celular')
      .matches(/^\d{11}$/, 'O número de telefone deve ter 11 dígitos'),
    nomeUnidade: Yup.string().required('Por favor insira o nome da sua unidade'),
    street: Yup.string().required('Por favor insira sua rua'),
    bairro: Yup.string().required('Por favor insira seu bairro'),
    city: Yup.string().required('Por favor insira sua cidade'),
  });

  useEffect(() => {
    // Chame a API que retorna os municípios e configure o estado 'municipios'
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get('/api/municipios'); // Ajuste a URL da API conforme necessário
        setMunicipios(response.data); // Supondo que a resposta seja uma lista de municípios
      } catch (error) {
        console.error('Erro ao buscar municípios:', error);
      }
    };
    fetchMunicipios();
  }, []);

  const handleMunicipioChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const municipio = event.target.value;
    setSelectedMunicipio(municipio);
    
    try {
      const response = await axios.get(`/api/geographicAddress`, {
        params: {
          address: municipio
        }
      });
      setBairros(response.data.bairros || []); // Ajuste o caminho conforme a estrutura da resposta
      setSelectedBairro(''); // Limpar o bairro selecionado ao trocar o município
      setRuas([]); // Limpa as ruas ao trocar o município
    } catch (error) {
      console.error('Erro ao buscar bairros:', error);
    }
  };

  const handleBairroChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const bairro = event.target.value;
    setSelectedBairro(bairro);
    
    try {
      const response = await axios.get(`/api/geographicAddress`, {
        params: {
          address: bairro
        }
      });
      setRuas(response.data.ruas || []); // Ajuste o caminho conforme a estrutura da resposta
    } catch (error) {
      console.error('Erro ao buscar ruas:', error);
    }
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form values:', values);
    console.log('Collected location:', location);
    
    const finalValues = {
      ...values,
      municipio: selectedMunicipio,
      bairro: selectedBairro,
    };
    
    console.log('Final values to submit:', finalValues);
    
    setSubmitted(true);
    navigate('/questions');
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log('Latitude:', latitude, 'Longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Cadastro - Unidade de Saúde</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Field
                    name="firstName"
                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                      submitted && errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Primeiro Nome"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <Field
                    name="lastName"
                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                      submitted && errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Último Nome"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                name="email"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Celular</label>
              <Field
                name="phoneNumber"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="6799111-1111"
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Endereço da Unidade de Saúde</label>
              <Field
                name="nomeUnidade"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.nomeUnidade ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex. Hospital municipal"
              />
              <ErrorMessage name="nomeUnidade" component="div" className="text-red-500 text-sm mt-1" />
              
              <Field
                name="city"
                as="select"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={handleMunicipioChange}
              >
                <option value="" label="Selecione o Município" />
                {municipios.map((municipio) => (
                  <option key={municipio} value={municipio}>
                    {municipio}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
              
              <Field
                name="bairro"
                as="select"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.bairro ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={handleBairroChange}
              >
                <option value="" label="Selecione o Bairro" />
                {bairros.map((bairro) => (
                  <option key={bairro} value={bairro}>
                    {bairro}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="bairro" component="div" className="text-red-500 text-sm mt-1" />
              
              <Field
                name="street"
                as="select"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.street ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="" label="Selecione a Rua" />
                {ruas.map((rua) => (
                  <option key={rua} value={rua}>
                    {rua}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="street" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <Field
                name="password"
                type="password"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Senha"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
              <Field
                name="confirmPassword"
                type="password"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirme sua senha"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button
              type="submit"
              onClick={getLocation}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
            >
              Obter Localização
            </button>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Cadastrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
