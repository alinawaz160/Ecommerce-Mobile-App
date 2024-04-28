import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcon from './CustomIcon'

interface CartItemProps {
    id: string,
    name: string,
    roasted: string,
    special_ingredient: string,
    imagelink_square: ImageProps,
    type: string,
    prices: any,
    incrementCartItemQuantityHandler: any,
    decrementCartItemQuantityHandler: any
}
const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    roasted,
    special_ingredient,
    imagelink_square,
    type,
    prices,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler
}) => {
    console.log(prices.length);
    return (
        <View>
            {prices.length != 1 ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.CartItemLinearGradient}
                >
                    <View style={styles.CartItemRow}>
                        <Image source={imagelink_square} style={styles.CartItemImage} />
                        <View style={styles.CartItemInfo}>
                            <View>
                                <Text style={styles.CartItemTitle}>{name}</Text>
                                <Text style={styles.CartItemSubTitle}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.CartItemRoastedContainer}>
                                <Text style={styles.CartItemRoastedText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                    {prices.map((data: any, index: any) => (
                        <View key={index.toString()} style={styles.CartItemSizeRowContainer}>
                            <View style={styles.CartItemSizeValueContainer}>
                                <View style={styles.SizeBox}>
                                    <Text style={[styles.SizeText, { fontSize: type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16 }]}>{data.size}</Text>
                                </View>
                                <Text style={styles.SizeCurrency}>{data.currency}<Text style={styles.SizePrice}>{data.price}</Text></Text>
                            </View>
                            <View style={styles.CartItemSizeValueContainer}>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() => { decrementCartItemQuantityHandler(id, data.size); }}>
                                    <CustomIcon name='minus' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                </TouchableOpacity>
                                <View style={styles.CartItemQuantityContainer}>
                                    <Text style={styles.CartItemQuantityText}>{data.quantity}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() => { incrementCartItemQuantityHandler(id, data.size) }}
                                >
                                    <CustomIcon name='add' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </LinearGradient>) : (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.CartItemSingleLinearGradient}>
                    <View style={styles.CartItemRow}>
                        <Image source={imagelink_square} style={styles.CartItemSingleImage} />
                    </View>
                    <View style={styles.CartItemSingleInfoContainer}>
                        <View>
                            <Text style={styles.CartItemTitle}>{name}</Text>
                            <Text style={styles.CartItemSubTitle}>{special_ingredient}</Text>
                        </View>
                        <View style={styles.CartItemSingleSizeValueContainer}>
                            <View style={styles.SizeBox}>
                                <Text style={[styles.SizeText, { fontSize: type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16 }]}>{prices[0].size}</Text>
                            </View>
                            <Text style={styles.SizeCurrency}>
                                {prices[0].currency}<Text style={styles.SizePrice}>{prices[0].price} </Text>
                            </Text>
                        </View>
                        <View style={styles.CartItemSingleQuantityContainer}>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => { decrementCartItemQuantityHandler(id, prices[0].size); }}>
                                <CustomIcon name='minus' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                            </TouchableOpacity>
                            <View style={styles.CartItemQuantityContainer}>
                                <Text style={styles.CartItemQuantityText}>{prices[0].quantity}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => { incrementCartItemQuantityHandler(id, prices[0].size) }}
                            >
                                <CustomIcon name='add' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25
    },
    CartItemRow: {
        flex: 1,
        flexDirection: 'row',
        gap: SPACING.space_12
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_25
    },
    CartItemInfo: {
        paddingVertical: SPACING.space_4,
        flex: 1,
        justifyContent: 'space-between'
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    },
    CartItemSubTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    SizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryLightGreyHex
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex
    },
    SizePrice: {
        color: COLORS.primaryWhiteHex
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex
    },
    CartItemSingleLinearGradient: {
        alignItems: 'center',
        flexDirection: "row",
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25
    },
    CartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20
    },
    CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around'
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    CartItemSingleQuantityContainer : {
        justifyContent : 'space-evenly',
        alignItems : 'center',
        flexDirection : 'row'
    }
})
export default CartItem
