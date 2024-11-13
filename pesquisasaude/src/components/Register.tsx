// src/components/Register.tsx

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { fetchLocalidades } from '../services/localidadeService';

interface Municipio {
  id: number;
  nome: string;
}

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  nomeUnidade: '',
  cep: '',
  street: '',
  number: '',
  bairro: '',
  city: '',
  state: '',
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
  cep: Yup.string()
    .required('Por favor insira o CEP')
    .matches(/^\d{5}-\d{3}$/, 'Formato de CEP inválido'),
  street: Yup.string().required('Por favor insira sua rua'),
  number: Yup.string().required('Por favor insira o número'),
  bairro: Yup.string().required('Por favor insira seu bairro'),
  city: Yup.string().required('Por favor insira sua cidade'),
  state: Yup.string().required('Por favor insira seu estado'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  useEffect(() => {
    const loadMunicipios = async () => {
      const data = await fetchLocalidades();
      setMunicipios(Array.isArray(data) ? data : []);
    };
    loadMunicipios();
  }, []);

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const cep = event.target.value;
    setFieldValue('cep', cep);

    if (cep.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;

        if (data.erro) {
          alert('CEP não encontrado');
        } else {
          setFieldValue('street', data.logradouro);
          setFieldValue('bairro', data.bairro);
          setFieldValue('city', data.localidade);
          setFieldValue('state', data.uf);
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar CEP');
      }
    }
  };

  // Register.tsx
  const handleRegister = async (values: typeof initialValues) => {
    try {
      const response = await axios.post('http://localhost:3000/register', values);
      if (response.status === 201) {
        navigate('/questions');
      }
    } catch (error) {
      console.error("Erro ao registrar o usuário:", error);
    }
  };


  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log('Enviando valores:', values);

      // Enviar os dados para o backend
      const response = await axios.post('http://localhost:3000/register', values);

      if (response.status === 201) {
        setSubmitted(true);  // Marca como enviado
        navigate('/questions');  // Redireciona para a página "questions" após o sucesso
      } else {
        alert('Ocorreu um erro ao cadastrar. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
      alert('Ocorreu um erro ao cadastrar. Por favor, tente novamente.');
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log('Localização obtida:', position.coords);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    } else {
      console.error('Geolocation não é suportado por este navegador.');
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
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Field
                    name="firstName"
                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${submitted && errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Primeiro Nome"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <Field
                    name="lastName"
                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${submitted && errors.lastName ? 'border-red-500' : 'border-gray-300'
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
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${submitted && errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Celular</label>
              <Field
                name="phoneNumber"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${submitted && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="6799111-1111"
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Endereço da Unidade de Saúde</label>
              <label className="block text-sm font-medium text-gray-700">CEP</label>
              <Field
                name="cep"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${submitted && errors.cep ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="00000-000"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCepChange(e, setFieldValue)}
              />
              <ErrorMessage name="cep" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Campos de endereço preenchidos automaticamente */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Rua</label>
              <Field
                name="street"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm border-gray-300"
                placeholder="Rua"
              />
              <ErrorMessage name="street" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Número</label>
              <Field
                name="number"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm border-gray-300"
                placeholder="Número"
              />
              <ErrorMessage name="number" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <Field
                name="bairro"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm border-gray-300"
                placeholder="Bairro"
              />
              <ErrorMessage name="bairro" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <Field
                name="city"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm border-gray-300"
                placeholder="Cidade"
              />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <Field
                name="state"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm border-gray-300"
                placeholder="Estado"
              />
              <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="bg-cyan-900 text-white p-2 rounded-md"
                onClick={getLocation}
              >
                Obter Localização Atual
              </button>
              {location.latitude && location.longitude && (
                <div className="text-sm text-gray-700 mt-2">
                  Localização: Latitude {location.latitude}, Longitude {location.longitude}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2 text-white bg-cyan-900 rounded-lg hover:bg-stone-500"
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
