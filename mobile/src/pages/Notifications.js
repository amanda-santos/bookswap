import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function Notifications () {
    return (
        <View style={styles.container}>
            <Text>Notifications!</Text>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
})