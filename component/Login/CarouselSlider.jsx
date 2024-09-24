import React, { useState, useRef } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CarouselSlider = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} /> {/* Corrected source usage */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        ref={carouselRef}
        data={data}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Text style={styles.indexIndicator}>{activeIndex + 1} / {data.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 250,
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  indexIndicator: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default CarouselSlider;
