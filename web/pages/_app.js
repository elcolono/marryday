import React from 'react';
import { ToastContainer } from 'react-toastify';

// Stylings
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
// import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}