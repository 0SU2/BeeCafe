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

export function AuthProvider({children}:React.PropsWithChildren) {
  
  const rootSegment = useSegments()[0];
  const router = useRouter(); // nos permite navegar entre paginas
  const [user, setUser] = React.useState<string | undefined>("or.rosaszavala@ugto.mx");
  const [idUser, setIdUser] = React.useState<number>();
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
        signIn: (correo:string, contrasena:string) => {
          if(correo.trim() === "" || contrasena.trim() === "") {
            // en caso de que no haya ingresado ningun valor
            alert("Rellene bien las casillas anteriores");
            return;
          }
          // falta la conexcion a la base de datos y revisar
          // en caso de que falle firebase y la base de datos, se le hara saber
          setUser(correo)
        },
        // nueva funcion para el ingreso de usuario apenas registrados
        singInNewUser: (correo:string, nombre:string) => {
          if(correo.trim() === "" ) {
            Alert.alert("Error", "Rellene bien las casillas anteriores");
            return;
          }

          setUser(correo);
        },
        signOut: () => {
          // funcion para eliminar la sesion del usuario
          setUser("");
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
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}