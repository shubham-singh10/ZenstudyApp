import React,{ useState } from 'react';
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
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const AudioLecturesScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [playerVisible, setPlayerVisible] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const categories = ['All', 'History', 'Geography', 'Polity', 'Economics', 'Science', 'Current Affairs'];

    // Dummy data for audio lectures
    const audioLectures = [
        {
            id: '1',
            title: 'Modern Indian History: Freedom Movement',
            description: 'Comprehensive coverage of the Indian Freedom Movement from 1857 to 1947',
            instructor: 'Dr. Rajesh Kumar',
            thumbnail: 'https://via.placeholder.com/400x200',
            duration: '1h 45m',
            category: 'History',
            rating: 4.8,
            listeners: 8500,
            date: 'May 15, 2025',
            audioUrl: 'https://example.com/audio1.mp3',
            featured: true,
        },
        {
            id: '2',
            title: 'Indian Geography: Climate and Monsoon',
            description: 'Detailed explanation of Indian climate patterns and monsoon system',
            instructor: 'Prof. Meera Iyer',
            thumbnail: 'https://via.placeholder.com/400x200',
            duration: '1h 20m',
            category: 'Geography',
            rating: 4.7,
            listeners: 7200,
            date: 'May 20, 2025',
            audioUrl: 'https://example.com/audio2.mp3',
            featured: false,
        },
        {
            id: '3',
            title: 'Indian Constitution: Fundamental Rights',
            description: 'In-depth analysis of Fundamental Rights in the Indian Constitution',
            instructor: 'Prof. Anand Sharma',
            thumbnail: 'https://via.placeholder.com/400x200',
            duration: '1h 30m',
            category: 'Polity',
            rating: 4.9,
            listeners: 9100,
            date: 'May 25, 2025',
            audioUrl: 'https://example.com/audio3.mp3',
            featured: true,
        },
        {
            id: '4',
            title: 'Indian Economy: Banking System',
            description: 'Comprehensive overview of the Indian banking system and recent reforms',
            instructor: 'Dr. Priya Mehta',
            thumbnail: 'https://via.placeholder.com/400x200',
            duration: '1h 15m',
            category: 'Economics',
            rating: 4.6,
            listeners: 6800,
            date: 'June 1, 2025',
            audioUrl: 'https://example.com/audio4.mp3',
            featured: false,
        },
        {
            id: '5',
            title: 'Environmental Science: Biodiversity',
            description: 'Understanding biodiversity, its importance, and conservation strategies',
            instructor: 'Dr. Vikram Singh',
            thumbnail: 'https://via.placeholder.com/400x200',
            duration: '1h 10m',
            category: 'Science',
            rating: 4.7,
            listeners: 5500,
            date: 'June 5, 2025',
            audioUrl: 'https://example.com/audio5.mp3',
            featured: false,
        },
        {
            id: '6',
            title: 'Current Affairs: International Relations',
            description: 'Analysis of recent developments in international relations and their implications',
            instructor: 'Dr. Sanjay Gupta',
            thumbnail: 'https://via.placeholder.com/400x200',
            duration: '1h 25m',
            category: 'Current Affairs',
            rating: 4.8,
            listeners: 7800,
            date: 'June 10, 2025',
            audioUrl: 'https://example.com/audio6.mp3',
            featured: true,
        },
        {
            id: '7',
            title: 'Ancient Indian History: Mauryan Empire',
            description: 'Detailed study of the Mauryan Empire and its contributions to Indian history',
            instructor: 'Dr. Rajesh Kumar',
            thumbnail: 'https://via.placeholder.com/400x200',
            duration: '1h 40m',
            category: 'History',
            rating: 4.7,
            listeners: 6200,
            date: 'June 15, 2025',
            audioUrl: 'https://example.com/audio7.mp3',
            featured: false,
        },
        {
            id: '8',
            title: 'Physical Geography: Geomorphology',
            description: 'Understanding the formation and evolution of landforms on Earth',
            instructor: 'Prof. Meera Iyer',
            thumbnail: 'https://via.placeholder.com/400x200',
            duration: '1h 35m',
            category: 'Geography',
            rating: 4.6,
            listeners: 5800,
            date: 'June 20, 2025',
            audioUrl: 'https://example.com/audio8.mp3',
            featured: false,
        },
    ];

    const filteredAudioLectures = audioLectures.filter((audio) => {
        const matchesSearch =
            audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            audio.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            audio.instructor.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || audio.category === selectedCategory;

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

    const playAudio = (audio) => {
        setSelectedAudio(audio);
        setPlayerVisible(true);
        setIsPlaying(true);
        // In a real app, you would start playing the audio here
        // For this demo, we'll just simulate progress
        simulateAudioProgress();
    };

    const simulateAudioProgress = () => {
        // This is just a simulation for the demo
        // In a real app, you would track actual audio progress
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 1) {
                    clearInterval(interval);
                    setIsPlaying(false);
                    return 1;
                }
                return prev + 0.01;
            });
        }, 1000);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            simulateAudioProgress();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const renderAudioItem = ({ item }) => (
        <TouchableOpacity style={styles.audioCard} onPress={() => playAudio(item)}>
            <View style={styles.audioImageContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.audioImage} resizeMode="cover" />
                <View style={styles.playIconOverlay}>
                    <MaterialIcons name="play-circle-filled" size={isTablet ? 50 : 40} color="#fff" />
                </View>
                {item.featured && (
                    <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>Featured</Text>
                    </View>
                )}
            </View>

            <View style={styles.audioContent}>
                <Text style={styles.audioTitle}>{item.title}</Text>
                <Text style={styles.audioInstructor}>
                    <MaterialIcons name="person" size={14} color="#666" /> {item.instructor}
                </Text>

                <View style={styles.audioStats}>
                    <View style={styles.statItem}>
                        <MaterialIcons name="access-time" size={14} color="#666" />
                        <Text style={styles.statText}>{item.duration}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <MaterialIcons name="star" size={14} color="#FFD700" />
                        <Text style={styles.statText}>{item.rating}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <MaterialIcons name="headset" size={14} color="#666" />
                        <Text style={styles.statText}>{item.listeners.toLocaleString()}</Text>
                    </View>
                </View>

                <View style={styles.audioFooter}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </View>

                    <TouchableOpacity style={styles.listenButton} onPress={() => playAudio(item)}>
                        <Text style={styles.listenButtonText}>Listen Now</Text>
                        <MaterialIcons name="headset" size={16} color="#fff" />
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
                <Text style={styles.headerTitle}>Audio Lectures</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="filter-list" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search audio lectures..."
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
                data={filteredAudioLectures}
                renderItem={renderAudioItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.audioContainer}
            />

            {/* Audio Player Modal */}
            <Modal
                visible={playerVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setPlayerVisible(false)}
            >
                <View style={styles.playerModalContainer}>
                    <View style={styles.playerContent}>
                        <View style={styles.playerHeader}>
                            <TouchableOpacity style={styles.playerCloseButton} onPress={() => setPlayerVisible(false)}>
                                <MaterialIcons name="keyboard-arrow-down" size={28} color="#333" />
                            </TouchableOpacity>
                            <Text style={styles.playerHeaderTitle}>Now Playing</Text>
                            <TouchableOpacity style={styles.playerMoreButton}>
                                <MaterialIcons name="more-vert" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        {selectedAudio && (
                            <View style={styles.playerBody}>
                                <Image source={{ uri: selectedAudio.thumbnail }} style={styles.playerThumbnail} resizeMode="cover" />

                                <Text style={styles.playerTitle}>{selectedAudio.title}</Text>
                                <Text style={styles.playerInstructor}>{selectedAudio.instructor}</Text>

                                <View style={styles.progressContainer}>
                                    <Slider
                                        style={styles.progressSlider}
                                        minimumValue={0}
                                        maximumValue={1}
                                        value={progress}
                                        minimumTrackTintColor="#4361EE"
                                        maximumTrackTintColor="#ddd"
                                        thumbTintColor="#4361EE"
                                        onValueChange={(value) => setProgress(value)}
                                    />
                                    <View style={styles.timeContainer}>
                                        <Text style={styles.timeText}>
                                            {formatTime(
                                                progress * Number.parseInt(selectedAudio.duration.split('h')[0]) * 60 +
                                                Number.parseInt(selectedAudio.duration.split(' ')[1].replace('m', '')),
                                            )}
                                        </Text>
                                        <Text style={styles.timeText}>{selectedAudio.duration}</Text>
                                    </View>
                                </View>

                                <View style={styles.controlsContainer}>
                                    <TouchableOpacity style={styles.controlButton}>
                                        <MaterialIcons name="replay-30" size={isTablet ? 36 : 30} color="#666" />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
                                        <MaterialIcons
                                            name={isPlaying ? 'pause-circle-filled' : 'play-circle-filled'}
                                            size={isTablet ? 70 : 60}
                                            color="#4361EE"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.controlButton}>
                                        <MaterialIcons name="forward-30" size={isTablet ? 36 : 30} color="#666" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.extraControlsContainer}>
                                    <TouchableOpacity style={styles.extraControlButton}>
                                        <MaterialIcons name="speed" size={24} color="#666" />
                                        <Text style={styles.extraControlText}>1.0x</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.extraControlButton}>
                                        <MaterialIcons name="bookmark-border" size={24} color="#666" />
                                        <Text style={styles.extraControlText}>Bookmark</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.extraControlButton}>
                                        <MaterialIcons name="file-download" size={24} color="#666" />
                                        <Text style={styles.extraControlText}>Download</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
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
    audioContainer: {
        padding: 16,
    },
    audioCard: {
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
    audioImageContainer: {
        position: 'relative',
    },
    audioImage: {
        width: '100%',
        height: 180,
    },
    playIconOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
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
    audioContent: {
        padding: 16,
    },
    audioTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    audioInstructor: {
        fontSize: isTablet ? 14 : 13,
        color: '#666',
        marginBottom: 8,
    },
    audioStats: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    statText: {
        fontSize: isTablet ? 13 : 11,
        color: '#666',
        marginLeft: 4,
    },
    audioFooter: {
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
    categoryText: {
        color: '#4361EE',
        fontSize: isTablet ? 13 : 11,
        fontWeight: '500',
    },
    listenButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listenButtonText: {
        color: '#fff',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        marginRight: 4,
    },
    playerModalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    playerContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
        height: '80%',
    },
    playerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    playerCloseButton: {
        padding: 8,
    },
    playerHeaderTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: '600',
        color: '#333',
    },
    playerMoreButton: {
        padding: 8,
    },
    playerBody: {
        padding: 20,
        alignItems: 'center',
    },
    playerThumbnail: {
        width: isTablet ? 300 : 200,
        height: isTablet ? 300 : 200,
        borderRadius: 12,
        marginBottom: 20,
    },
    playerTitle: {
        fontSize: isTablet ? 22 : 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    playerInstructor: {
        fontSize: isTablet ? 16 : 14,
        color: '#666',
        marginBottom: 24,
    },
    progressContainer: {
        width: '100%',
        marginBottom: 20,
    },
    progressSlider: {
        width: '100%',
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
    },
    timeText: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 24,
    },
    controlButton: {
        padding: 10,
    },
    playPauseButton: {
        marginHorizontal: 20,
    },
    extraControlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    extraControlButton: {
        alignItems: 'center',
    },
    extraControlText: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginTop: 4,
    },
});

export default AudioLecturesScreen;
