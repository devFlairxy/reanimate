import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

interface Item {
  id: number;
}

const LIST_ITEM_COLOR = '#1798DE';

const LayoutAnimation = () => {
  const initialMode = useRef(true);

  const [items, setItems] = useState<Item[]>(
    new Array(5).fill(0).map((_, index) => ({ id: index }))
  );

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const onAdd = useCallback(() => {
    setItems((prevItems) => {
      const nextItemId = (prevItems[prevItems.length - 1]?.id ?? 0) + 1;
      return [...prevItems, { id: nextItemId }];
    });
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingBottom} onPress={onAdd}>
        <Text style={{ color: '#FFF', fontSize: 40 }}>+</Text>
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingVertical: 50,
        }}
      >
        {items.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={initialMode ? FadeIn.delay(100 * index) : FadeIn}
            exiting={FadeOut}
            layout={LinearTransition.delay(50)}
            style={styles.listItem}
            onTouchEnd={() => onDelete(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  floatingBottom: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: '#000',
    borderRadius: 40,
    position: 'absolute',
    bottom: 50,
    right: '5%',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LayoutAnimation;
