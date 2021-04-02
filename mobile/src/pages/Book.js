import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { starsRating } from '../utils';

import api from '../services/api';

function Book({ route }) {
    const book = route.params.item;
    const userId = route.params.userId;

    const [favorite, setFavorite] = useState(book.favorite);
    const [swap, setSwap] = useState(book.swap);
    const [data, setData] = useState([]);

    const alertFavorite = () => {
        !favorite && Alert.alert(
            "",
            "Livro favoritado :)",
            [
                { text: "OK", onPress: () => console.log("OK alertFavorite") }
            ]
        )
    }

    const alertSwap = () => {
        !swap && Alert.alert(
            "",
            "Pronto! Esse livro foi marcado para troca. Agora é só esperar alguém entrar em contato :)",
            [
                { text: "OK", onPress: () => console.log("OK alertSwap") }
            ]
        )
    }

    const handleSetFavorite = () => {
        setFavorite(!favorite);
        handleUpdateBook();
        alertFavorite();
    }

    const handleSetSwap = () => {
        setSwap(!swap);
        handleUpdateBook();
        alertSwap();
    }

    const handleUpdateBook = () => {
        api.get(`user/${userId}/books`).then(response => {
            setData(response.data);
        })

        if (data.some(d => d.id === book.id)) {
            api.put(`user/${userId}/book/${book.id}`, {
                favorite,
                swap
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log('Erro ao cadastrar: ' + err);
            })
        } else {
            const { id,
                title,
                authors,
                description,
                categories,
                average_rating,
                ratings_count,
                image,
                favorite,
                swap } = book;
            api.post(`user/${userId}/book/${book.id}`, {
                id,
                title,
                authors,
                description,
                categories,
                average_rating,
                ratings_count,
                image,
                favorite,
                swap,
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log('Erro ao cadastrar: ' + err);
            })
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.bookImage} source={{ uri: book.image }} />
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{(book.authors.replace("[", "").replace("\"", "").replace("]", "").replace("\"", ""))}</Text>

                <View style={styles.ratingBox}>
                    {starsRating(book.average_rating)}
                </View>
                <Text style={styles.bookRatingsCount}>{book.ratings_count} avaliações</Text>
            </View>

            <View style={styles.containerButton}>
                <Text style={styles.bookSinopse}>Sinopse</Text>
                <Text style={styles.bookDescription}>{book.description}</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={handleSetFavorite} style={styles.buttonContainer}>
                        <View style={styles.buttonFavorite}>
                            <MaterialIcons name={favorite ? 'favorite' : 'favorite-outline'} size={20} color="#000" style={styles.icon}></MaterialIcons>
                            <Text style={styles.buttonTextFavorite}>{favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSetSwap} style={styles.buttonContainer}>
                        <View style={swap ? styles.buttonSwapTrue : styles.buttonSwapFalse}>
                            <MaterialIcons name="compare-arrows" size={20} color="#FFF952" style={styles.icon} />
                            <Text style={swap ? styles.buttonTextSwapTrue : styles.buttonTextSwapFalse}>{swap ? 'Desistir de trocar' : 'Quero trocar'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Book

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerButton: {
        flex: 1,
    },
    ratingBox: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bookImage: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5
    },
    bookAuthor: {
        fontSize: 16,
        color: '#666',
        padding: 5
    },
    bookRatingsCount: {
        fontSize: 14,
        color: '#666',
        padding: 5
    },
    bookDescription: {
        fontSize: 14,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    bookSinopse: {
        fontSize: 14,
        padding: 5,
        paddingStart: 20,
        color: '#666',
        alignItems: 'flex-start',
    },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 16
    },
    buttonFavorite: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        height: 50,
        backgroundColor: '#FFF952',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    buttonSwapFalse: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        height: 50,
        backgroundColor: '#193C58',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    buttonSwapTrue: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 25,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    buttonTextFavorite: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonTextSwapFalse: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonTextSwapTrue: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#FFF",
        marginBottom: 16
    },
    buttonContainer: {
        padding: 3
    },
    icon: {
        padding: 5,
    },
})