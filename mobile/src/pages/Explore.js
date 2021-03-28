import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import api from '../services/api';

function Explore({ navigation }) {
    const userId = 1
    const [books, setBooks] = useState([]);
    const [value, setValue] = useState("");
    const [apiKey, setApiKey] = useState("AIzaSyAJuZ1hNfpktAk7BXiH2lQtBlDS9dXxDtM");
    const [loading, setLoading] = useState(false);

    async function loadBooks() {
        if (loading) {
            return;
        }

        setLoading(true);

        // const response = await api.get('books/search', {
        //     title: value,
        //     author: ""
        //     //   params: { page }
        // });

        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${apiKey}&maxResults=40`)
            .then(response => {
                if (response.data.items.length > 0) {
                    setBooks(response.data.items);
                }
            });

        setLoading(false);
    }

    const handleSearch = async () => {
        loadBooks();

        // api.post('books/search', {
        //     title: value
        // }).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log('Erro ao cadastrar: ' + err);
        // })
    }

    const handleNavigateToDetail = (book) => {
        const item = {
            swap: false,
            favorite: false,
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors.toString(),
            description: book.volumeInfo.description,
            categories: book.volumeInfo.categories,
            average_rating: book.volumeInfo.averageRating,
            ratings_count: book.volumeInfo.ratingsCount,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""
        }
        navigation.navigate('Book', { item, userId })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar livros..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                />

                <TouchableOpacity style={styles.loadButton} onPress={handleSearch}>
                    <MaterialIcons name="search" size={20} color="#FFF952" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={books}
                style={styles.booksList}
                keyExtractor={book => String(book.id)}
                showsVerticalScrollIndicator={true}
                // onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: book }) => (
                    <TouchableOpacity
                        style={styles.book}
                        onPress={() => handleNavigateToDetail(book)}
                    >
                        <Image style={styles.image} source={{ uri: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail }}></Image>
                        <Text>{book.volumeInfo.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

export default Explore

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#193C58',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    booksList: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 15,
    },
    book: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 5,
        margin: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#D4D9D5"
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 10
    }
})