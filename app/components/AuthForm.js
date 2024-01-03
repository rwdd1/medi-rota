'use client'

import { useFormState } from 'react-dom';
import { authenticate, signUp } from '../lib/actions';

export default function AuthForm({ type }) {
  const action = (type === "login") ? authenticate : signUp
  const [errorMessage, dispatch] = useFormState(action, undefined);
  
  return (
    <>
      <span>{errorMessage}</span>
      <form 
        action={dispatch}
        className="flex-col auth-form"
      >
        <label htmlFor="username">Username</label>
        <input id="username" name="username" pattern="[A-Za-z0-9]+" required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
        <button>{(type === "login") ? "Log In" : "Sign Up"}</button>
      </form>
    </>
  )
}