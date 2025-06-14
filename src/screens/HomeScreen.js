import React from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query {
    posts {
      id
      title
    }
  }
`;

export default function HomeScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
      <FlatList
        data={data.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { id: item.id })}>
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}