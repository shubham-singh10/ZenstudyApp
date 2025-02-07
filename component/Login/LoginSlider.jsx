import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet, Image } from 'react-native';

const { width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    description: 'Description for Item 1',
    image: require('../../assets/login1.png'),
  },
  {
    id: '2',
    description: 'Description for Item 2',
    image: require('../../assets/login2.png'),
  },
  {
    id: '3',
    description: 'Description for Item 3',
    image: require('../../assets/login3.png'),
  },
];

const LoginSlider = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    // Start the auto-scroll timer
    const scrollToNext = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length; // Cycle through indices
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    };

    scrollIntervalRef.current = setInterval(scrollToNext, 2000); // Change slide every 3 seconds

    return () => {
      clearInterval(scrollIntervalRef.current); // Clear interval on unmount
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToAlignment="center"
      decelerationRate="fast"
      contentContainerStyle={styles.container}
      onMomentumScrollEnd={(event) => {
        const index = Math.floor(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index); // Update the current index when the user scrolls manually
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    width: width - 70,
    height: 250,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
});

export default LoginSlider;
