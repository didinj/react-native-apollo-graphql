import React, { Component } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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

const DELETE_BOOK = gql`
  mutation removeBook($id: String!) {
    removeBook(id:$id) {
      _id
    }
  }
`;

class BookDetailScreen extends Component {
  static navigationOptions = {
    title: 'Book Details',
  };
  render() {
    const { navigation } = this.props;
    return (
        <Query pollInterval={500} query={GET_BOOK} variables={{ bookId: navigation.getParam('id') }}>
            {({ loading, error, data }) => {
                if (loading) return(<View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>);
                if (error) return(<Text>`Error! ${error.message}`</Text>);
                return (
                    <ScrollView>
                        <Card style={styles.container}>
                            <View style={styles.subContainer}>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>ISBN:</Text>
                                    <Text style={{fontSize: 18, marginBottom: 10}}>{data.book.isbn}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Title: </Text>
                                    <Text style={{fontSize: 18, marginBottom: 10}}>{data.book.title}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Author: </Text>
                                    <Text style={{fontSize: 18, marginBottom: 10}}>{data.book.author}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Description: </Text>
                                    <Text style={{fontSize: 18, marginBottom: 10}}>{data.book.description}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Published Year: </Text>
                                    <Text style={{fontSize: 18, marginBottom: 10}}>{data.book.published_year}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Publisher: </Text>
                                    <Text style={{fontSize: 18, marginBottom: 10}}>{data.book.publisher}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Updated Date: </Text>
                                    <Text style={{fontSize: 18}}>{data.book.updated_date}</Text>
                                </View>
                            </View>
                            <Mutation mutation={DELETE_BOOK} key={data.book._id} onCompleted={() => navigation.goBack()}>
                                {(removeBook, { loading2, error2 }) => (
                                    <View style={styles.subContainer}>
                                        <Button
                                        style={styles.detailButton}
                                        large
                                        backgroundColor={'#CCCCCC'}
                                        leftIcon={{name: 'edit'}}
                                        title='Edit'
                                        onPress={() => {
                                            navigation.navigate('EditBook', { id: `${data.book._id}`, });
                                        }} />
                                        <Button
                                        style={styles.detailButton}
                                        large
                                        backgroundColor={'#999999'}
                                        color={'#FFFFFF'}
                                        leftIcon={{name: 'delete'}}
                                        title='Delete'
                                        onPress={() => {
                                            removeBook({ variables: { id: data.book._id } })
                                            .then(res => res)
                                            .catch(err => <Text>{err}</Text>);
                                        }} />
                                        {loading2 && <View style={styles.activity}>
                                            <ActivityIndicator size="large" color="#0000ff" />
                                          </View>}
                                        {error2 && <Text>`Error! ${error2.message}`</Text>}
                                    </View>
                                )}
                            </Mutation>
                        </Card>
                    </ScrollView>
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
        paddingBottom: 20,
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
    detailButton: {
        marginTop: 10
    }
})

export default BookDetailScreen;