import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
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

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

export default function EditPost({ route, navigation }) {
  const { id } = route.params;
  const { data } = useQuery(GET_POST, { variables: { id } });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (data?.post) {
      setTitle(data.post.title);
      setContent(data.post.content);
    }
  }, [data]);

  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: () => navigation.navigate('PostDetail', { id }),
  });

  return (
    <View style={{ padding: 10 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Content" value={content} onChangeText={setContent} multiline />
      <Button title="Update" onPress={() => updatePost({ variables: { id, title, content } })} />
    </View>
  );
}