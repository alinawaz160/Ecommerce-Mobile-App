import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcon from './CustomIcon'

interface PaymentMethodProps {
    paymentMode: string
    icon: any
    name: string
    isIcon: boolean
}
const PaymentMethod: React.FC<PaymentMethodProps> = ({
    paymentMode,
    icon,
    name,
    isIcon
}) => {
    return (
        <View style={[styles.PaymentCardContainer, {borderColor : paymentMode == name ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}]}>
            {isIcon ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }} 
                    style={styles.LinearGradientWallet}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                >
                    <View style={styles.WalletRow}>
                        <CustomIcon name='wallet' size={FONTSIZE.size_30} color={COLORS.primaryOrangeHex} />
                        <Text style={styles.PaymentTitle}>{name}</Text>
                    </View>
                    <Text style={styles.PaymentPrice}>$ 100.50</Text>
                </LinearGradient>) :
                (
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }} style={styles.LinearGradientRegular}
                        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    >
                        <Image source={icon} style={styles.PaymentImage} />
                        <Text style={styles.PaymentTitle}>{name}</Text>
                    </LinearGradient>
                )
            }
        </View>
    )
}

export default PaymentMethod

const styles = StyleSheet.create({
    PaymentCardContainer: {
        borderRadius : BORDERRADIUS.radius_15 *2,
        backgroundColor : COLORS.primaryGreyHex,
        borderWidth : 2
    },
    LinearGradientWallet: {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent  : "space-between",
        padding : SPACING.space_12,
        paddingHorizontal : SPACING.space_24,
        gap : SPACING.space_24,
        borderRadius : BORDERRADIUS.radius_15 * 2
    },
    WalletRow: {
        alignItems : 'center',
        flexDirection : 'row',
        gap : SPACING.space_24
    },
    PaymentTitle: {
        fontFamily : FONTFAMILY.poppins_semibold,
        fontSize : FONTSIZE.size_16,
        color : COLORS.primaryWhiteHex
    },
    PaymentPrice: {
        fontFamily : FONTFAMILY.poppins_regular,
        fontSize : FONTSIZE.size_16,
        color : COLORS.secondaryLightGreyHex
    },
    LinearGradientRegular : {
        flexDirection : 'row',
        alignItems : 'center',
        padding : SPACING.space_12,
        paddingHorizontal : SPACING.space_24,
        gap : SPACING.space_24,
        borderRadius : BORDERRADIUS.radius_15 * 2
    },
    PaymentImage : {
        height : SPACING.space_30,
        width : SPACING.space_30
    }
})