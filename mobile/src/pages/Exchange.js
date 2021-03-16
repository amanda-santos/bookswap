import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function Exchange () {
    return (
        <View style={styles.container}>
            <Text>Exchange!</Text>
        </View>
    )
}

export default Exchange

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
})