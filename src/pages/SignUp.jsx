import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from '../components/InputLabel';
import { createUserApi, userLoginApi } from '../api/UserApi';

import '../styles/Signup.css';

function SignUp() {
  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    socialName: '',
    username: '',
    bornDate: '',
    motherName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const fields = [
    { id: 'firstName', label: 'Primeiro nome', type: 'text' },
    { id: 'lastName', label: 'Último nome', type: 'text' },
    { id: 'socialName', label: 'Nome social', type: 'text' },
    { id: 'username', label: 'Apelido', type: 'text' },
    { id: 'bornDate', label: 'Data de nascimento', type: 'text' },
    { id: 'motherName', label: 'Nome da mãe', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'phone', label: 'Telefone', type: 'tel' },
    { id: 'password', label: 'Senha', type: 'password' },
    {
      id: 'passwordConfirmation',
      label: 'Confirmação de senha',
      type: 'password',
    },
  ];

  const formatDateToBackend = (inputDate) => {
    const parts = inputDate.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    fields.forEach((field) => {
      const value = formData[field.id];

      if (!['socialName', 'username', 'phone'].includes(field.id)) {
        if (!value) {
          errors[field.id] = 'Este campo é obrigatório:';
        }
      }

      switch (field.id) {
        case 'bornDate':
          if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
            errors[field.id] = 'Data de nascimento inválida (dd/mm/aaaa)';
          }
          break;
        case 'email':
          if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
            errors[field.id] = 'Email inválido';
          }
          break;
        case 'password':
          if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{7,}/.test(value)) {
            errors[field.id] = 'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um caractere especial';
          }
          break;
        case 'passwordConfirmation':
          if (value !== formData.password) {
            errors[field.id] = 'As senhas não coincidem';
          }
          break;
        default:
          if (
            !['socialName', 'username'].includes(field.id)
            && !value
          ) {
            errors[field.id] = 'Este campo é obrigatório:';
          }

          setApiErrorMessage('');
          break;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApiError = (errorMessage) => {
    switch (errorMessage) {
      case 'email already in use':
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Este email já está em uso',
        }));
        break;
      case 'invalid ip address':
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          IpServerError: 'Algo deu errado =(',
        }));
        break;
      default:
        setApiErrorMessage('Erro de servidor');
        break;
    }
  };

  const validateSignUp = async () => {
    const formattedBornDate = formatDateToBackend(formData.bornDate);
    const signUpBody = {
      ...formData,
      bornDate: formattedBornDate,
    };

    try {
      await createUserApi(signUpBody);

      const { accessToken } = await userLoginApi(signUpBody.email, signUpBody.password);
      localStorage.setItem('todoAccessToken', accessToken);

      return true;
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message;
      handleApiError(errorMessage);

      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidForm = validateForm();

    if (isValidForm) {
      setIsLoading(true);
      const isValidSignUp = await validateSignUp();

      if (isValidSignUp) {
        navigate('/');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="background-image">
      <section className="signUp-section">
        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            {fields.map((field) => (
              <InputLabel htmlFor={field.id} key={field.id}>
                {fieldErrors[field.id] && (
                <span className="error-message">{fieldErrors[field.id]}</span>
                )}

                <input
                  name={field.id}
                  id={field.id}
                  value={formData[field.id]}
                  onChange={handleInputChange}
                  type={field.type}
                  placeholder={field.label}
                  className={fieldErrors[field.id] ? 'error' : ''}
                />
              </InputLabel>
            ))}
          </div>

          {apiErrorMessage && (
          <div className="error-message">{apiErrorMessage}</div>
          )}

          <div className="inputs-buttons">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
