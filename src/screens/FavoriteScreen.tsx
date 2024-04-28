import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useStore } from '../store/store';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import { COLORS, SPACING } from '../theme/theme';
import FavoritesItemCard from '../components/FavoritesItemCard';
const FavoriteScreen = ({navigation} : any) => {

  const favoriteList = useStore((state: any) => state.FavoritesList);
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const tabBarHeight = useBottomTabBarHeight();

  const ToggleFavorite = (favorite: boolean, type: string, id: string) => {
    favorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  }
  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Favorites' />
            {favoriteList.length == 0 ?
              <EmptyListAnimation title={'No Favorites'} /> :
              <View style={styles.ListItemContainer}>
                {favoriteList.map((data: any) => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() => {
                      navigation.push('Details', { index: data.index, id: data.id, type: data.type });
                    }}>
                      <FavoritesItemCard
                        id = {data.id}
                        imagelink_portrait = {data.imagelink_portrait}
                        name = {data.name}
                        special_ingredient = {data.special_ingredient}
                        type = {data.type}
                        ingredients = {data.ingredients}
                        average_rating = {data.average_rating}
                        ratings_count = {data.ratings_count}
                        roasted = {data.roasted}
                        description = {data.description}
                        favourite = {data.favourite}
                        ToggleFavoriteItem = {ToggleFavorite}

                      />
                  </TouchableOpacity>
                ))}
              </View>
            }
          </View>
        </View>
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
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between'
  },
  ItemContainer: {
    flex: 1
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
})
export default FavoriteScreen
