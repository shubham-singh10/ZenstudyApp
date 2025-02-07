import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CourseCard = () => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://zenstudy.in/assets/course-image.jpg' }} // Replace with your image URL
        style={styles.image}
      />
      <Text style={styles.title}>Title of the Course here</Text>
      <Text style={styles.language}>Hindi</Text>
      <Text style={styles.description}>
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
      </Text>
      <View style={styles.languageTag}>
          <Text style={styles.languageText}>Hindi</Text>
        </View>
      <Text style={styles.date}>02/05/2024</Text>
      <Text style={styles.price}>$999</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.buttonText}>Explore Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    margin: 10,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#007bff',
  },
  language: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
  },
  languageTag: {
    backgroundColor: '#e0e7ff',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  languageText: {
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exploreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buyButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CourseCard;
