import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/Services/api';
import { signInSucess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    if (user.provider) {
      Alert.alert(
        'Erro no Login',
        'O usuário não pode ser prestador de serviço.'
      );
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Erro no Login',
      'Falha na autenticação, verefique seus dados!'
    );

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { nome, email, password } = payload;
    yield call(api.post, 'users', {
      nome,
      email,
      password,
    });
    // history.push('/');
  } catch (err) {
    Alert.alert('Erro no Cadastro', 'Verefique seus dados!');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
