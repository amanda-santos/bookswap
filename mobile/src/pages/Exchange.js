import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'
//import { connect, disconnect, subscribeToNewbooks } from '../services/socket'

function Exchange({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null)
    const [books, setBooks] = useState([])
    const [bookSearched, setBookSearched] = useState('')

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const response = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition()
    }, [])

    useEffect(() => {
        //subscribeToNewbooks(book => setBooks([...books, book]))
    }, [books])

    function setupWebsocket() {
        disconnect()

        const { latitude, longitude } = currentRegion

        connect(
            latitude,
            longitude,
            bookSearched,
        )
    }

    async function loadBooks() {
        navigation.navigate('Profile', {});
        const { latitude, longitude } = currentRegion

        try {
            const response = await api.get('/search', {
                params: {
                    latitude,
                    longitude,
                    bookSearched
                }
            })

            setBooks(response.data.books)
        } catch (err) {
            console.error(err);
        }

        setupWebsocket()
    }

    function handleRegionChange(region) {
        setCurrentRegion(region)
    }

    if (!currentRegion) return null

    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChange}
                initialRegion={currentRegion}
                style={styles.map}
                onPoiClick={() => console.log('OIIIII')}
            >
                {books.map(book => (
                    <Marker
                        key={book._id}
                        coordinate={{
                            latitude: book.location.coordinates[1],
                            longitude: book.location.coordinates[0]
                        }}
                    >
                        <Image
                            style={styles.avatar}
                            source={{ uri: book.avatar_url }}
                        />

                        <Callout onPress={() => {
                            navigation.navigate('Exchange', { github_username: book.github_username })
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.bookName}>{book.name}</Text>
                                <Text style={styles.bookBio}>{book.bio}</Text>
                                <Text style={styles.bookbookSearched}>{book.bookSearched.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar livros..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={bookSearched}
                    onChangeText={setBookSearched}
                />

                <TouchableOpacity onPress={loadBooks} style={styles.loadButton}>
                    <MaterialIcons name="search" size={20} color="#FFF952" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Exchange

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260
    },
    bookName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    bookBio: {
        color: '#666',
        marginTop: 5
    },
    bookbookSearched: {
        marginTop: 5
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