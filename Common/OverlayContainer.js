import React, { FC, PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
export const OverlayContainer = (props) => {
    return (
        <View style={styles.container}>
            {props.children.map((child, index) => (
                <View style={styles.child} key={index}>
                    {child}
                </View>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    child: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    }
})