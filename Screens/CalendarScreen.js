import React, {useContext} from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Colors, { color } from "../Common/Colors";
import fonts from "../Common/fonts";
import { LoaderContext } from "../utils/context";


const ImagesPath = require("../images/ImagesPath");

export const CalendarScreen = () => {
    const { showLoader, hideLoader } = useContext(LoaderContext);


    let DummyHolidayList = [{ holidayImg: ImagesPath.meetingImg, title: "Diwali", date: "20 May 2020 - 25 May 2020", description: "Lorem lpsum is simply dummy text." },
    { holidayImg: ImagesPath.meetingImg, title: "Diwali", date: "20 May 2020 - 25 May 2020", description: "Lorem lpsum is simply dummy text." },
    { holidayImg: ImagesPath.meetingImg, title: "Diwali", date: "20 May 2020 - 25 May 2020", description: "Lorem lpsum is simply dummy text." },
    { holidayImg: ImagesPath.meetingImg, title: "Diwali", date: "20 May 2020 - 25 May 2020", description: "Lorem lpsum is simply dummy text." },
    { holidayImg: ImagesPath.meetingImg, title: "Diwali", date: "20 May 2020 - 25 May 2020", description: "Lorem lpsum is simply dummy text." }];
    return (
        <FlatList

            showsHorizontalScrollIndicator={false}
            data={DummyHolidayList}
            renderItem={({ item }) =>
                <View style={{ justifyContent: 'center', margin: 10 }}>
                    <View style={homeStyle.calendarContainer}>
                        <Image style={homeStyle.calendarCardImg} source={item.holidayImg} />
                        <View style={{ flex: 1, flexDirection: 'column', marginTop: 8 }}>
                            <Text style={homeStyle.calendarCardText}>{item.title}</Text>
                            <Text style={homeStyle.calendarCardSubText}>Date: {item.date}</Text>
                            <Text style={[homeStyle.calendarCardSubText, {color: color.darkGray, fontFamily: fonts.medium}]}>{item.description}</Text>
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
        height: 65,
        width: 65,
        alignSelf: 'center',
        resizeMode: "contain"
    },
    calendarCardText: {
        width: "100%",
        height: 25,
        fontSize: 16,
        textAlign: 'center',
        color:color.titleBlack,
        alignSelf: 'center',
        fontFamily: fonts.semiBold,
        marginTop: 4

    },
    calendarCardSubText: {
        width: "100%",
        height: 25,
        fontSize: 14,
        color:color.titleBlack,
        alignSelf: 'center',
        fontFamily: fonts.semiBold,
        marginTop: 4,
        marginLeft: 16,
    },
});

