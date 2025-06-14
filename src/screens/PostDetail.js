import React from 'react';
import { View, Text, Button } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export default function PostDetail({ route, navigation }) {
  const { id } = route.params;
  const { data, loading, error } = useQuery(GET_POST, { variables: { id } });
  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => navigation.goBack(),
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { title, content } = data.post;

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ marginTop: 10 }}>{content}</Text>

      <Button title="Edit" onPress={() => navigation.navigate('EditPost', { id })} />
      <Button title="Delete" color="red" onPress={() => deletePost({ variables: { id } })} />
    </View>
  );
}