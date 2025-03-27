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
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Pdf from 'react-native-pdf';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const StudyMaterialScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [pdfVisible, setPdfVisible] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const categories = ['All', 'Notes', 'Books', 'Handouts', 'Mind Maps', 'Flashcards', 'Previous Year'];

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
            lastUpdated: 'May 15, 2025',
            downloads: 12500,
            rating: 4.8,
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: true,
            isPremium: false,
        },
        {
            id: '2',
            title: 'Geography Mind Maps Collection',
            description: 'Visual mind maps for easy memorization of geographical concepts and facts',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Mind Maps',
            pages: 45,
            fileSize: '8.2 MB',
            author: 'Prof. Meera Iyer',
            lastUpdated: 'May 20, 2025',
            downloads: 8700,
            rating: 4.7,
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: false,
            isPremium: false,
        },
        {
            id: '3',
            title: 'Economics Handouts - 2025 Edition',
            description: 'Concise handouts covering key economic concepts, theories, and current economic scenario',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Handouts',
            pages: 65,
            fileSize: '10.8 MB',
            author: 'Dr. Priya Mehta',
            lastUpdated: 'May 25, 2025',
            downloads: 9500,
            rating: 4.9,
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: true,
            isPremium: true,
        },
        {
            id: '4',
            title: 'UPSC CSE Previous Year Papers (2015-2025)',
            description: 'Collection of previous year question papers with detailed solutions and analysis',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Previous Year',
            pages: 250,
            fileSize: '28.5 MB',
            author: 'UPSC Guru Editorial Team',
            lastUpdated: 'June 1, 2025',
            downloads: 15800,
            rating: 4.9,
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: true,
            isPremium: true,
        },
        {
            id: '5',
            title: 'Modern History Flashcards',
            description: 'Digital flashcards for quick revision of modern Indian history',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Flashcards',
            pages: 100,
            fileSize: '12.5 MB',
            author: 'Dr. Vikram Singh',
            lastUpdated: 'June 5, 2025',
            downloads: 7200,
            rating: 4.6,
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: false,
            isPremium: false,
        },
        {
            id: '6',
            title: 'Environment & Ecology Complete Book',
            description: 'Comprehensive book covering all aspects of environment and ecology for UPSC CSE',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Books',
            pages: 320,
            fileSize: '35.2 MB',
            author: 'Prof. Anand Sharma',
            lastUpdated: 'June 10, 2025',
            downloads: 11200,
            rating: 4.8,
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: true,
            isPremium: true,
        },
        {
            id: '7',
            title: 'Science & Technology Notes',
            description: 'Updated notes on science and technology with focus on recent developments',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Notes',
            pages: 85,
            fileSize: '11.8 MB',
            author: 'Dr. Sanjay Gupta',
            lastUpdated: 'June 15, 2025',
            downloads: 8900,
            rating: 4.7,
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: false,
            isPremium: false,
        },
        {
            id: '8',
            title: 'Art & Culture Handouts',
            description: 'Concise handouts on Indian art, architecture, and cultural heritage',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Handouts',
            pages: 70,
            fileSize: '9.5 MB',
            author: 'Dr. Neha Sharma',
            lastUpdated: 'June 20, 2025',
            downloads: 7500,
            rating: 4.6,
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: false,
            isPremium: true,
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

    const openPdf = (material) => {
        setSelectedMaterial(material);
        setPdfVisible(true);
    };

    const renderMaterialItem = ({ item }) => (
        <TouchableOpacity style={styles.materialCard} onPress={() => openPdf(item)}>
            <View style={styles.materialImageContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.materialImage} resizeMode="cover" />
                {item.featured && (
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>Featured</Text>
                    </View>
                )}
                {item.isPremium && (
                    <View style={styles.premiumBadge}>
                        <MaterialIcons name="star" size={12} color="#fff" />
                        <Text style={styles.premiumText}>Premium</Text>
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
                        <MaterialIcons name="update" size={14} color="#666" />
                        <Text style={styles.materialMetaText}>{item.lastUpdated}</Text>
                    </View>
                </View>

                <View style={styles.materialStats}>
                    <View style={styles.materialStatsItem}>
                        <MaterialIcons name="file-download" size={14} color="#666" />
                        <Text style={styles.materialStatsText}>{item.downloads.toLocaleString()}</Text>
                    </View>
                    <View style={styles.materialStatsItem}>
                        <MaterialIcons name="star" size={14} color="#FFD700" />
                        <Text style={styles.materialStatsText}>{item.rating}</Text>
                    </View>
                    <View style={styles.materialStatsItem}>
                        <MaterialIcons name="storage" size={14} color="#666" />
                        <Text style={styles.materialStatsText}>{item.fileSize}</Text>
                    </View>
                </View>

                <View style={styles.materialFooter}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{item.category}</Text>
                    </View>

                    <TouchableOpacity style={styles.downloadButton} onPress={() => openPdf(item)}>
                        <Text style={styles.downloadButtonText}>{item.isPremium ? 'Preview' : 'Download'}</Text>
                        <MaterialIcons name={item.isPremium ? 'visibility' : 'file-download'} size={16} color="#fff" />
                    </TouchableOpacity>
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

            {/* PDF Viewer Modal */}
            <Modal visible={pdfVisible} animationType="slide" transparent={false} onRequestClose={() => setPdfVisible(false)}>
                <SafeAreaView style={styles.pdfContainer}>
                    <View style={styles.pdfHeader}>
                        <TouchableOpacity style={styles.pdfCloseButton} onPress={() => setPdfVisible(false)}>
                            <MaterialIcons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.pdfTitle} numberOfLines={1}>
                            {selectedMaterial?.title}
                        </Text>
                        <TouchableOpacity style={styles.pdfDownloadButton}>
                            <MaterialIcons name="file-download" size={24} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    {selectedMaterial?.isPremium && (
                        <View style={styles.premiumOverlay}>
                            <View style={styles.premiumContent}>
                                <MaterialIcons name="lock" size={40} color="#4361EE" />
                                <Text style={styles.premiumTitle}>Premium Content</Text>
                                <Text style={styles.premiumDescription}>
                                    This is a premium study material. Subscribe to access the full content.
                                </Text>
                                <TouchableOpacity style={styles.subscribeButton}>
                                    <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* {selectedMaterial && (
                        <Pdf
                            source={{ uri: selectedMaterial.pdfUrl }}
                            style={styles.pdf}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`Number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`Current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                        />
                    )} */}
                </SafeAreaView>
            </Modal>
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
    premiumBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    premiumText: {
        color: '#333',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
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
    materialStats: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    materialStatsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    materialStatsText: {
        fontSize: isTablet ? 13 : 11,
        color: '#666',
        marginLeft: 4,
    },
    materialFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryBadge: {
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
    },
    categoryBadgeText: {
        color: '#4361EE',
        fontSize: isTablet ? 13 : 11,
        fontWeight: '500',
    },
    downloadButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        marginRight: 4,
    },
    pdfContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pdfHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    pdfCloseButton: {
        padding: 8,
    },
    pdfTitle: {
        flex: 1,
        fontSize: isTablet ? 18 : 16,
        fontWeight: '600',
        color: '#333',
        marginHorizontal: 12,
        textAlign: 'center',
    },
    pdfDownloadButton: {
        padding: 8,
    },
    pdf: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    premiumOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    premiumContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        width: '80%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    premiumTitle: {
        fontSize: isTablet ? 22 : 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    premiumDescription: {
        fontSize: isTablet ? 16 : 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    subscribeButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    subscribeButtonText: {
        color: '#fff',
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
    },
});

export default StudyMaterialScreen;
