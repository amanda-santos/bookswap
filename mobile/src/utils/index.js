import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export function starsRating(props) {
    let quantities = []
    for (let star = 0; star < props; star++) {
        quantities.push(<MaterialIcons key={star} name="star" size={30} color="#E8E34A" />)
    }

    if (props < 5) {
        for (let star = 0; star < 5 - props; star++) {
            quantities.push(<MaterialIcons key={`missing-${star}`} name="star" size={30} color="#D4D9D5" />)
        }
    }

    if (quantities.length > 5) {
        while (quantities.length != 5) {
            quantities.pop();
        }
    }

    return quantities;
}