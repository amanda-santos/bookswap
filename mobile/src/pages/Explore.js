import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function Explore () {
    return (
        <View style={styles.container}>
            <Text>Explore!</Text>
        </View>
    )
}

export default Explore

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
})