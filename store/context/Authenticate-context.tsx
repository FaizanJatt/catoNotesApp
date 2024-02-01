import {createContext} from 'react';
import {PropsWithChildren, useState} from 'react';
// import {useState} from 'react';
export const AuthenticateContext = createContext({
  password: '',
  auth: false,
  addPassword: (text: string) => {},
  removePassword: () => {},
  authenticateUser: () => {},
  resetAuth: () => {},
});

function AuthenticateContextProvider({children}: PropsWithChildren) {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');

  function addPassword(text: string) {
    setPass(text);
  }
  function removePassword() {
    setPass('');
  }
  function authenticateUser() {
    // if (enteredPass === pass) {
    console.log('USER AUTHENTICATED');
    setAuth(true);
    // }
  }
  function resetAuth() {
    console.log('RESETTING AUTH');
    setAuth(false);
  }

  const value = {
    password: pass,
    auth: auth,
    addPassword: addPassword,
    removePassword: removePassword,
    authenticateUser: authenticateUser,
    resetAuth: resetAuth,
  };

  return (
    <AuthenticateContext.Provider value={value}>
      {children}
    </AuthenticateContext.Provider>
  );
}

export default AuthenticateContextProvider;
