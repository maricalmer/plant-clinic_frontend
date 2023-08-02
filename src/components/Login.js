import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../utils/constants';

const SIGNUP_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!, $name: String!) {
    createUser(name: $name, authProvider: { credentials: { email: $email, password: $password } }) {
      token
      user {
        id
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signinUser(credentials: { email: $email, password: $password} ) {
      token
      user {
        id
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: (data) => {
      if (data.signinUser === null) {
        document.querySelector(".error-message").innerHTML = "wrong email/password"
      } else {
        const token = `${data.signinUser.token}/start/${data.signinUser.user.id}/end/`
        localStorage.setItem(AUTH_TOKEN, token);
        navigate('/');
      }
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: (data) => {
      console.log(`DATA FROM LOGIN.JS`)
      console.log(data.createUser)
      const token = `${data.createUser.token}/start/${data.createUser.user.id}/end/`
      localStorage.setItem(AUTH_TOKEN, token);
      navigate('/');
    }
  });

  return (
    <div className="merriweather">
      <div className="p-6 h-fit">
        <div className="font-bold text-6xl my-14">{formState.login ? 'Login' : 'Sign Up'}</div>
      </div>
      <div className="text-center">
        {!formState.login && (
          <input
            className="w-4/5 bg-neutral-100 rounded-xl p-3 border-2 border-lime-700 font-bold text-sm my-4 focus:outline-none sm:text-xl md:text-3xl lg:w-3/5"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Type your name..."
          />
        )}
        <input
          className="w-4/5 bg-neutral-100 rounded-xl p-3 border-2 border-lime-700 font-bold text-sm my-4 focus:outline-none sm:text-xl md:text-3xl lg:w-3/5"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Type your email address..."
        />
        <input
          className="w-4/5 bg-neutral-100 rounded-xl p-3 border-2 border-lime-700 font-bold text-sm my-4 focus:outline-none sm:text-xl md:text-3xl lg:w-3/5"
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Type your password..."
        />
      </div>
      <div className="error-message text-center h-5 text-xs text-red-500"></div>
      <div className="flex flex-col items-center">
        <button
          className="w-3/5 mt-4 bg-lime-500 rounded-md p-2 md:mt-10 lg:w-2/5"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="w-3/5 mt-4 bg-lime-500 rounded-md p-2 mb-20 lg:w-2/5"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;
