import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreen from '../screens/Search'
import PlayListScreen from '../screens/PlayList'
import PlayerScreen from '../screens/Player'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const tabBarHeight = useBottomTabBarHeight();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, opPress }) => {
    return (
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: 'center',
                alignContent: 'center',
                ...styles.shadow
            }}
            opPress={opPress}>

            <View style={{
                width: 70,
                height: 70,
                borderRadius: 45,
                backgroundColor: '#fff'
            }}>
                {children}
            </View>
        </TouchableOpacity >
    )
}
export default function () {
    return (
        <Tab.Navigator
            screenOptions={
                //     //     ({ route }) => ({
                //     //     tabBarIcon: ({ focused, color, size }) => {
                //     //         let iconName;

                //     //         if (route.name === 'SearchScreen') {
                //     //             iconName = focused
                //     //                 ? 'ios-information-circle'
                //     //                 : 'ios-information-circle-outline';
                //     //         } else if (route.name === 'PlayListScreen') {
                //     //             iconName = focused ? 'ios-list-box' : 'ios-list';
                //     //         }

                //     //         // You can return any component that you like here!
                //     //         return <Ionicons name={iconName} size={size} color={color} />;
                //     //     },
                //     //     tabBarActiveTintColor: 'tomato',
                //     //     tabBarInactiveTintColor: 'gray',

                //     // }),
                {
                    tabBarStyle: {
                        elevation: 0,
                        backgroundColor: '#ffffff',
                        height: 50,
                        ...styles.shadow
                        // marginBottom: tabBarHeight
                    },
                    tabBarShowLabel: false
                }}>
            <Tab.Screen name="SearchScreen" component={SearchScreen}
                options={{
                    // tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color, size }) => (
                        // <MaterialCommunityIcons name="account" color={color} size={size} />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../asset/temp/wode.gif')}
                                resizeMode='contain'
                                style={{
                                    width: 31,
                                    height: 31,
                                }}
                            />
                            <Text style={{ color: focused ? '#6900A6' : '#979799', fontSize: 11 }}>
                                我的
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen name="PlayListScreen" component={PlayListScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../asset/temp/1.png')}
                            resizeMode='contain'
                            style={{
                                width: 65,
                                height: 65,
                            }} />
                    ),
                    tabBarButton: (props) => (<CustomTabBarButton {...props} />)
                }} />
            <Tab.Screen name="PlayerScreen" component={PlayListScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})
