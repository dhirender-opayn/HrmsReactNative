import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Colors, { color } from "../Common/Colors";


const ImagesPath = require("../images/ImagesPath");

export const CalendarScreen = () => {

    let DummyHolidayList = [{ holidayImg: ImagesPath.holidayDefaultImg, title: "Diwali", date: "20 May 2020 - 25 May 2020" },
    { holidayImg: ImagesPath.holidayDefaultImg, title: "Diwali", date: "20 May 2020 - 25 May 2020" },
    { holidayImg: ImagesPath.holidayDefaultImg, title: "Diwali", date: "20 May 2020 - 25 May 2020" },
    { holidayImg: ImagesPath.holidayDefaultImg, title: "Diwali", date: "20 May 2020 - 25 May 2020" },
    { holidayImg: ImagesPath.holidayDefaultImg, title: "Diwali", date: "20 May 2020 - 25 May 2020" }];
    return (
        <FlatList

            showsHorizontalScrollIndicator={false}
            data={DummyHolidayList}
            renderItem={({ item }) =>
                <View style={{ justifyContent: 'center', margin: 10 }}>
                    <View style={homeStyle.calendarContainer}>
                        <Image style={homeStyle.calendarCardImg} source={item.holidayImg} />
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={homeStyle.calendarCardText}> {item.title}</Text>
                            <Text style={homeStyle.calendarCardText}> {item.date}</Text>
                        </View>

                    </View>
                </View>
            }
        />
    );
}

const homeStyle = StyleSheet.create({
    calendarContainer: {
        backgroundColor: color.white,
        borderRadius: 12,
        alignContent: 'center',
        paddingVertical: 15,
        flexDirection: 'row',
        paddingHorizontal: 23,
        shadowColor: Colors.color.darkGray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
    },
    calendarCardImg: {
        height: 45,
        width: 45,
        alignSelf: 'center',

    },
    calendarCardText: {
        width: "100%",
        height: 25,
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        alignSelf: 'center',
        fontWeight: '600',


    },
});

