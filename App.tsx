import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PostDetail from './src/screens/PostDetail';
import CreatePost from './src/components/CreatePost';
import EditPost from './src/screens/EditPost';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="EditPost" component={EditPost} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
