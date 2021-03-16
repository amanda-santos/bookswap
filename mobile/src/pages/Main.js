import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function Main () {
    return (
        <View style={styles.container}>
            <Text>Main!</Text>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
})