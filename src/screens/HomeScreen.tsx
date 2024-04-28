import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { StatusBar } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
const getCategoriesFromData = (data: any) => {
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1;
        }
        else {
            temp[data[i].name]++;
        }
    }
    let categoies = Object.keys(temp);
    categoies.unshift("All");
    return categoies;
}

const getCoffeeList = (category: string, data: any) => {
    if (category == "All") {
        return data;
    }
    else {
        let coffeeList = data.filter((item: any) => item.name == category);
        return coffeeList;
    }
}
const HomeScreen = ({ navigation }: any) => {
    const CoffeeList = useStore((state: any) => state.CoffeeList);
    const BeanList = useStore((state: any) => state.BeanList);
    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

    const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
    const [searchText, setSearchText] = useState('');
    const [categoryIndex, setCategoryIndex] = useState({
        index: 1,
        category: categories[1]
    });
    const [sortedCoffee, setSortedCoffee] = useState(
        getCoffeeList(categoryIndex.category, CoffeeList)
    );
    const ListRef: any = useRef<FlatList>();
    const tabBarHeight = useBottomTabBarHeight();

    const searchCoffee = (search: string) => {
        if (search != '') {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0
            })
            setCategoryIndex({ index: 0, category: categories[0] });
            setSortedCoffee([
                ...CoffeeList.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()))
            ])
        }
    }
    const resetSearchCoffee = () => {
        ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0
        })
        setCategoryIndex({ index: 0, category: categories[0] });
        setSortedCoffee([
            ...CoffeeList
        ])
        setSearchText('');
    }

    const CofeeCardaddToCart = ({
        id,
        index,
        name,
        roasted,
        imagelink_square,
        special_ingredient,
        type,
        prices
      } : any) => {
        addToCart({
          id,
          index,
          name,
          roasted,
          imagelink_square,
          special_ingredient,
          type,
          prices
        });
        calculateCartPrice();
        ToastAndroid.showWithGravity(`${name} is Added to Cart`,ToastAndroid.SHORT,ToastAndroid.CENTER)
      }
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex}></StatusBar>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                {/*App Header*/}
                <HeaderBar />
                {/*Screen Title*/}
                <Text style={styles.ScreenTitle}>Find the best {'\n'}coffee for you</Text>
                {/*Search Input*/}
                <View style={styles.InputContainerComponent}>
                    <TouchableOpacity onPress={() => {
                        searchCoffee(searchText);
                    }}>
                        <CustomIcon style={styles.InputIcon} name='search' size={FONTSIZE.size_18} color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Find Your Coffee...'
                        value={searchText}
                        onChangeText={text => {
                            setSearchText(text);
                            searchCoffee(text);
                        }}
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        style={styles.TextInputContainer}
                    />
                    {searchText.length > 0 ? (
                        <TouchableOpacity onPress={() => {
                            resetSearchCoffee();
                        }}>
                            <CustomIcon
                                style={styles.InputIcon}
                                name='close'
                                size={FONTSIZE.size_16}
                                color={COLORS.primaryLightGreyHex} />
                        </TouchableOpacity>) : (<></>)}
                </View>
                {/*Category Scroller*/}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.CategoryScrollViewStyle}
                >
                    {categories.map((data, index) => (
                        <View
                            key={index.toString()}
                            style={styles.CategoryScrollViewContainer}
                        >
                            <TouchableOpacity
                                style={styles.CategoryScrollViewItem}
                                onPress={() => {
                                    ListRef?.current?.scrollToOffset({
                                        animated: true,
                                        offset: 0
                                    })
                                    setCategoryIndex({ index: index, category: categories[index] });
                                    setSortedCoffee([
                                        ...getCoffeeList(categories[index], CoffeeList)])
                                }}
                            >
                                <Text
                                    style={[styles.CategoryText,
                                    categoryIndex.index == index ? { color: COLORS.primaryOrangeHex } : {}]}

                                >{data}</Text>
                                {categoryIndex.index == index ? (
                                    <View
                                        style={styles.ActiveCategory}
                                    />)
                                    : (<></>)
                                }
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                {/* Coffee Flatlist */}
                <FlatList
                    ref={ListRef}
                    ListEmptyComponent={
                        <View style={styles.ListEmptyContainer}>
                            <Text style={styles.CategoryText}>No Coffee Available </Text>
                        </View>
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={sortedCoffee}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.FlatListContainer}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            navigation.push('Details', { index: item.index, id: item.id, type: item.type });
                        }}>
                            <CoffeeCard
                                id={item.id}
                                index={item.index}
                                type={item.type}
                                roasted={item.roasted}
                                imagelink_square={item.imagelink_square}
                                name={item.name}
                                special_ingredient={item.special_ingredient}
                                average_rating={item.average_rating}
                                price={item.prices[2]}
                                buttonPressHandler={CofeeCardaddToCart}
                            />
                        </TouchableOpacity>
                    )}
                >

                </FlatList>
                <Text style={styles.CoffeeBeanTitle}>Coffee Beans</Text>
                {/* Bean Flatlist */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={BeanList}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={[styles.FlatListContainer, { marginBottom: tabBarHeight }]}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            navigation.push('Details', { index: item.index, id: item.id, type: item.type });
                        }}>
                            <CoffeeCard
                                id={item.id}
                                index={item.index}
                                type={item.type}
                                roasted={item.roasted}
                                imagelink_square={item.imagelink_square}
                                name={item.name}
                                special_ingredient={item.special_ingredient}
                                average_rating={item.average_rating}
                                price={item.prices[2]}
                                buttonPressHandler={CofeeCardaddToCart}
                            />
                        </TouchableOpacity>
                    )}
                >
                </FlatList>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex
    },
    ScrollViewFlex: {
        flexGrow: 1
    },
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        padding: SPACING.space_30
    },
    TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex
    },
    InputIcon: {
        marginHorizontal: SPACING.space_20,

    },
    InputContainerComponent: {
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        flexDirection: 'row'
    },
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20
    },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    CategoryScrollViewItem: {
        alignItems: 'center'
    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex
    },
    FlatListContainer: {
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30
    },
    CoffeeBeanTitle: {
        fontSize: FONTSIZE.size_30,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        color: COLORS.primaryLightGreyHex,
        fontFamily: FONTFAMILY.poppins_medium
    },
    ListEmptyContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.space_36 * 3.6
    }
})

export default HomeScreen