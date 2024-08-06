import { View, Text, ImageProps, FlatList, ImageSourcePropType } from 'react-native';
import React from 'react';
import CarouselItem, { ListItemWidth } from './CarouselItem';
import { useSharedValue } from 'react-native-reanimated';

interface CircularCarouselProps {
  data: ImageSourcePropType[];
}

const CircularCarousel = ({ data }: CircularCarouselProps) => {
  const contentOffset = useSharedValue(0);
  return (
    <FlatList
      horizontal
      // pagingEnabled
      // snapToInterval={ListItemWidth}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={(event) => {
        contentOffset.value = event.nativeEvent.contentOffset.x;
      }}
      style={{
        position: 'absolute',
        bottom: 0,
        height: 300,
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1.5 * ListItemWidth,
      }}
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        return <CarouselItem imageSrc={item} index={index} contentOffset={contentOffset} />;
      }}
    />
  );
};

export default CircularCarousel;
