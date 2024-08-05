import { View, Text, StyleSheet, FlatList, ViewToken } from 'react-native';
import React from 'react';
import FlatListItem from '@/components/FlatlistItem';
import { useSharedValue } from 'react-native-reanimated';

const data = new Array(50).fill(0).map((_, index) => ({
  id: index,
}));

const AnimatedFlatlist = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingTop: 40 }}
        data={data}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        renderItem={({ item }) => {
          return <FlatListItem item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatedFlatlist;
