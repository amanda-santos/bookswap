import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
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
import api from '../services/api'

const colums = 2

function isFavorite(props) {
    return props
        ? <MaterialIcons name="favorite" size={20} style={styles.icon} />
        : <MaterialIcons name="favorite-border" size={20} style={styles.icon} />
}

function Main({ navigation }) {
    const [data, setData] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const userId = 1

    const onPressed = (item) => {
        navigation.navigate('Book', { item, userId })
    }

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => onPressed(item)}>
            <ImageBackground source={{ uri: item.image }} style={styles.image} resizeMode='cover'>
                <View style={styles.containerList}>
                    <View style={styles.containerListDescription}>
                        <Text style={styles.bookName}>{item.title}</Text>
                        {isFavorite(item.favorite)}
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    useEffect(() => {
        api.get(`user/${userId}/books`).then(response => {
            setData(response.data)
        })
    }, [])

    const renderItem = ({ item }) => {
        if (item.empty === true) {
            return <View style={[styles.containerInvisible]} />;
        }
        return (
            <Item
                item={item}
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
                data={formatData(data, colums)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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