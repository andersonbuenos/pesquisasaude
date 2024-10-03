// src/components/Register.tsx

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Register.css' 

const Register: React.FC = () => {
  const navigate = useNavigate(); // Iniciar useNavigate
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

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
    /* password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'), */
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form values:', values);
    console.log('Collected location:', location);
    setSubmitted(true);
    
    // Redirecionar para a página de perguntas após o envio
    navigate('/questions'); // Adiciona o redirecionamento aqui
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
                  submitted && errors.street ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex. Hospital municipal "
              />
              <ErrorMessage name="nomeUnidade" component="div" className="text-red-500 text-sm mt-1" />
              <Field
                name="street"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.street ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Rua Dom Pedro I, 1822"
              />
              <ErrorMessage name="street" component="div" className="text-red-500 text-sm mt-1" />
              <Field
                name="bairro"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Bairro"
              />
              <ErrorMessage name="bairro" component="div" className="text-red-500 text-sm mt-1" />
              <Field
                name="city"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Cidade"
              />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <button
                type="button"
                onClick={getLocation}
                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
              >
                Pegar Localização da Unidade de Saúde
              </button>

              {/* Mostrar a localização se estiver disponível */}
              {location.latitude && location.longitude && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Latitude: {location.latitude}</p>
                  <p>Longitude: {location.longitude}</p>
                </div>
              )}
            </div>

            {/* 
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Field
                name="password"
                type="password"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              <Field
                name="confirmPassword"
                type="password"
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  submitted && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            */}

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Entrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
