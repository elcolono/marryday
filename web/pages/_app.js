import React from 'react';
import { ToastContainer } from 'react-toastify';
import Fonts from '../helpers/Fonts';

import { AuthProvider } from '../services/auth';

// Stylings
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
// import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  )
}