import { Pressable, StyleSheet, Text, View } from 'react-native';

const NoteItem = ({note, onPress}) => (
  <Pressable onPress={onPress} style={styles.container}>
    <View>
      <Text style={styles.title} numberOfLines={1}>
        {note.title || 'Untitled'}
      </Text>
      <Text style={styles.content} numberOfLines={2}>
        {note.content}
      </Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  title: {fontSize: 16, fontWeight: '600', marginBottom: 4},
  content: {fontSize: 14, color: '#555'},
});

export default NoteItem;
