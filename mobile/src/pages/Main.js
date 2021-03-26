import React, { useState }  from 'react'
import { 
    ImageBackground, 
    FlatList, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    Dimensions 
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

const DATA = [
    {
        key: '1',
        title: 'Harry Potter e as relíquias da morte',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81PHloIwKnL.jpg',
        favorite: true,
        description: 'Harry Potter está prestes a fazer 17 anos, mas, ao contrário das outras vezes, não irá para Hogwarts após seu aniversário.'
    },
    {
        key: '2',
        title: 'O conto da aia',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51X40Du9otL._SX331_BO1,204,203,200_.jpg',
        favorite: false,
        description: 'O romance distópico O conto da aia, de Margaret Atwood, se passa num futuro muito próximo e tem como cenário uma república onde não existem mais jornais, revistas, livros nem filmes.'
    },
    {
        key: '3',
        title: 'As aventuras de Sherlock Holmes',
        imageUrl: 'https://m.media-amazon.com/images/I/41bfGi9SbAL.jpg',
        favorite: true,
        description: 'Essa luxuosa edição de bolso de As aventuras de Sherlock Holmes traz preço reduzido e 50 ilustrações originais de Sidney Paget. A versão impressa apresenta ainda capa dura e acabamento de luxo.'
    },
    {
        key: '4',
        title: 'O Hobbit',
        imageUrl: 'https://m.media-amazon.com/images/I/51S6-VeaHJL.jpg',
        favorite: false,
        description: 'Bilbo Bolseiro era um dos mais respeitáveis hobbits de todo o Condado até que, um dia, o mago Gandalf bate à sua porta.'
    },
    {
        key: '5',
        title: 'O poder do hábito',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51u+Gn2WU2L._SX346_BO1,204,203,200_.jpg',
        favorite: false,
        description: 'Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida. Parou de fumar, correu uma maratona e foi promovida.'
    },
    {
        key: '6',
        title: 'Anne de Avonlea',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51OfWlgTzSL._SX346_BO1,204,203,200_.jpg',
        favorite: false,
        description: 'Agora com 16 anos, sentindo-se quase adulta, Anne está prestes a começar a lecionar na escola de Avonlea, a realidade de seu trabalho torna-se um teste para seu caráter, surgindo várias dúvidas quanto ao seu futuro.'
    },
    {
        key: '7',
        title: 'Por que as pessoas não fazem o que deveriam fazer?',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41w-zOdrC5L._SX332_BO1,204,203,200_.jpg',
        favorite: true,
        description: 'Um dos assuntos mais debatidos dos últimos tempos diz respeito à qualidade de vida. Mas o que exatamente isso significa?'
    },
  ];

  const colums = 2

function isFavorite (props) {
    return props 
        ? <MaterialIcons name="favorite" size={20} style={styles.icon} /> 
        : <MaterialIcons name="favorite-border" size={20} style={styles.icon} />
}

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
        <ImageBackground source={{ uri: item.imageUrl}} style={styles.image} resizeMode= 'cover'>
            <View style={styles.containerList}>
                <View style={styles.containerListDescription}>
                    <Text style={styles.bookName}>{item.title}</Text>
                    {isFavorite(item.favorite)}
                </View>
            </View>
        </ImageBackground>
    </TouchableOpacity>
);

function Main () {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        if (item.empty === true) {
            return <View style={[styles.containerInvisible]} />;
        }
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.key)}
            />
        );
    };

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        
        return data;
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={formatData(DATA, colums)}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                extraData={selectedId}
                numColumns={colums}
            />
        </SafeAreaView>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bookName: {
        color: '#FFF',
        fontSize: 15,
        alignContent: 'center',
        padding: 2,
    }, 
    bookDescription: {
        color: '#666',
        marginTop: 5,
        alignContent: 'center',
        padding: 5,
        fontSize: 12,
    }, 
    imageUrl: {
        width: 100,
        height: 150,
        borderColor: '#FFF',
    },
    containerList: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        //backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: Dimensions.get('window').width / colums
    },
    containerListDescription: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        textAlign: "center",
        padding: 5,
        width: Dimensions.get('window').width / colums
    },
    icon: {
        alignSelf: 'flex-end',
        paddingEnd: 5,
        paddingBottom: 5,
        paddingTop: 5,
        color: '#FFF952'
    },
    containerInvisible: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        flex: 1,
        justifyContent: "center",
        margin: 2,
    },
    touchableOpacity: {
        backgroundColor: '#FFF', 
        flex: 1,
        justifyContent: "center"
    }
})