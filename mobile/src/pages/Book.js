import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

function Book ({ route }) {
   const book = route.params.item

   function starsRating(props) {
        let quantities = []
        for(let star=0; star < props; star++){
            quantities.push(<MaterialIcons key={star} name="star" size={20} color="#000" />)
        }

        return quantities
   }

    const alertFavorite = () => {
        Alert.alert(
            "",
            "Livro favoritado :)",
            [
                { text: "OK", onPress: () => console.log("OK alertFavorite") }
            ]
        )
    }

    const alertExchange = () => {
        Alert.alert(
            "",
            "Pronto! Esse livro foi marcado para troca. Agora é só esperar alguém entrar em contato :)",
            [
                { text: "OK", onPress: () => console.log("OK alertExchange") }
            ]
        )
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.bookImage} source={{uri: book.image}}/>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.authors}</Text>

                <View style={styles.ratingBox}>
                    {starsRating(book.average_rating)}
                </View>
                <Text style={styles.bookRatingsCount}>{book.ratings_count} avaliações</Text>
            </View>

            <View style={styles.containerButton}>
            <Text style={styles.bookSinopse}>Sinopse</Text>
                <Text style={styles.bookDescription}>{book.description}</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={alertFavorite} style={styles.buttonContainer}> 
                        <View style={styles.buttonFavorite}>
                            <MaterialIcons name="favorite" size={20} color="#000" style={styles.icon}></MaterialIcons>
                            <Text style={styles.buttonTextFavorite}>Adicionar aos favoritos</Text>                            
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={alertExchange} style={styles.buttonContainer}> 
                        <View style={styles.buttonExchange}>
                            <MaterialIcons name="compare-arrows" size={20} color="#FFF952" style={styles.icon}/>
                            <Text style={styles.buttonTextExchange}>Quero trocar</Text>
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
        justifyContent: 'center' 
    },
    containerButton: {
        flex: 1, 
    },
    ratingBox : {
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
    },
    buttonFavorite: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF952',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    buttonExchange: {
        width: '100%',
        height: 50,
        backgroundColor: '#193C58',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
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
    buttonContainer: {
        padding: 3
    },
    icon: {
        padding: 5,
    },
})