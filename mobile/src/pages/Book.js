import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

function Book ({ route, navigation }) {
   const book = route.params.item

    return (
        <>
        <View style={styles.container}>
            <Image style={styles.bookImage} source={{uri: book.image}}/>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookAuthor}>{book.authors}</Text>
            <Text style={styles.bookDescription}>Sinopse</Text>
            <Text style={styles.bookDescription}>{book.description}</Text>

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonFavorite}> 
                    <View>
                        <MaterialIcons name="favorite" size={20} color="#000" />
                        <Text style={styles.buttonTextFavorite}>Adicionar aos favoritos</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonExchange}> 
                    <View>
                        <MaterialIcons name="compare-arrows" size={20} color="#FFF952" />
                        <Text style={styles.buttonTextExchange}>Quero trocar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
}

export default Book

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    bookImage: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
    },
    bookDescription: {
        fontSize: 14,
    },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    buttonFavorite: {
        width: '85%',
        height: 50,
        backgroundColor: '#FFF952',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonExchange: {
        width: '85%',
        height: 50,
        backgroundColor: '#193C58',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextFavorite: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonTextExchange: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#FFF",
        marginBottom: 16
    },
})