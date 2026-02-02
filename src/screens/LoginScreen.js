import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../auth/AuthProvider';

const LoginScreen = () => {
  const {login} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to NoteTaker</Text>
      <Text style={styles.subtitle}>Please log in to manage your notes.</Text>
      <Button title="Log in with Auth0" onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 12},
  subtitle: {fontSize: 16, textAlign: 'center', marginBottom: 24},
});

export default LoginScreen;
