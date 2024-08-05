import { View, ViewToken } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface FlatlistProps {
  viewableItems: SharedValue<ViewToken[]>;
  item: { id: number };
}

const FlatListItem = ({ item, viewableItems }: FlatlistProps) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {scale: withTiming(isVisible ? 1 : 0.6)}
      ]
    };
  });
  return (
    <Animated.View
      style={[
        {
          height: 80,
          width: '90%',
          backgroundColor: '#7ACAD2',
          marginTop: 20,
          borderRadius: 15,
          alignSelf: 'center',
        },
        rStyle,
      ]}
    />
  );
};

export default FlatListItem;
