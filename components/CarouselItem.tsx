import {
  View,
  Text,
  Dimensions,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import { ImageProps } from 'expo-image';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type CarouselItemProps = {
  imageSrc: ImageSourcePropType;
  index: number;
  contentOffset: SharedValue<number>;
};

const { width: windowWidth } = Dimensions.get('window');
export const ListItemWidth = windowWidth / 4;

const CarouselItem = ({
  imageSrc,
  index,
  contentOffset,
}: CarouselItemProps) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * ListItemWidth,
      (index - 1) * ListItemWidth,
      index * ListItemWidth,
      (index + 1) * ListItemWidth,
      (index + 2) * ListItemWidth,
    ];
    const translateYOutputRage = [
      30,
      -ListItemWidth / 3,
      -ListItemWidth / 2,
      -ListItemWidth / 3,
      30,
    ];

    const translateY = interpolate(
      contentOffset.value,
      inputRange,
      translateYOutputRage,
      Extrapolation.CLAMP
    );
    const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];
    const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

    const opacity = interpolate(
      contentOffset.value,
      inputRange,
      opacityOutputRange,
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      contentOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [
        { translateY }, 
        { scale }

      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: ListItemWidth,
          aspectRatio: 1,
          elevation: 5,
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 20,
        },
        rStyle,
      ]}
    >
      <Image
        source={imageSrc}
        resizeMode="cover"
        style={{
          margin: 3,
          height: ListItemWidth,
          width: ListItemWidth,
          borderRadius: 200,
          borderWidth: 2,
          borderColor: 'white',
        }}
      />
    </Animated.View>
  );
};

export default CarouselItem;
