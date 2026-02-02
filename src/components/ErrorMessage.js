import { StyleSheet, Text } from 'react-native';

const ErrorMessage = ({message}) =>
  message ? <Text style={styles.error}>{message}</Text> : null;

const styles = StyleSheet.create({
  error: {color: 'red', marginVertical: 8},
});

export default ErrorMessage;
