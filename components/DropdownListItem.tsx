import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import Color from 'color';
import React from 'react';
import { ItemType } from './Dropdown';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

type DropdownListItemProps = ItemType & {
  index: number;
  totalItems: number;
  isExpanded: SharedValue<boolean>;
};

const DropdownListItem = ({
  label,
  iconName,
  index,
  totalItems,
  isExpanded,
}: DropdownListItemProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const Height = 85;
  const Margin = 10;
  const fullHeight = totalItems * (Height + Margin);
  const collapsedTop = fullHeight / 2 - Height;
  const expandedTop = (Height + Margin) * index;

  const expandedScale = 1;
  const collapsedScale = 1 - index * 0.05;

  const expandedBackground = '#1B1B1B';
  const collapsedBackground = Color(expandedBackground)
    .lighten(index * 0.25)
    .hex();

  const rStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
      backgroundColor: withTiming(
        isExpanded.value ? expandedBackground : collapsedBackground
      ),
      transform: [
        //order of items in the transform property is important
        {
          scale: withSpring(isExpanded.value ? expandedScale : collapsedScale),
        },
        { translateY: fullHeight / 2 },
      ],
    };
  });
  const isHeader = index === 0;
  const rArrowIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isHeader && isExpanded.value ? '90deg' : '0deg') }],
    };
  });
  const rLeftIconOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isHeader ? 1 : isExpanded.value ? 1 : 0),
    };
  }, [isHeader]);
  return (
    <Animated.View
      onTouchEnd={() => {
        if (isHeader) isExpanded.value = !isExpanded.value; //only expand if when we click on the first item
      }}
      style={[
        {
          zIndex: totalItems - index,
          width: windowWidth * 0.95,
          height: Height,
          borderRadius: 10,
          position: 'absolute',
        },
        rStyle,
      ]}
    >
      <View style={styles.container}>
        <Animated.View
          style={[styles.iconContainer, { left: 15 }, rLeftIconOpacityStyle]}
        >
          <AntDesign name={iconName as any} size={25} color="#D4D4D4" />
        </Animated.View>
        <Text style={styles.label}> {label} </Text>
        <Animated.View
          style={[
            styles.iconContainer,
            rArrowIconStyle,
            { right: 15, backgroundColor: 'transparent' },
          ]}
        >
          <MaterialIcons
            name={isHeader ? 'arrow-forward-ios' : 'arrow-forward'}
            size={25}
            color={'#D4D4D4'}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#D4D4D4',
    fontSize: 22,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  iconContainer: {
    position: 'absolute',
    width: 45,
    aspectRatio: 1,
    backgroundColor: '#111',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DropdownListItem;
