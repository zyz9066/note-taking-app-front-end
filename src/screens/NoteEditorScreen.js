import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { useAuthorizedClient } from '../api/axiosClient';
import { createNotesApi } from '../api/notesApi';
import ErrorMessage from '../components/ErrorMessage';
import LoadingOverlay from '../components/LoadingOverlay';

const NoteEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {mode = 'create', noteId} = route.params || {};
  const client = useAuthorizedClient();
  const notesApi = createNotesApi(client);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      if (mode !== 'edit' || !noteId) return;
      try {
        setError('');
        const note = await notesApi.getNote(noteId);
        setTitle(note.title || '');
        setContent(note.content || '');
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [mode, noteId]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      setError('Title or content is required.');
      return;
    }
    try {
      setError('');
      if (mode === 'edit' && noteId) {
        await notesApi.updateNote(noteId, {title, content});
      } else {
        await notesApi.createNote({title, content});
      }
      navigation.goBack();
    } catch (e) {
      setError(e.message); // backend validation messages appear here
    }
  };

  const handleDelete = async () => {
    if (mode !== 'edit' || !noteId) return;
    Alert.alert('Delete note', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await notesApi.deleteNote(noteId);
            navigation.goBack();
          } catch (e) {
            setError(e.message);
          }
        },
      },
    ]);
  };

  if (loading) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ErrorMessage message={error} />
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.bodyInput}
        placeholder="Write your note..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title={mode === 'edit' ? 'Update Note' : 'Create Note'} onPress={handleSave} />
      {mode === 'edit' && (
        <View style={styles.deleteButton}>
          <Button title="Delete Note" color="red" onPress={handleDelete} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  titleInput: {fontSize: 18, fontWeight: '600', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 12, paddingVertical: 4},
  bodyInput: {flex: 1, fontSize: 16, textAlignVertical: 'top'},
  deleteButton: {marginTop: 12},
});

export default NoteEditorScreen;
