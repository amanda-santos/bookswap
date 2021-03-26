import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

function Explore () {
    return (
    <View style={styles.searchForm}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar livros..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
            />

            <TouchableOpacity style={styles.loadButton}> 
                <MaterialIcons name="search" size={20} color="#FFF952" />
            </TouchableOpacity>
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