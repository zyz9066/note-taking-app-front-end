import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingOverlay = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default LoadingOverlay;
