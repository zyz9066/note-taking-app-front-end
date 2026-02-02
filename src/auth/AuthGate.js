import { ActivityIndicator, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import { useAuth } from './AuthProvider';

const AuthGate = ({children}) => {
  const {user, initializing} = useAuth();

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return children;
};

export default AuthGate;
