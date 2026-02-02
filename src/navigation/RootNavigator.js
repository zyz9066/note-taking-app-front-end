import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteEditorScreen from '../screens/NoteEditorScreen';
import NotesListScreen from '../screens/NotesListScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NotesTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="NotesList"
      component={NotesListScreen}
      options={{title: 'My Notes'}}
    />
    <Tab.Screen
      name="NoteEditor"
      component={NoteEditorScreen}
      options={{title: 'New Note'}}
      initialParams={{mode: 'create'}}
    />
  </Tab.Navigator>
);

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="NotesTabs"
        component={NotesTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditNote"
        component={NoteEditorScreen}
        options={{title: 'Edit Note'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
