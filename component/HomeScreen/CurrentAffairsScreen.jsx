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

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;

const CurrentAffairsScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [pdfVisible, setPdfVisible] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const categories = ['All', 'Daily', 'Weekly', 'Monthly', 'Economy', 'Polity', 'Environment', 'International'];

    // Dummy data for current affairs
    const currentAffairs = [
        {
            id: '1',
            title: 'Monthly Current Affairs Compilation - May 2025',
            description: 'Comprehensive coverage of all important events and developments from May 2025',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Monthly',
            date: 'June 1, 2025',
            pages: 45,
            fileSize: '5.2 MB',
            source: 'UPSC Guru Editorial Team',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: true,
        },
        {
            id: '2',
            title: 'Daily Current Affairs - June 15, 2025',
            description: 'Summary of important news and events from June 15, 2025 relevant for UPSC examination',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Daily',
            date: 'June 15, 2025',
            pages: 8,
            fileSize: '1.5 MB',
            source: 'UPSC Guru Editorial Team',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: false,
        },
        {
            id: '3',
            title: 'Economic Survey 2024-25: Key Highlights',
            description: 'Analysis and summary of the Economic Survey 2024-25 with UPSC perspective',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Economy',
            date: 'May 20, 2025',
            pages: 22,
            fileSize: '3.8 MB',
            source: 'UPSC Guru Economic Experts',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: true,
        },
        {
            id: '4',
            title: 'Weekly Current Affairs - First Week of June 2025',
            description: 'Compilation of important events and developments from the first week of June 2025',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Weekly',
            date: 'June 7, 2025',
            pages: 18,
            fileSize: '2.7 MB',
            source: 'UPSC Guru Editorial Team',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: false,
        },
        {
            id: '5',
            title: 'International Relations: India-US Strategic Partnership',
            description: 'Detailed analysis of recent developments in India-US relations and their strategic implications',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'International',
            date: 'May 25, 2025',
            pages: 15,
            fileSize: '2.2 MB',
            source: 'UPSC Guru IR Experts',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: false,
        },
        {
            id: '6',
            title: 'Environmental Initiatives and Climate Action in India',
            description: 'Recent environmental policies, initiatives and climate action plans in India',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Environment',
            date: 'June 5, 2025',
            pages: 12,
            fileSize: '1.8 MB',
            source: 'UPSC Guru Environmental Experts',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: true,
        },
        {
            id: '7',
            title: 'Constitutional Amendments and Recent Judgments',
            description: 'Analysis of recent constitutional amendments and landmark Supreme Court judgments',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Polity',
            date: 'May 30, 2025',
            pages: 20,
            fileSize: '3.1 MB',
            source: 'UPSC Guru Legal Experts',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: false,
        },
        {
            id: '8',
            title: 'Daily Current Affairs - June 14, 2025',
            description: 'Summary of important news and events from June 14, 2025 relevant for UPSC examination',
            thumbnail: 'https://via.placeholder.com/400x200',
            category: 'Daily',
            date: 'June 14, 2025',
            pages: 7,
            fileSize: '1.4 MB',
            source: 'UPSC Guru Editorial Team',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            featured: false,
        },
    ];

    const filteredCurrentAffairs = currentAffairs.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

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

    const openPdf = (item) => {
        setSelectedPdf(item);
        setPdfVisible(true);
    };

    const renderCurrentAffairsItem = ({ item }) => (
        <TouchableOpacity style={styles.caCard} onPress={() => openPdf(item)}>
            <View style={styles.caImageContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.caImage} resizeMode="cover" />
                {item.featured && (
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>Featured</Text>
                    </View>
                )}
            </View>

            <View style={styles.caContent}>
                <Text style={styles.caTitle}>{item.title}</Text>
                <Text style={styles.caDescription} numberOfLines={2}>
                    {item.description}
                </Text>

                <View style={styles.caMetaContainer}>
                    <View style={styles.caMetaItem}>
                        <MaterialIcons name="calendar-today" size={14} color="#666" />
                        <Text style={styles.caMetaText}>{item.date}</Text>
                    </View>
                    <View style={styles.caMetaItem}>
                        <MaterialIcons name="description" size={14} color="#666" />
                        <Text style={styles.caMetaText}>{item.pages} pages</Text>
                    </View>
                    <View style={styles.caMetaItem}>
                        <MaterialIcons name="storage" size={14} color="#666" />
                        <Text style={styles.caMetaText}>{item.fileSize}</Text>
                    </View>
                </View>

                <View style={styles.caFooter}>
                    <View style={styles.caCategory}>
                        <Text style={styles.caCategoryText}>{item.category}</Text>
                    </View>

                    <TouchableOpacity style={styles.readButton} onPress={() => openPdf(item)}>
                        <Text style={styles.readButtonText}>Read Now</Text>
                        <MaterialIcons name="arrow-forward" size={16} color="#fff" />
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
                <Text style={styles.headerTitle}>Current Affairs</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="filter-list" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search current affairs..."
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
                data={filteredCurrentAffairs}
                renderItem={renderCurrentAffairsItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.caContainer}
            />

            {/* PDF Viewer Modal */}
            <Modal visible={pdfVisible} animationType="slide" transparent={false} onRequestClose={() => setPdfVisible(false)}>
                <SafeAreaView style={styles.pdfContainer}>
                    <View style={styles.pdfHeader}>
                        <TouchableOpacity style={styles.pdfCloseButton} onPress={() => setPdfVisible(false)}>
                            <MaterialIcons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.pdfTitle} numberOfLines={1}>
                            {selectedPdf?.title}
                        </Text>
                        <TouchableOpacity style={styles.pdfDownloadButton}>
                            <MaterialIcons name="file-download" size={24} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    {/* {selectedPdf && (
                        <Pdf
                            source={{ uri: selectedPdf.pdfUrl }}
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
    caContainer: {
        padding: 16,
    },
    caCard: {
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
    caImageContainer: {
        position: 'relative',
    },
    caImage: {
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
    caContent: {
        padding: 16,
    },
    caTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    caDescription: {
        fontSize: isTablet ? 14 : 13,
        color: '#666',
        marginBottom: 12,
        lineHeight: isTablet ? 20 : 18,
    },
    caMetaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    caMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 8,
    },
    caMetaText: {
        fontSize: isTablet ? 13 : 11,
        color: '#666',
        marginLeft: 4,
    },
    caFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    caCategory: {
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
    },
    caCategoryText: {
        color: '#4361EE',
        fontSize: isTablet ? 13 : 11,
        fontWeight: '500',
    },
    readButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    readButtonText: {
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
});

export default CurrentAffairsScreen;

