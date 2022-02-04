import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

import MainButton from "../components/MainButton";
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from "../components/BodyText";
import DefaultStyles from '../constants/default-styles'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRound) =>
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>


const GameScreen = props => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    //const [rounds, setRounds] = useState(0)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const {userChoice, onGameOver} = props

    useEffect(() => {
        if (currentGuess === userChoice) {
            //onGameOver(rounds)
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])


    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie !', 'You know that this is wrong...', [{text: 'Sorry !', style: 'cancel'}])
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)

        //setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, index )=> renderListItem(guess, pastGuesses.length -index ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    list: {
        flex: 1, // for scrolling on android ( ScrollView will be not functional otherwise). Only if <Scrollview> nested into <View>
        width: "80%"
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default GameScreen;
