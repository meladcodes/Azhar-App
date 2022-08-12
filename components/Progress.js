import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constants/COLORS'

const Progress = ({currentProgress, totalProgress, height}) => {
  return (
    <View style={{flexDirection: "row"}}>
    <View style={{width: `85%` ,height, backgroundColor: COLORS.bg, borderRadius: height, overflow: "hidden", marginTop: 5,}}>
      <View style={{height, width: `${currentProgress/totalProgress * 100}%`, borderRadius: height, position: "absolute", backgroundColor: COLORS.primary, left: 0, top: 0}}/>
    </View>
      <Text style={{marginLeft: 4, alignSelf: "center", marginTop: 3}}>{currentProgress}/{totalProgress}</Text>  
    </View>
  )
}

export default Progress

const styles = StyleSheet.create({})