import { useRouter, useSegments } from 'expo-router';
import * as React from 'react';
import { Alert } from 'react-native';
import { comidaCafeteria } from '../../types/userTypes';

// no se tiene ningun usuario al inicio, por eso se deja como null
const AuthContext = React.createContext<any>(null);

// crear hook para usar el provider que acabamos de crear
export function useAuth() {
  return React.useContext(AuthContext)
}

let data:(comidaCafeteria[]) = []
let nose:(object[]) = []

export function AuthProvider({children}:React.PropsWithChildren) {
  
  const rootSegment = useSegments()[0];
  const router = useRouter(); // nos permite navegar entre paginas
  const [user, setUser] = React.useState<string | undefined>("");
  const [idUser, setIdUser] = React.useState<number | undefined>(undefined);
  const [cartItems, setCartItems] = React.useState<comidaCafeteria[]>([])
  
  // usar un useEffect para revisar si tenemos un usuario al cargar la pagina por primera vez
  React.useEffect(() => {
    // si no hay un usuario no tenemos que hacer nada
    if (user === undefined) {
      console.log("user undefined");
      router.replace("/(auth)/login");
    } 
    if(!user && rootSegment !== "(auth)") {
      // en caso que el usuario este definido pero no haya pasado aun 
      // por la authenticacion
      console.log("user in auth");
      router.replace("/(auth)/login");
    } else if (user && rootSegment !== "(app)") {
      // en caso de que el usuario se haya autenticado, se le llevara al menu
      // de su perfil y como parametro el nombre del usuario que se consiga para
      // busqueda 
      console.log(user)
      router.push({
        pathname: "/(tabs)/[user]",
        params: {user}
      });
    }
  }, [user, rootSegment, cartItems]);
  return(
    <AuthContext.Provider
      value={{
        user: user,
        signIn: (data:object) => {
          setUser(data[0].est_correo)
          setIdUser(data[0].est_id)
        },
        // nueva funcion para el ingreso de usuario apenas registrados
        singInNewUser: (data:object) => {
          setUser(data.newEst.correo)
          setIdUser(data.est_id);
        },
        signOut: () => {
          // funcion para eliminar la sesion del usuario
          setUser("");
          setIdUser(undefined);
        },   
        addItemsCart: (items:comidaCafeteria) => {
          data.push({...items});
          setCartItems(data);
        },
        removeItemCart: (newItems:comidaCafeteria[]) => {
          data = newItems;
          setCartItems(newItems)
        },
        deleteAllItemsCart: (newItems:comidaCafeteria[]) => {
          data = newItems
          setCartItems(data)
        },
        getAddedItemsCart: () => {
          return cartItems;
        },
        getUserId: () => {
          return idUser;
        }, 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}