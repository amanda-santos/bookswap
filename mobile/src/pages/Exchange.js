import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'

function Exchange({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null)
    const [users, setUsers] = useState([])
    const [bookSearched, setBookSearched] = useState('')

    const USERS = [
        {
            id: 2,
            name: 'Jéssica Martins',
            bio: '21 anos, estudante de Administração. Apaixonada por livros.',
            profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            phone: '5531986250620',
            swaps: 12,
            reputation: 4,
            latitude: -20.5087765, 
            longitude: -43.7117331,
            books: [
                {
                    "swap": true,
                    "favorite": false,
                    "id": "JI6JDAAAQBAJ",
                    "title": "Re-Reading Harry Potter",
                    "authors": "Suman Gupta",
                    "description": "This book discusses the political and social presumptions ingrained in the texts of the Harry Potter series and examines the manner in which they have been received in different contexts and media. The 2nd edition also contains extensive new material which comments on the later books and examines the impact of the phenomenon across the world.",
                    "categories": "Literary Criticism",
                    "average_rating": 3,
                    "ratings_count": 10,
                    "image": "http://books.google.com/books/content?id=JI6JDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                {
                    "swap": true,
                    "favorite": false,
                    "id": "hLHoDwAAQBAJ",
                    "title": "Anne of Green Gables",
                    "authors": "Suman Gupta",
                    "description": "e-artnow presents the Christmas Specials Series. We have selected the greatest Christmas novels, short stories and fairy tales for all those who want to keep the spirit of Christmas alive with a heartwarming tale. Anne Shirley, a young orphan from Nova Scotia is sent to live with Marilla and Matthew Cuthbert, siblings in their fifties and sixties, after a childhood spent in strangers' homes and orphanages. Marilla and Matthew had originally decided to adopt a boy to help Matthew run their farm at Green Gables. Through a misunderstanding, the orphanage sends Anne instead. Anne is highly imaginative, eager to please and quite dramatic at times. She is often quite talkative, especially when it comes to describing her fantasies and dreams. As a child of imagination, Anne takes much joy in life and adapts quickly, thriving in the close-knit farming village. Her imagination and talkativeness soon brighten up Green Gables.",
                    "categories": "Juvenile Fiction",
                    "average_rating": 1,
                    "ratings_count": 2,
                    "image": "http://books.google.com/books/content?id=hLHoDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                }
            ]
        }
    ]

    const loadInitialPosition = async () => {
        const { granted } = await requestPermissionsAsync()

        if (granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true,
            })

            const { latitude, longitude } = coords

            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            })
            
        }
    }

    async function loadUsers() {
        setUsers(USERS)

        //const { latitude, longitude } = currentRegion

        // try {
        //     const response = await api.get('/search', {
        //         params: {
        //             latitude,
        //             longitude,
        //             bookSearched
        //         }
        //     })

        //     setUsers(response.data.users)
        // } catch (err) {
        //     console.error(err);
        // }

    }

    function handleRegionChange(region) {
        setCurrentRegion(region)
    }

    useEffect(() => {
        loadInitialPosition()
    }, [])

    useEffect(() => {
        loadUsers()
    }, [])

    if (!currentRegion) return null

    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChange}
                initialRegion={currentRegion}
                style={styles.map}
            >
                {users.map(user => (
                    <Marker
                        key={user.id}
                        coordinate={{
                            latitude: user.latitude,
                            longitude: user.longitude
                        }}
                    >
                        <Image
                            style={styles.avatar}
                            source={{ uri: user.profilePicture }}
                        />

                        <Callout onPress={() => {
                            navigation.navigate('Profile', { user: user })
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.bookName}>{user.name}</Text>
                                <Text style={styles.bookBio}>Livros para troca</Text>
                                {user.books.map(book => ( 
                                    <Text key={book.id} style={styles.bookBio}>{book.title}</Text>
                                ))}
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

                <TouchableOpacity 
                    //onPress={loadBooks} 
                    style={styles.loadButton}
                >
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