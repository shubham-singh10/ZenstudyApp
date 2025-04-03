import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const StudyMaterialScreenNew = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Notes', 'Books', 'Handouts', 'Mind Maps', 'Flashcards'];

  // Dummy data for study materials
  const studyMaterials = [
    {
      id: '1',
      title: 'Indian Polity Comprehensive Notes',
      description: 'Complete notes covering all aspects of Indian Polity and Constitution for UPSC CSE',
      thumbnail: 'https://via.placeholder.com/400x200',
      category: 'Notes',
      pages: 120,
      fileSize: '15.5 MB',
      author: 'Dr. Rajesh Kumar',
      downloads: 12500,
      rating: 4.8,
      featured: true,
    },
    {
      id: '2',
      title: 'Geography Mind Maps',
      description: 'Visual mind maps for quick revision of Geography concepts',
      thumbnail: 'https://via.placeholder.com/400x200',
      category: 'Mind Maps',
      pages: 45,
      fileSize: '8.2 MB',
      author: 'Prof. Meera Iyer',
      downloads: 8700,
      rating: 4.7,
      featured: false,
    },
    {
      id: '3',
      title: 'Economics Handouts',
      description: 'Concise handouts covering key economic concepts and current economic issues',
      thumbnail: 'https://via.placeholder.com/400x200',
      category: 'Handouts',
      pages: 65,
      fileSize: '10.8 MB',
      author: 'Dr. Priya Mehta',
      downloads: 7500,
      rating: 4.6,
      featured: true,
    },
    {
      id: '4',
      title: 'History Flashcards',
      description: 'Digital flashcards for quick revision of important historical events and personalities',
      thumbnail: 'https://via.placeholder.com/400x200',
      category: 'Flashcards',
      pages: 200,
      fileSize: '5.5 MB',
      author: 'Dr. Vikram Singh',
      downloads: 9200,
      rating: 4.9,
      featured: false,
    },
    {
      id: '5',
      title: 'Science & Technology Notes',
      description: 'Comprehensive notes on Science & Technology topics relevant for UPSC',
      thumbnail: 'https://via.placeholder.com/400x200',
      category: 'Notes',
      pages: 85,
      fileSize: '12.3 MB',
      author: 'Prof. Anand Sharma',
      downloads: 6800,
      rating: 4.7,
      featured: false,
    },
    {
      id: '6',
      title: 'Environment & Ecology Book',
      description: 'Complete book covering all aspects of Environment and Ecology for UPSC CSE',
      thumbnail: 'https://via.placeholder.com/400x200',
      category: 'Books',
      pages: 250,
      fileSize: '28.5 MB',
      author: 'Dr. Sanjay Gupta',
      downloads: 11500,
      rating: 4.8,
      featured: true,
    },
  ];

  const filteredMaterials = studyMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryButton, selectedCategory === item && styles.selectedCategoryButton]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[styles.categoryButtonText, selectedCategory === item && styles.selectedCategoryButtonText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMaterialItem = ({ item }) => (
    <TouchableOpacity style={styles.materialCard}>
      <View style={styles.materialImageContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.materialImage} resizeMode="cover" />
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>

      <View style={styles.materialContent}>
        <Text style={styles.materialTitle}>{item.title}</Text>
        <Text style={styles.materialDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.materialMetaContainer}>
          <View style={styles.materialMetaItem}>
            <MaterialIcons name="person" size={14} color="#666" />
            <Text style={styles.materialMetaText}>{item.author}</Text>
          </View>
          <View style={styles.materialMetaItem}>
            <MaterialIcons name="description" size={14} color="#666" />
            <Text style={styles.materialMetaText}>{item.pages} pages</Text>
          </View>
          <View style={styles.materialMetaItem}>
            <MaterialIcons name="storage" size={14} color="#666" />
            <Text style={styles.materialMetaText}>{item.fileSize}</Text>
          </View>
        </View>

        <View style={styles.materialFooter}>
          <View style={styles.materialStats}>
            <Text style={styles.materialRating}>
              <MaterialIcons name="star" size={14} color="#FFD700" /> {item.rating}
            </Text>
            <Text style={styles.materialDownloads}>
              <MaterialIcons name="file-download" size={14} color="#666" /> {item.downloads.toLocaleString()}
            </Text>
          </View>

          <View style={styles.materialActions}>
            <TouchableOpacity style={styles.materialActionButton}>
              <MaterialIcons name="visibility" size={20} color="#4361EE" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.materialActionButton}>
              <MaterialIcons name="file-download" size={20} color="#4361EE" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.materialActionButton}>
              <MaterialIcons name="bookmark-border" size={20} color="#4361EE" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study Material</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search study materials..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
            <MaterialIcons name="clear" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        contentContainerStyle={styles.categoriesContainer}
      />

      <FlatList
        data={filteredMaterials}
        renderItem={renderMaterialItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.materialsContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: isTablet ? 22 : 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: isTablet ? 16 : 14,
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  categoriesList: {
    maxHeight: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriesContainer: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategoryButton: {
    backgroundColor: '#4361EE',
  },
  categoryButtonText: {
    fontSize: isTablet ? 15 : 13,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  materialsContainer: {
    padding: 16,
  },
  materialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  materialImageContainer: {
    position: 'relative',
  },
  materialImage: {
    width: '100%',
    height: 150,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  materialContent: {
    padding: 16,
  },
  materialTitle: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  materialDescription: {
    fontSize: isTablet ? 14 : 13,
    color: '#666',
    marginBottom: 12,
    lineHeight: isTablet ? 20 : 18,
  },
  materialMetaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  materialMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  materialMetaText: {
    fontSize: isTablet ? 13 : 11,
    color: '#666',
    marginLeft: 4,
  },
  materialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  materialStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialRating: {
    fontSize: isTablet ? 13 : 11,
    color: '#666',
    marginRight: 12,
  },
  materialDownloads: {
    fontSize: isTablet ? 13 : 11,
    color: '#666',
  },
  materialActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialActionButton: {
    padding: 6,
    marginLeft: 8,
  },
});

export default StudyMaterialScreenNew;
