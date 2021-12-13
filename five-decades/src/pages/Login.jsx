import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === 'isaandrade1995@gmail.com' && password === 'az3b3003') {
      navigate('/countdown')
    } else {
      alert('Email/senha inválido(s)')
    }
  }
  return (
    <form action="" onSubmit={ handleSubmit } className='login-form'>
      <label htmlFor="email-inpt">
        Email:
        <input type="email" id="email-inpt" onChange={({target}) => setEmail(target.value)} />
      </label>

      <label htmlFor="password-inpt">
        Senha:
        <input type="password" id="password-inpt" onChange={({target}) => setPassword(target.value)} />
      </label>
      <button type="submit">Entrar</button>
    </form>

  );
}

export default Login;