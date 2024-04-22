
// NOTA: Este archivo no lo encuentra si esta dentro del server, pero si esta dentro del client si va a funciona
import { getApp, getApps, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence ,createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// env variables para la configuracion de firebase, debes agregarlas en tu archivo .env con los nombres que se indican
// esto para mayor seguridad
import { API_KEY, AUTHDOMAIN, PROYECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID } from '@env'


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTHDOMAIN,
  projectId: PROYECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

// Inicializar firebase, previene que se reinicie en caso de que la pagina recargue
// provocando un error
let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    console.log("@@ Error de inicialización " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

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