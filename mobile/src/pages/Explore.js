import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import api from '../services/api';

function Explore() {
    const [books, setBooks] = useState([]);
    const [value, setValue] = useState("");
    // const [total, setTotal] = useState(0);

    // paginação infinita
    //   const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadBooks() {
        if (loading) {
            return;
        }

        // if (total > 0 && books.length === total) {
        //   return;
        // }

        setLoading(true);

        // const response = await api.get('books/search', {
        //     title: value,
        //     author: ""
        //     //   params: { page }
        // });

        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
            .then(res => {
                if (res.data.items.length > 0) {
                    setBooks(res.data.items);
                }
            });

        // somando vetor de incidents atual com o que vem da response
        // setBooks(response.data);
        // console.log(response.data)
        // setTotal(response.headers['x-total-count']);
        // setPage(page + 1);
        setLoading(false);
    }

    const handleSearch = async () => {
        console.log(value);
        loadBooks();
        // let books = [];

        // await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
        //     .then(res => {
        //         if (res.data.items.length > 0) {
        //             books = res.data.items;
        //         }
        //     });

        // console.log('cadee', books)

        // api.post('books/search', {
        //     title: value
        // }).then((res) => {
        //     console.log('oiiiiii')
        //     console.log(res)
        // }).catch((err) => {
        //     console.log('Erro ao cadastrar: ' + err);
        // })
    }

    return (
        <View>
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
                // style={styles.incidentList}
                keyExtractor={book => String(book.id)}
                showsVerticalScrollIndicator={true}
                // onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: book }) => (
                    <View>
                        <Image source={{ uri: book.volumeInfo.imageLinks.smallThumbnail }}></Image>
                        <Text>{book.id}, {book.volumeInfo.title}</Text>
                        {/* <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(incident.value)}
            </Text>

            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"></Feather>
            </TouchableOpacity> */}
                    </View>
                )}
            />
        </View>
    )
}

export default Explore

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})