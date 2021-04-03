import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { RectButton } from "react-native-gesture-handler";

import imgProfile from "../../assets/profile.png";
import whatsappIcon from "../../assets/icons/whatsapp.png";
import { starsRating } from '../utils';

function Profile({ route }) {
    const user = route.params?.user || {
        id: 2,
        name: 'Jéssica Martins',
        bio: '21 anos, estudante de Administração. Apaixonada por livros.',
        profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        phone: '5531986250620',
        swaps: 12,
        reputation: 4,
    };

    function handleLinkToWhatsapp() {
        Linking.openURL(
            `whatsapp://send?text=Olá! Tudo bem? Tenho interesse em trocar livros com você! 😄📚&phone=${user.phone}`
        );
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: user.profilePicture}} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <Text style={styles.swaps}>Já fez trocas com {user.swaps} pessoas</Text>
            <Text style={styles.reputation}>Reputação</Text>
            <View style={styles.reputationBox}>
                {starsRating(user.reputation)}
            </View>

            <RectButton
                onPress={handleLinkToWhatsapp}
                style={styles.contactButton}
            >
                <Image source={whatsappIcon} />
                <Text style={styles.contactButtonText}>Entrar em contato</Text>
            </RectButton>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 200,
        marginBottom: 10
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    bio: {
        fontSize: 16,
        textAlign: 'center'
    },
    swaps: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#193C58',
        marginTop: 15
    },
    reputation: {
        fontSize: 14,
        color: '#666',
        marginTop: 10
    },
    reputationBox: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contactButton: {
        backgroundColor: "#04d361",
        height: 20,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        margin: 20
    },
    contactButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 16,
    },
})