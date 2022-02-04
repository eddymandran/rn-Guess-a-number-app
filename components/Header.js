import React from "react";
import {StyleSheet, View} from "react-native";
import Colors from "../constants/colors"
import TitleText from "./TitleText";


const Header = (props) => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.title} >{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: "white"
    }
});

export default Header;
