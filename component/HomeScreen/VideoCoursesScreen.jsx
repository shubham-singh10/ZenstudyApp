import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const isTablet = width > 768;
const cardWidth = isTablet ? width / 2 - 24 : width - 32;

const VideoCoursesScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Prelims', 'Mains', 'Interview', 'Optional', 'Current Affairs'];

    // Dummy data for video courses
    const courses = [
        {
            id: '1',
            title: 'Complete UPSC Prelims 2025',
            instructor: 'Dr. Rajesh Kumar',
            thumbnail: 'https://via.placeholder.com/600x400',
            duration: '120 hours',
            rating: 4.8,
            students: 12500,
            price: '₹8,999',
            discountPrice: '₹4,999',
            category: 'Prelims',
            tags: ['GS Paper 1', 'GS Paper 2', 'CSAT'],
            featured: true,
        },
        {
            id: '2',
            title: 'Indian Polity & Constitution',
            instructor: 'Prof. Anand Sharma',
            thumbnail: 'https://via.placeholder.com/600x400',
            duration: '45 hours',
            rating: 4.7,
            students: 9800,
            price: '₹3,999',
            discountPrice: '₹2,499',
            category: 'Prelims',
            tags: ['GS Paper 2', 'Polity'],
            featured: false,
        },
        {
            id: '3',
            title: 'Economics for UPSC CSE',
            instructor: 'Dr. Priya Mehta',
            thumbnail: 'https://via.placeholder.com/600x400',
            duration: '50 hours',
            rating: 4.6,
            students: 8500,
            price: '₹4,499',
            discountPrice: '₹2,999',
            category: 'Prelims',
            tags: ['GS Paper 3', 'Economics'],
            featured: false,
        },
        {
            id: '4',
            title: 'Geography & Environment',
            instructor: 'Dr. Vikram Singh',
            thumbnail: 'https://via.placeholder.com/600x400',
            duration: '40 hours',
            rating: 4.9,
            students: 11200,
            price: '₹3,999',
            discountPrice: '₹2,499',
            category: 'Prelims',
            tags: ['GS Paper 1', 'Geography'],
            featured: true,
        },
        {
            id: '5',
            title: 'Essay Writing for UPSC Mains',
            instructor: 'Prof. Meera Iyer',
            thumbnail: 'https://via.placeholder.com/600x400',
            duration: '25 hours',
            rating: 4.7,
            students: 7500,
            price: '₹2,999',
            discountPrice: '₹1,999',
            category: 'Mains',
            tags: ['Essay', 'Writing Skills'],
            featured: false,
        },
        {
            id: '6',
            title: 'Ethics, Integrity & Aptitude',
            instructor: 'Dr. Sanjay Gupta',
            thumbnail: 'https://via.placeholder.com/600x400',
            duration: '35 hours',
            rating: 4.8,
            students: 9200,
            price: '₹3,499',
            discountPrice: '₹2,299',
            category: 'Mains',
            tags: ['GS Paper 4', 'Ethics'],
            featured: true,
        },
        {
            id: '7',
            title: 'Interview Preparation Masterclass',
            instructor: 'Retd. IAS Ravi Kapoor',
            thumbnail: 'https://via.placeholder.com/600x400',
            duration: '20 hours',
            rating: 4.9,
            students: 5600,
            price: '₹4,999',
            discountPrice: '₹3,499',
            category: 'Interview',
            tags: ['Personality Test', 'Mock Interviews'],
            featured: true,
        },
        {
            id: '8',
            title: 'Sociology Optional Complete Course',
            instructor: 'Dr. Neha Sharma',
            thumbnail: 'https://via.placeholder.com/600x400',
            duration: '80 hours',
            rating: 4.7,
            students: 4200,
            price: '₹7,999',
            discountPrice: '₹5,999',
            category: 'Optional',
            tags: ['Sociology', 'Optional Paper'],
            featured: false,
        },
    ];

    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

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

    const renderCourseItem = ({ item }) => (
        <TouchableOpacity
            style={styles.courseCard}
            onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
        >
            <View style={styles.thumbnailContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.courseThumbnail} resizeMode="cover" />
                <View style={styles.durationContainer}>
                    <MaterialIcons name="access-time" size={12} color="#fff" />
                    <Text style={styles.durationText}>{item.duration}</Text>
                </View>
                {item.featured && (
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>Featured</Text>
                    </View>
                )}
            </View>

            <View style={styles.courseContent}>
                <Text style={styles.courseTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.instructorName}>
                    <MaterialIcons name="person" size={14} color="#666" /> {item.instructor}
                </Text>

                <View style={styles.courseStats}>
                    <Text style={styles.courseRating}>
                        <MaterialIcons name="star" size={14} color="#FFD700" /> {item.rating}
                    </Text>
                    <Text style={styles.courseStudents}>
                        <MaterialIcons name="people" size={14} color="#666" /> {item.students.toLocaleString()}
                    </Text>
                </View>

                <View style={styles.tagsContainer}>
                    {item.tags.slice(0, 2).map((tag, index) => (
                        <View key={index} style={styles.tagBadge}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.coursePricing}>
                    <Text style={styles.discountPrice}>{item.discountPrice}</Text>
                    <Text style={styles.originalPrice}>{item.price}</Text>
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
                <Text style={styles.headerTitle}>Video Courses</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="filter-list" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search courses, instructors, topics..."
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
                data={filteredCourses}
                renderItem={renderCourseItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.coursesContainer}
                numColumns={isTablet ? 2 : 1}
                key={isTablet ? 'two-columns' : 'one-column'}
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
    coursesContainer: {
        padding: 16,
    },
    courseCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        width: cardWidth,
        marginHorizontal: isTablet ? 8 : 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    thumbnailContainer: {
        position: 'relative',
    },
    courseThumbnail: {
        width: '100%',
        height: 180,
    },
    durationContainer: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '500',
    },
    featuredBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
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
    courseContent: {
        padding: 12,
    },
    courseTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6,
    },
    instructorName: {
        fontSize: isTablet ? 14 : 13,
        color: '#666',
        marginBottom: 6,
    },
    courseStats: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    courseRating: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginRight: 12,
    },
    courseStudents: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
    },
    tagsContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    tagBadge: {
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 6,
    },
    tagText: {
        color: '#4361EE',
        fontSize: isTablet ? 12 : 10,
        fontWeight: '500',
    },
    coursePricing: {
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
});

export default VideoCoursesScreen;
