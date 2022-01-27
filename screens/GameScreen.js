import React, {useState} from "react";
import {View, StyleSheet} from "react-native";


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    }
    else rndNum;
}

const GameScreen = props => {
    const [ currentGuess,setCurrentGuess] = useState(generateRandomBetween(1,100, props.userChoice))

    return (
        <View>
            <text>Game screen</text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default GameScreen;
