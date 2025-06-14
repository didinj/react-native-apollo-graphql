import React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
    }
  }
`;

const MainScreen = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.content}</Text>
        </View>
      )}
    />
  );
};

export default MainScreen;