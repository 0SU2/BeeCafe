import { Button, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { useAuth } from '../../../modules/context/auth';

export default function TabOneScreen() {
  const { signOut } = useAuth();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Button onPress={signOut} title="Salir" color={"orange"}/>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
