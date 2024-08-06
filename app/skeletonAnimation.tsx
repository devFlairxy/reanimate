import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SkeletonAnimation = () => {
  return (
    <View>
      <Text>SkeletonAnimation</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SkeletonAnimation