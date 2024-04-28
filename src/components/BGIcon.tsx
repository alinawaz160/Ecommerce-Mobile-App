import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SPACING } from '../theme/theme'
import CustomIcon from './CustomIcon'

interface BGIconProps {
    name : string,
    size : number,
    color : string,
    BGColor : string
}
const BGIcon: React.FC<BGIconProps> = ({name , size , color , BGColor}) => {
  return (
    <View style = {[styles.IconBG , {backgroundColor : BGColor}]}>
      <CustomIcon name={name} size={size} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
    IconBG : {
        width : SPACING.space_30,
        height : SPACING.space_30,
        borderRadius : BORDERRADIUS.radius_8,
        justifyContent : "center",
        alignItems : 'center'
    }
})
export default BGIcon
