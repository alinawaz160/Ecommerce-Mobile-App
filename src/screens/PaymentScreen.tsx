import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import { useStore } from '../store/store';
import PopUpAnimation from '../components/PopUpAnimation';

const paymentList = [{
    name: 'Wallet',
    icon: 'icon',
    isIcon: true
},
{
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false
},
{
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false
},
{
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false
}
]
const PaymentScreen = ({ navigation, route }: any) => {
    const [paymentMode, setPaymentMode] = useState('Credit Card');
    const [showAnimation , setShowAnimation] = useState(false);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const addToOrderHistoryListFromCart = useStore((state: any) => state.addToOrderHistoryListFromCart);

    const buttonPressHandler = () => {
        setShowAnimation(true);
        addToOrderHistoryListFromCart();
        calculateCartPrice();
        setTimeout(()=>{
            setShowAnimation(false);
            navigation.navigate('History');
        },2000)
    }
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            {showAnimation ? <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')} /> : <></>}
            <ScrollView
                style={styles.ScrollViewFlex}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.HeaderContent}>
                    <TouchableOpacity onPress={() => { navigation.pop() }}>
                        <GradientBGIcon
                            name='left'
                            size={FONTSIZE.size_16}
                            color={COLORS.primaryLightGreyHex} />
                    </TouchableOpacity>
                    <Text style={styles.PaymentTitle}>Payments</Text>
                    <View style={styles.EmptyView}></View>
                </View>
                <View style={styles.PaymentOptionsContainer}>
                    <TouchableOpacity onPress={() => { setPaymentMode('Credit Card') }}>
                        <View style={[styles.CreditCardContainer, { borderColor: paymentMode == 'Credit Card' ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex }]}>
                            <Text style={styles.CreditCardTitle}>Credit Card</Text>
                            <View style={styles.CreditCardBG}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                                    style={styles.LinearGradientStyle}
                                >
                                    <View style={styles.CreditCardRow}>
                                        <CustomIcon name='chip' size={FONTSIZE.size_20 * 2} color={COLORS.primaryOrangeHex} />
                                        <CustomIcon name='visa' size={FONTSIZE.size_30 * 2} color={COLORS.primaryWhiteHex} />
                                    </View>
                                    <View style={styles.CreditCardNumberContainer}>
                                        <Text style={styles.CreditCardNumber}>2813</Text>
                                        <Text style={styles.CreditCardNumber}>3232</Text>
                                        <Text style={styles.CreditCardNumber}>9545</Text>
                                        <Text style={styles.CreditCardNumber}>6342</Text>
                                    </View>
                                    <View style={styles.CreditCardRow}>
                                        <View style={styles.CreditCardNameContainer}>
                                            <Text style={styles.CreditCardNameTitle}>Card Holder</Text>
                                            <Text style={styles.CreditCardNameSubTitle}>Robert Desosa</Text>
                                        </View>
                                        <View style={styles.CreditCardDateContainer}>
                                            <Text style={styles.CreditCardNameTitle}>Expiry Date</Text>
                                            <Text style={styles.CreditCardNameSubTitle}>02/30</Text>

                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {paymentList.map((data: any) => (
                        <TouchableOpacity
                            key={data.name}
                            onPress={() => {
                                setPaymentMode(data.name)
                            }}>
                            <PaymentMethod
                                paymentMode={paymentMode}
                                icon={data.icon}
                                name={data.name}
                                isIcon={data.isIcon} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <PaymentFooter
                buttonTitle={`Pay with ${paymentMode}`}
                buttonPressHandler={buttonPressHandler}
                price={{ price: route.params.amount, currency: "$" }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex
    },
    ScrollViewFlex: {
        flex: 1
    },
    HeaderContent: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    PaymentTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex
    },
    EmptyView: {
        height: SPACING.space_36,
        width: SPACING.space_36
    },
    PaymentOptionsContainer: {
        padding: SPACING.space_15,
        gap: SPACING.space_15
    },
    CreditCardContainer: {
        padding: SPACING.space_10,
        gap: SPACING.space_10,
        borderRadius: SPACING.space_15 * 2,
        borderWidth: 3
    },
    CreditCardTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginLeft: SPACING.space_10
    },
    CreditCardBG: {
        backgroundColor: COLORS.primaryGreyHex,
        borderRadius: BORDERRADIUS.radius_25
    },
    LinearGradientStyle: {
        borderRadius: BORDERRADIUS.radius_25,
        gap: SPACING.space_36,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_10
    },
    CreditCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    CreditCardNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_10
    },
    CreditCardNumber: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
        letterSpacing: SPACING.space_4 + SPACING.space_2
    },
    CreditCardNameContainer: {
        alignItems: 'flex-start'
    },
    CreditCardNameTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },
    CreditCardNameSubTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    CreditCardDateContainer: {
        alignItems: 'flex-end'
    },
    LottieAnimation : {
        flex : 1
    }
})

export default PaymentScreen

