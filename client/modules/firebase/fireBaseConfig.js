// Archivo de inicializacion de funciones de Firebase
// **** En Firebase asegurarse de tener correctamente las reglas de Firestore para escribir ****

import { getApp, getApps, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence ,createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
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
let app, auth, db;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  db = getFirestore(app); // Inicializa Firestore
  } catch (error) {
    console.log("@@ Error de inicialización " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

// Registrar nuevos usuarios
const registerUser = async (email, password, nombre, aPaterno, aMaterno) => {
  console.log("@@@@ Registrando nuevo usuario...");
  try {
    // Crea el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guarda información adicional en Firestore
    await setDoc(doc(db, 'usuarios', user.uid), {
      est_apeMat: aMaterno,
      est_apePat: aPaterno,
      est_correo: email,
      est_nombre: nombre,
      est_password: password,
    });
    console.log("@@ Usuario registrado correctamente:", user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("@@ Error al registrar usuario:", errorCode, errorMessage);
    throw error; // Propaga el error para manejarlo en la aplicación
  }
}

// Iniciar sesión usuarios existentes
const loginUserFirebase = async (email, password) => {
  console.log("@@@@ Iniciando sesion...");
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("@@ Inicio correcto:", user);
        resolve(user); // Resolver la promesa con el usuario
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("@@ Error:", errorCode, errorMessage);
        reject(error); // Rechazar la promesa con el error
      });
  });
}


const sendPasswordReset = async(email) => {
  await sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("@@ Se envio restablecimiento de contrasenia a:", email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("@@ Error al enviar restablecimiento de contrasenia:", errorCode, errorMessage);
    });
}

export { registerUser, loginUserFirebase, sendPasswordReset };