import * as React from 'react';

import { LoginForm } from '../features/auth/LoginForm';
import { MainAppBar } from '../features/main-app-bar/MainAppBar';

export function LoginPage() {
  return (
    <>
      <MainAppBar />
      <LoginForm />
    </>
  );
}
