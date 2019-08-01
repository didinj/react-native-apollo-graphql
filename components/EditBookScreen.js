import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_BOOK = gql`
    query book($bookId: String) {
        book(id: $bookId) {
            _id
            isbn
            title
            author
            description
            published_year
            publisher
            updated_date
        }
    }
`;

const UPDATE_BOOK = gql`
    mutation updateBook(
        $id: String!,
        $isbn: String!,
        $title: String!,
        $author: String!,
        $description: String!,
        $publisher: String!,
        $published_year: Int!) {
        updateBook(
        id: $id,
        isbn: $isbn,
        title: $title,
        author: $author,
        description: $description,
        publisher: $publisher,
        published_year: $published_year) {
            updated_date
        }
    }
`;

class EditBookScreen extends Component {
  static navigationOptions = {
    title: 'Edit Book',
  };

  state = {
    isbn: '',
    title: '',
    author: '',
    description: '',
    published_year: '',
    publisher: '',
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  render() {
    const { navigation } = this.props;
    const { isbn, title, author, description, published_year, publisher } = this.state;
    return (
      <Query query={GET_BOOK} variables={{ bookId: navigation.getParam('id') }}>
        {({ loading, error, data }) => {
          if (loading) return(<View style={styles.activity}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>);
          if (error) return(<Text>`Error! ${error.message}`</Text>);
          return (
            <Mutation mutation={UPDATE_BOOK} key={data.book._id} onCompleted={() => navigation.goBack()}>
              {(updateBook, { loading2, error2 }) => (
                <ScrollView style={styles.container}>
                  <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'ISBN'}
                        defaultValue={data.book.isbn}
                        onChangeText={(text) => this.updateTextInput(text, 'isbn')}
                    />
                  </View>
                  <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Title'}
                        defaultValue={data.book.title}
                        onChangeText={(text) => this.updateTextInput(text, 'title')}
                    />
                  </View>
                  <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Author'}
                        defaultValue={data.book.author}
                        onChangeText={(text) => this.updateTextInput(text, 'author')}
                    />
                  </View>
                  <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Description'}
                        multiline={true}
                        numberOfLines={4}
                        defaultValue={data.book.description}
                        onChangeText={(text) => this.updateTextInput(text, 'description')}
                    />
                  </View>
                  <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Published Year'}
                        defaultValue={data.book.published_year.toString()}
                        keyboardType='numeric'
                        onChangeText={(text) => this.updateTextInput(text, 'published_year')}
                    />
                  </View>
                  <View style={styles.subContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Publisher'}
                        defaultValue={data.book.publisher}
                        onChangeText={(text) => this.updateTextInput(text, 'publisher')}
                    />
                  </View>
                  <View>
                    <Button
                      large
                      leftIcon={{name: 'save'}}
                      title='Save'
                      onPress={() => {
                        if (this.state.isbn === '')
                          this.state.isbn = data.book.isbn;
                        if (this.state.title === '')
                          this.state.title = data.book.title;
                        if (this.state.author === '')
                          this.state.author = data.book.author;
                        if (this.state.description === '')
                          this.state.description = data.book.description;
                        if (this.state.publisher === '')
                          this.state.publisher = data.book.publisher;
                        if (this.state.published_year === '')
                          this.state.published_year = data.book.published_year;
                        updateBook({
                          variables: {
                            id: data.book._id,
                            isbn: this.state.isbn,
                            title: this.state.title,
                            author: this.state.author,
                            description: this.state.description,
                            publisher: this.state.publisher,
                            published_year: parseInt(this.state.published_year),
                          }
                        })
                          .then(res => res)
                          .catch(err => <Text>{err}</Text>);
                      }} />
                  </View>
                  {loading2 && <View style={styles.activity}>
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>}
                  {error2 && <Text>`Error! ${error2.message}`</Text>}
                </ScrollView>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    fontSize: 18,
    margin: 5,
  },
})

export default EditBookScreen;