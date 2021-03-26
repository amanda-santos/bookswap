import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function Book () {
    return (
        <>
        <View style={styles.container}>
            <Text>Book!</Text>
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
    }
})