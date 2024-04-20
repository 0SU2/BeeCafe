// NOTA: Este archivo no lo encuentra si esta dentro del server, pero si esta dentro del client si va a funciona

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyANRfBwZ1wOFrJif_088nLtQpdPbu7fecI",
  authDomain: "beecafeee-edd71.firebaseapp.com",
  projectId: "beecafeee-edd71",
  storageBucket: "beecafeee-edd71.appspot.com",
  messagingSenderId: "142480802433",
  appId: "1:142480802433:web:71fe95050532bf609b4380",
  measurementId: "G-72TJHG8YNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Registrar nuevos usuarios
const registerUser = (email, password) => {
  console.log("Registrando nuevo usuario...");
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("@@ Usuario registrado correctamente:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("@@ Error al registrar usuario:", errorCode, errorMessage);
    });
}

// Iniciar sesión usuarios existentes
const loginUser = (email, password) => {
  console.log("Iniciando sesion...");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("@@ Inicio de sesion correcto", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("@@ Error al iniciar sesion:", errorCode, errorMessage);
    });
}

const sendPasswordReset = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("@@ Se envio restablecimiento de contrasenia a:", email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("@@ Error al enviar restablecimiento de contrasenia:", errorCode, errorMessage);
    });
}

export { registerUser, loginUser, sendPasswordReset };