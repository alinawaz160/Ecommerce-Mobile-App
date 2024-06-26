import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import CustomIcon from '../components/CustomIcon';


const Tab = createBottomTabNavigator();
const TabNavigators = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarHideOnKeyboard : true,
            tabBarShowLabel : false,
            tabBarStyle : styles.tabBarStyles,
            tabBarBackground: ()=> (
                <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles}/>
            )
            }}>
            <Tab.Screen
                options={{
                    tabBarIcon : ({focused,color,size})=>(
                        <CustomIcon name='home' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                    )
                }}
                name='Home'
                component={HomeScreen}>
            </Tab.Screen>
            <Tab.Screen
            options={{
                tabBarIcon : ({focused,color,size})=>(
                    <CustomIcon name='cart' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }}
                name='Cart'
                component={CartScreen}>
            </Tab.Screen>
            <Tab.Screen
            options={{
                tabBarIcon : ({focused,color,size})=>(
                    <CustomIcon name='like' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }}
                name='Favorite'
                component={FavoriteScreen}>
            </Tab.Screen>
            <Tab.Screen
            options={{
                tabBarIcon : ({focused,color,size})=>(
                    <CustomIcon name='bell' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }}
                name='History'
                component={OrderHistoryScreen}>
            </Tab.Screen>
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    tabBarStyles : {
        height : 80,
        position : 'absolute',
        backgroundColor : COLORS.primaryBlackRGBA,
        elevation : 0,
        borderTopWidth : 0,
        borderTopColor : 'transparent'
    },
    BlurViewStyles : {
        position : 'absolute',
        top : 0,
        bottom : 0,
        right : 0,
        left : 0

    }
})
export default TabNavigators