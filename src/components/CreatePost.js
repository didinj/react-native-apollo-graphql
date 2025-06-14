import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';

const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
    }
  }
`;

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addPost, { data, loading }] = useMutation(ADD_POST);

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Content" value={content} onChangeText={setContent} multiline />
      <Button
        title={loading ? 'Saving...' : 'Create Post'}
        onPress={() => addPost({ variables: { title, content } })}
      />
    </View>
  );
};

export default CreatePost;