import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

export const Login = (props) => (
    <SafeAreaView style={styles.containerE}>
        <Button onPress={props.login} title="Login" />
    </SafeAreaView>
);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#191720",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  