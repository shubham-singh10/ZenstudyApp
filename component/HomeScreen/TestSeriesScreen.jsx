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

const TestSeriesScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Prelims', 'Mains', 'Subject-wise', 'Full Length', 'Daily Quiz'];

    // Dummy data for test series
    const testSeries = [
        {
            id: '1',
            title: 'UPSC CSE Prelims 2025 Full Test Series',
            description: 'Complete preparation with 30 full-length tests covering all topics as per the latest pattern',
            image: 'https://via.placeholder.com/400x200',
            tests: 30,
            questions: 3000,
            price: '₹3,999',
            discountPrice: '₹1,999',
            category: 'Prelims',
            featured: true,
            enrolled: 8500,
            rating: 4.8,
            validity: '1 year',
            languages: ['English', 'Hindi'],
        },
        {
            id: '2',
            title: 'Indian Polity Test Series',
            description: 'Comprehensive subject-wise tests covering all aspects of Indian Polity and Constitution',
            image: 'https://via.placeholder.com/400x200',
            tests: 15,
            questions: 1500,
            price: '₹1,499',
            discountPrice: '₹999',
            category: 'Subject-wise',
            featured: false,
            enrolled: 5200,
            rating: 4.7,
            validity: '1 year',
            languages: ['English', 'Hindi'],
        },
        {
            id: '3',
            title: 'Daily Current Affairs Quiz',
            description: 'Stay updated with daily quizzes on current affairs relevant for UPSC examination',
            image: 'https://via.placeholder.com/400x200',
            tests: 365,
            questions: 3650,
            price: '₹2,499',
            discountPrice: '₹1,499',
            category: 'Daily Quiz',
            featured: true,
            enrolled: 12000,
            rating: 4.9,
            validity: '1 year',
            languages: ['English'],
        },
        {
            id: '4',
            title: 'UPSC CSE Mains GS Test Series',
            description: 'Comprehensive test series for General Studies Papers I, II, III, and IV',
            image: 'https://via.placeholder.com/400x200',
            tests: 20,
            questions: 400,
            price: '₹4,999',
            discountPrice: '₹2,999',
            category: 'Mains',
            featured: true,
            enrolled: 4800,
            rating: 4.8,
            validity: '1 year',
            languages: ['English', 'Hindi'],
        },
        {
            id: '5',
            title: 'Geography Subject Test Series',
            description: 'In-depth tests covering physical, human, and Indian geography for UPSC CSE',
            image: 'https://via.placeholder.com/400x200',
            tests: 12,
            questions: 1200,
            price: '₹1,299',
            discountPrice: '₹899',
            category: 'Subject-wise',
            featured: false,
            enrolled: 3500,
            rating: 4.6,
            validity: '1 year',
            languages: ['English', 'Hindi'],
        },
        {
            id: '6',
            title: 'CSAT Preparation Test Series',
            description: 'Focused test series for CSAT preparation with detailed explanations',
            image: 'https://via.placeholder.com/400x200',
            tests: 15,
            questions: 1500,
            price: '₹1,799',
            discountPrice: '₹1,199',
            category: 'Prelims',
            featured: false,
            enrolled: 6200,
            rating: 4.7,
            validity: '1 year',
            languages: ['English'],
        },
        {
            id: '7',
            title: 'Essay Writing Test Series',
            description: 'Improve your essay writing skills with guided practice and expert evaluation',
            image: 'https://via.placeholder.com/400x200',
            tests: 10,
            questions: 20,
            price: '₹2,499',
            discountPrice: '₹1,699',
            category: 'Mains',
            featured: false,
            enrolled: 2800,
            rating: 4.8,
            validity: '1 year',
            languages: ['English', 'Hindi'],
        },
        {
            id: '8',
            title: 'Full Length Prelims Mock Tests',
            description: 'Simulate actual exam conditions with timed full-length tests',
            image: 'https://via.placeholder.com/400x200',
            tests: 10,
            questions: 1000,
            price: '₹1,999',
            discountPrice: '₹1,299',
            category: 'Full Length',
            featured: true,
            enrolled: 7500,
            rating: 4.9,
            validity: '1 year',
            languages: ['English', 'Hindi'],
        },
    ];

    const filteredTests = testSeries.filter((test) => {
        const matchesSearch =
            test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;

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

    const renderTestItem = ({ item }) => (
        <TouchableOpacity style={styles.testCard} onPress={() => navigation.navigate('TestDetails', { testId: item.id })}>
            <View style={styles.testImageContainer}>
                <Image source={{ uri: item.image }} style={styles.testImage} resizeMode="cover" />
                {item.featured && (
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>Featured</Text>
                    </View>
                )}
            </View>

            <View style={styles.testContent}>
                <Text style={styles.testTitle}>{item.title}</Text>
                <Text style={styles.testDescription} numberOfLines={2}>
                    {item.description}
                </Text>

                <View style={styles.testStats}>
                    <View style={styles.statItem}>
                        <MaterialIcons name="assignment" size={16} color="#4361EE" />
                        <Text style={styles.statText}>{item.tests} Tests</Text>
                    </View>
                    <View style={styles.statItem}>
                        <MaterialIcons name="help-outline" size={16} color="#4361EE" />
                        <Text style={styles.statText}>{item.questions} Questions</Text>
                    </View>
                    <View style={styles.statItem}>
                        <MaterialIcons name="access-time" size={16} color="#4361EE" />
                        <Text style={styles.statText}>{item.validity}</Text>
                    </View>
                </View>

                <View style={styles.testFooter}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.discountPrice}>{item.discountPrice}</Text>
                        <Text style={styles.originalPrice}>{item.price}</Text>
                    </View>

                    <TouchableOpacity style={styles.enrollButton}>
                        <Text style={styles.enrollButtonText}>Enroll Now</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.testMeta}>
                    <Text style={styles.enrolledText}>
                        <MaterialIcons name="people" size={14} color="#666" /> {item.enrolled.toLocaleString()} enrolled
                    </Text>
                    <Text style={styles.ratingText}>
                        <MaterialIcons name="star" size={14} color="#FFD700" /> {item.rating}
                    </Text>
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
                <Text style={styles.headerTitle}>Test Series</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="filter-list" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search test series..."
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
                data={filteredTests}
                renderItem={renderTestItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.testsContainer}
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
    testsContainer: {
        padding: 16,
    },
    testCard: {
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
    testImageContainer: {
        position: 'relative',
    },
    testImage: {
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
    testContent: {
        padding: 16,
    },
    testTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    testDescription: {
        fontSize: isTablet ? 14 : 13,
        color: '#666',
        marginBottom: 12,
        lineHeight: isTablet ? 20 : 18,
    },
    testStats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 8,
    },
    statText: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginLeft: 4,
    },
    testFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discountPrice: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#4361EE',
        marginRight: 8,
    },
    originalPrice: {
        fontSize: isTablet ? 14 : 12,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    enrollButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    enrollButtonText: {
        color: '#fff',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
    },
    testMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    enrolledText: {
        fontSize: isTablet ? 13 : 11,
        color: '#666',
    },
    ratingText: {
        fontSize: isTablet ? 13 : 11,
        color: '#666',
    },
});

export default TestSeriesScreen;
