// Funciones CRUD para el menu de comida
import { getFirestore, collection, doc, setDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore();

// Obtener menu
const getMenu = async () => {
  console.log("@@@ Obtener menu...");
  try {
    const menuSnapshot = await getDocs(collection(db, 'menu'));
    const menu = [];

    menuSnapshot.forEach((doc) => {
      menu.push({ id: doc.id, ...doc.data() });
    });

    return menu;
  } catch (error) {
    console.error('@@ Error al obtener el menu:', error);
    throw error;
  }
};

// Agregar plato al menu
const addMenuItem = async (menuItem) => {
  console.log("@@@ Agregar plato al menu...");
  try {
    const docRef = await addDoc(collection(db, 'menu'), menuItem);
    console.log('@@ Nuevo plato agregado al menu con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('@@ Error al agregar un nuevo plato al menu:', error);
    throw error;
  }
};

// Actualizar plato en el menu
const updateMenuItem = async (itemId, updatedItem) => {
  console.log("@@@ Actualizar plato en el menu...");
  try {
    const itemRef = doc(db, 'menu', itemId);
    await updateDoc(itemRef, updatedItem);
    console.log('@@ Plato actualizado con ID:', itemId);
  } catch (error) {
    console.error('@@ Error al actualizar el plato en el menu:', error);
    throw error;
  }
};

// Eliminar plato del menu
const deleteMenuItem = async (itemId) => {
  console.log("@@@ Eliminar plato del menu...");
  try {
    await deleteDoc(doc(db, 'menu', itemId));
    console.log('@@ Plato eliminado con ID:', itemId);
  } catch (error) {
    console.error('@@ Error al eliminar el plato del menu:', error);
    throw error;
  }
};

export { getMenu, addMenuItem, updateMenuItem, deleteMenuItem };
