import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Button, FlatList, RefreshControl, View } from 'react-native';
import { useAuthorizedClient } from '../api/axiosClient';
import { createNotesApi } from '../api/notesApi';
import { useAuth } from '../auth/AuthProvider';
import ErrorMessage from '../components/ErrorMessage';
import LoadingOverlay from '../components/LoadingOverlay';
import NoteItem from '../components/NoteItem';

const NotesListScreen = () => {
  const client = useAuthorizedClient();
  const notesApi = createNotesApi(client);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const {logout} = useAuth();

  const loadNotes = async () => {
    try {
      setError('');
      const data = await notesApi.getNotes();
      setNotes(data);
    } catch (e) {
      const msg = e.response?.data?.message || 'Failed to load notes.';
      setError(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadNotes();
    }, []),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNotes();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={{flex: 1}}>
      <Button title="New Note" onPress={() => navigation.navigate('NoteEditor', {mode: 'create'})} />
      <Button title="Logout" onPress={logout} />
      <ErrorMessage message={error} />
      <FlatList
        data={notes}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <NoteItem
            note={item}
            onPress={() => navigation.navigate('EditNote', {mode: 'edit', noteId: item._id})}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default NotesListScreen;
