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
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const DoubtSolvingScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [askDoubtVisible, setAskDoubtVisible] = useState(false);
    const [doubtDetailVisible, setDoubtDetailVisible] = useState(false);
    const [selectedDoubt, setSelectedDoubt] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [liveSessionVisible, setLiveSessionVisible] = useState(false);

    const categories = ['All', 'General Studies', 'CSAT', 'Optional', 'Essay', 'Interview', 'Current Affairs'];

    // Dummy data for live sessions
    const liveSessions = [
        {
            id: '1',
            title: 'Solving Geography Map-based Questions',
            instructor: 'Dr. Meera Iyer',
            thumbnailPic: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1374&auto=format&fit=crop',
            scheduledFor: 'Today, 7:00 PM',
            participants: 156,
            duration: '1 hour',
            status: 'live',
            category: 'General Studies',
            subject: 'Geography',
        },
        {
            id: '2',
            title: 'Current Affairs Analysis - June 2025',
            instructor: 'Prof. Anand Sharma',
            thumbnailPic: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop',
            scheduledFor: 'Tomorrow, 6:00 PM',
            participants: 210,
            duration: '1.5 hours',
            status: 'upcoming',
            category: 'Current Affairs',
            subject: 'Current Affairs',
        },
        {
            id: '3',
            title: 'Economics Concepts Clarification',
            instructor: 'Dr. Priya Mehta',
            thumbnailPic: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1472&auto=format&fit=crop',
            scheduledFor: 'June 20, 2025, 5:00 PM',
            participants: 185,
            duration: '2 hours',
            status: 'upcoming',
            category: 'General Studies',
            subject: 'Economics',
        },
        {
            id: '4',
            title: 'Indian Polity - Constitutional Amendments',
            instructor: 'Dr. Rajesh Kumar',
            thumbnailPic: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1470&auto=format&fit=crop',
            scheduledFor: 'Today, 9:00 PM',
            participants: 210,
            duration: '1 hour',
            status: 'live',
            category: 'General Studies',
            subject: 'Polity',
        },
    ];

    // Dummy data for doubts
    const doubts = [
        {
            id: '1',
            title: 'Difference between Article 368 and Basic Structure Doctrine?',
            description:
                'I am confused about the relationship between Article 368 of the Constitution and the Basic Structure Doctrine. Can someone explain how they relate to each other and their significance in constitutional amendments?',
            category: 'General Studies',
            subject: 'Indian Polity',
            askedBy: 'Rahul Sharma',
            askedOn: 'June 15, 2025',
            status: 'answered',
            upvotes: 45,
            views: 320,
            answers: 3,
            profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop',
            isLive: false,
        },
        {
            id: '2',
            title: 'How to approach UPSC Essay paper?',
            description:
                'I am struggling with the essay paper. What should be the structure and approach for writing a good essay in the UPSC mains examination?',
            category: 'Essay',
            subject: 'Essay Writing',
            askedBy: 'Priya Patel',
            askedOn: 'June 14, 2025',
            status: 'answered',
            upvotes: 62,
            views: 480,
            answers: 5,
            profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop',
            isLive: false,
        },
        {
            id: '4',
            title: 'Understanding Carbon Credits and Carbon Trading',
            description:
                'Can someone explain the concept of carbon credits and carbon trading in detail? How is it relevant for UPSC examination?',
            category: 'General Studies',
            subject: 'Environment',
            askedBy: 'Vikram Singh',
            askedOn: 'June 12, 2025',
            status: 'answered',
            upvotes: 38,
            views: 290,
            answers: 2,
            profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop',
            isLive: false,
        },
        {
            id: '6',
            title: 'How to solve CSAT comprehension questions efficiently?',
            description:
                'I am taking too much time in solving CSAT comprehension questions. Any tips or strategies to improve speed and accuracy?',
            category: 'CSAT',
            subject: 'Aptitude',
            askedBy: 'Neha Gupta',
            askedOn: 'June 10, 2025',
            status: 'answered',
            upvotes: 52,
            views: 410,
            answers: 4,
            profilePic: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop',
            isLive: false,
        },
        {
            id: '7',
            title: 'Sociology Optional: Theoretical Perspectives',
            description:
                'I am preparing for Sociology optional. Can someone explain the major theoretical perspectives in Sociology and their relevance for UPSC?',
            category: 'Optional',
            subject: 'Sociology',
            askedBy: 'Amit Kumar',
            askedOn: 'June 8, 2025',
            status: 'answered',
            upvotes: 35,
            views: 280,
            answers: 3,
            profilePic: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop',
            isLive: false,
        },
        {
            id: '8',
            title: 'Tips for UPSC Interview preparation',
            description:
                'I have cleared the UPSC Mains and now preparing for the interview. What should be my approach and how should I prepare for it?',
            category: 'Interview',
            subject: 'Personality Test',
            askedBy: 'Sanjay Verma',
            askedOn: 'June 5, 2025',
            status: 'answered',
            upvotes: 75,
            views: 620,
            answers: 6,
            profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop',
            isLive: false,
        },
    ];

    const filteredDoubts = doubts.filter((doubt) => {
        const matchesSearch =
            doubt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (doubt.description && doubt.description.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'All' || doubt.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const renderCategoryItem = ({ item }, index) => (
        <TouchableOpacity
            key={index}
            style={[styles.categoryButton, selectedCategory === item && styles.selectedCategoryButton]}
            onPress={() => setSelectedCategory(item)}
        >
            <Text style={[styles.categoryButtonText, selectedCategory === item && styles.selectedCategoryButtonText]}>
                {item}
            </Text>
        </TouchableOpacity>
    );

    const openDoubtDetail = (doubt) => {
        setSelectedDoubt(doubt);
        setDoubtDetailVisible(true);
    };

    const openLiveSession = (session) => {
        setSelectedDoubt(session);
        setLiveSessionVisible(true);
    };

    const renderDoubtItem = ({ item }, index) => {
        if (item.isLive) {
            return null; // We're handling live sessions separately now
        }

        return (
            <TouchableOpacity style={styles.doubtCard} key={index} onPress={() => openDoubtDetail(item)}>
                <View style={styles.doubtHeader}>
                    <Image source={{ uri: item.profilePic }} style={styles.profilePic} resizeMode="cover" />
                    <View style={styles.doubtHeaderContent}>
                        <Text style={styles.doubtTitle} numberOfLines={2}>
                            {item.title}
                        </Text>
                        <View style={styles.doubtMeta}>
                            <Text style={styles.doubtAuthor}>{item.askedBy}</Text>
                            <Text style={styles.doubtDate}>{item.askedOn}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.doubtDescription} numberOfLines={2}>
                    {item.description}
                </Text>

                <View style={styles.doubtFooter}>
                    <View style={styles.doubtStats}>
                        <View style={styles.doubtStatItem}>
                            <MaterialIcons name="thumb-up" size={14} color="#666" />
                            <Text style={styles.doubtStatText}>{item.upvotes}</Text>
                        </View>
                        <View style={styles.doubtStatItem}>
                            <MaterialIcons name="visibility" size={14} color="#666" />
                            <Text style={styles.doubtStatText}>{item.views}</Text>
                        </View>
                        <View style={styles.doubtStatItem}>
                            <MaterialIcons name="question-answer" size={14} color="#666" />
                            <Text style={styles.doubtStatText}>{item.answers}</Text>
                        </View>
                    </View>

                    <View style={styles.doubtTags}>
                        <View style={styles.doubtTag}>
                            <Text style={styles.doubtTagText}>{item.category}</Text>
                        </View>
                        {item.subject && (
                            <View style={styles.doubtTag}>
                                <Text style={styles.doubtTagText}>{item.subject}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Doubt Solving</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="filter-list" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search doubts and questions..."
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

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Live Sessions Section */}
                <View style={styles.liveSessionsHeader}>
                    <View style={styles.sectionTitleContainer}>
                        <MaterialIcons name="live-tv" size={20} color="#FF3B30" style={styles.sectionTitleIcon} />
                        <Text style={styles.liveSessionsTitle}>Live Doubt Solving Sessions</Text>
                    </View>
                    <TouchableOpacity style={styles.viewAllButton}>
                        <Text style={styles.viewAllText}>View All</Text>
                        <MaterialIcons name="chevron-right" size={20} color="#4361EE" />
                    </TouchableOpacity>
                </View>

                <View style={styles.liveSessionsRow}>
                    <TouchableOpacity style={styles.liveSessionCard} onPress={() => openLiveSession(liveSessions[0])}>
                        <ImageBackground
                            source={{ uri: liveSessions[0].thumbnailPic }}
                            style={styles.liveSessionImage}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={styles.liveNowBadge}>
                                <View style={styles.liveDot} />
                                <Text style={styles.liveNowText}>LIVE NOW</Text>
                            </View>
                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.liveSessionGradient}>
                                <Text style={styles.liveSessionCardTitle}>{liveSessions[0].title}</Text>
                                <Text style={styles.liveSessionCardInstructor}>{liveSessions[0].instructor}</Text>
                                <View style={styles.liveSessionCardStats}>
                                    <Text style={styles.liveSessionCardParticipants}>{liveSessions[0].participants} participants</Text>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.liveSessionCard} onPress={() => openLiveSession(liveSessions[1])}>
                        <ImageBackground
                            source={{ uri: liveSessions[1].thumbnailPic }}
                            style={styles.liveSessionImage}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            <View style={styles.upcomingBadge}>
                                <Text style={styles.upcomingText}>UPCOMING</Text>
                            </View>
                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.liveSessionGradient}>
                                <Text style={styles.liveSessionCardTitle}>{liveSessions[1].title}</Text>
                                <Text style={styles.liveSessionCardInstructor}>{liveSessions[1].instructor}</Text>
                                <View style={styles.liveSessionCardStats}>
                                    <Text style={styles.liveSessionCardTime}>{liveSessions[1].scheduledFor}</Text>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                {/* Recent Doubts Section */}
                <View style={styles.doubtsHeader}>
                    <View style={styles.sectionTitleContainer}>
                        <MaterialIcons name="question-answer" size={20} color="#333" style={styles.sectionTitleIcon} />
                        <Text style={styles.doubtsTitle}>Recent Doubts</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.askDoubtButton}
                        onPress={() => {
                            if (isAuthenticated) {
                                setAskDoubtVisible(true);
                            } else {
                                navigation.navigate('Login');
                            }
                        }}
                    >
                        <MaterialIcons name="add" size={20} color="#fff" />
                        <Text style={styles.askDoubtButtonText}>Ask Doubt</Text>
                    </TouchableOpacity>
                </View>

                {filteredDoubts.map((item) => renderDoubtItem({ item }))}
            </ScrollView>

            {/* Ask Doubt Modal */}
            <Modal
                visible={askDoubtVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setAskDoubtVisible(false)}
            >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContainer}>
                    <View style={styles.askDoubtModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Ask a Doubt</Text>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setAskDoubtVisible(false)}>
                                <MaterialIcons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalContent}>
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Title</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder="Enter a specific title for your doubt"
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Description</Text>
                                <TextInput
                                    style={[styles.formInput, styles.formTextarea]}
                                    placeholder="Describe your doubt in detail"
                                    placeholderTextColor="#999"
                                    multiline={true}
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Category</Text>
                                <View style={styles.formSelect}>
                                    <Text style={styles.formSelectText}>Select a category</Text>
                                    <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Subject</Text>
                                <View style={styles.formSelect}>
                                    <Text style={styles.formSelectText}>Select a subject</Text>
                                    <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Submit Doubt</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* Doubt Detail Modal */}
            <Modal
                visible={doubtDetailVisible}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setDoubtDetailVisible(false)}
            >
                <SafeAreaView style={styles.doubtDetailContainer}>
                    <View style={styles.doubtDetailHeader}>
                        <TouchableOpacity style={styles.doubtDetailBackButton} onPress={() => setDoubtDetailVisible(false)}>
                            <MaterialIcons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.doubtDetailTitle} numberOfLines={1}>
                            Doubt Detail
                        </Text>
                        <TouchableOpacity style={styles.doubtDetailShareButton}>
                            <MaterialIcons name="share" size={24} color="#4361EE" />
                        </TouchableOpacity>
                    </View>

                    {selectedDoubt &&
                        (
                            <ScrollView style={styles.doubtDetailContent}>
                                <View style={styles.doubtDetailQuestion}>
                                    <View style={styles.doubtDetailQuestionHeader}>
                                        <Image source={{ uri: selectedDoubt.profilePic }} style={styles.doubtDetailProfilePic} />
                                        <View style={styles.doubtDetailQuestionMeta}>
                                            <Text style={styles.doubtDetailQuestionAuthor}>{selectedDoubt.askedBy}</Text>
                                            <Text style={styles.doubtDetailQuestionDate}>{selectedDoubt.askedOn}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.doubtDetailQuestionTitle}>{selectedDoubt.title}</Text>
                                    <Text style={styles.doubtDetailQuestionDescription}>{selectedDoubt.description}</Text>

                                    <View style={styles.doubtDetailTags}>
                                        <View style={styles.doubtDetailTag}>
                                            <Text style={styles.doubtDetailTagText}>{selectedDoubt.category}</Text>
                                        </View>
                                        <View style={styles.doubtDetailTag}>
                                            <Text style={styles.doubtDetailTagText}>{selectedDoubt.subject}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.doubtDetailActions}>
                                        <TouchableOpacity style={styles.doubtDetailAction}>
                                            <MaterialIcons name="thumb-up-off-alt" size={20} color="#666" />
                                            <Text style={styles.doubtDetailActionText}>Upvote</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.doubtDetailAction}>
                                            <MaterialIcons name="bookmark-border" size={20} color="#666" />
                                            <Text style={styles.doubtDetailActionText}>Save</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.doubtDetailAction}>
                                            <MaterialIcons name="share" size={20} color="#666" />
                                            <Text style={styles.doubtDetailActionText}>Share</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.doubtDetailAnswersHeader}>
                                    <Text style={styles.doubtDetailAnswersTitle}>{selectedDoubt.answers} Answers</Text>
                                    <TouchableOpacity style={styles.sortButton}>
                                        <MaterialIcons name="sort" size={20} color="#4361EE" />
                                        <Text style={styles.sortButtonText}>Sort by</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Dummy answers */}
                                <View style={styles.doubtDetailAnswer}>
                                    <View style={styles.doubtDetailAnswerHeader}>
                                        <Image source={{ uri: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop' }} style={styles.doubtDetailProfilePic} />
                                        <View style={styles.doubtDetailAnswerMeta}>
                                            <Text style={styles.doubtDetailAnswerAuthor}>Dr. Rajesh Kumar</Text>
                                            <Text style={styles.doubtDetailAnswerDate}>June 16, 2025</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.doubtDetailAnswerContent}>
                                        Article 368 of the Indian Constitution deals with the power of Parliament to amend the Constitution
                                        and the procedure for such amendment. The Basic Structure Doctrine, on the other hand, is a judicial
                                        principle developed by the Supreme Court in the landmark Kesavananda Bharati case (1973).
                                        {`

`}
                                        While Article 368 gives Parliament the power to amend the Constitution, the Basic Structure Doctrine
                                        limits this power by stating that Parliament cannot amend the 'basic structure' or 'basic features' of
                                        the Constitution. The Supreme Court has identified several features as part of the basic structure,
                                        including federalism, secularism, democracy, republican form of government, separation of powers, etc.\

                                        In essence, Article 368 provides the procedure for amendment, while the Basic Structure Doctrine sets
                                        the limits on the amending power.
                                    </Text>

                                    <View style={styles.doubtDetailAnswerActions}>
                                        <TouchableOpacity style={styles.doubtDetailAction}>
                                            <MaterialIcons name="thumb-up-off-alt" size={20} color="#666" />
                                            <Text style={styles.doubtDetailActionText}>Upvote (32)</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.doubtDetailAction}>
                                            <MaterialIcons name="comment" size={20} color="#666" />
                                            <Text style={styles.doubtDetailActionText}>Comment</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.doubtDetailAnswer}>
                                    <View style={styles.doubtDetailAnswerHeader}>
                                        <Image source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop' }} style={styles.doubtDetailProfilePic} />
                                        <View style={styles.doubtDetailAnswerMeta}>
                                            <Text style={styles.doubtDetailAnswerAuthor}>Prof. Anand Sharma</Text>
                                            <Text style={styles.doubtDetailAnswerDate}>June 15, 2025</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.doubtDetailAnswerContent}>
                                        To add to the previous answer, it's important to note that the Basic Structure Doctrine emerged from a
                                        series of cases, with Kesavananda Bharati v. State of Kerala (1973) being the most significant one. In
                                        this case, a 13-judge bench of the Supreme Court held (by a 7:6 majority) that while Parliament has
                                        the power to amend any part of the Constitution, it cannot alter the basic structure or framework of
                                        the Constitution.

                                        This doctrine has been reaffirmed in several subsequent cases like Indira Gandhi v. Raj Narain (1975),
                                        Minerva Mills v. Union of India (1980), etc.

                                        For UPSC, remember that this doctrine is a judge-made principle and is not explicitly mentioned in the
                                        Constitution itself.
                                    </Text>

                                    <View style={styles.doubtDetailAnswerActions}>
                                        <TouchableOpacity style={styles.doubtDetailAction}>
                                            <MaterialIcons name="thumb-up-off-alt" size={20} color="#666" />
                                            <Text style={styles.doubtDetailActionText}>Upvote (18)</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.doubtDetailAction}>
                                            <MaterialIcons name="comment" size={20} color="#666" />
                                            <Text style={styles.doubtDetailActionText}>Comment</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Add Answer Section */}
                                <View style={styles.addAnswerSection}>
                                    <Text style={styles.addAnswerTitle}>Add Your Answer</Text>
                                    <TextInput
                                        style={styles.addAnswerInput}
                                        placeholder="Write your answer here..."
                                        placeholderTextColor="#999"
                                        multiline={true}
                                        numberOfLines={6}
                                        textAlignVertical="top"
                                    />
                                    <TouchableOpacity style={styles.postAnswerButton}>
                                        <Text style={styles.postAnswerButtonText}>Post Answer</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        )}
                </SafeAreaView>
            </Modal>

            {/* Live Session Modal */}
            <Modal
                visible={liveSessionVisible}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setLiveSessionVisible(false)}
            >
                <SafeAreaView style={styles.liveSessionDetailContainer}>
                    <View style={styles.liveSessionDetailHeader}>
                        <TouchableOpacity style={styles.liveSessionDetailBackButton} onPress={() => setLiveSessionVisible(false)}>
                            <MaterialIcons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.liveSessionDetailTitle} numberOfLines={1}>
                            Live Session
                        </Text>
                        <TouchableOpacity style={styles.liveSessionDetailShareButton}>
                            <MaterialIcons name="share" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {selectedDoubt &&
                        (
                            <View style={styles.liveSessionDetailContent}>
                                <View style={styles.videoContainer}>
                                    <Image
                                        source={{ uri: selectedDoubt.thumbnailPic }}
                                        style={styles.videoPlaceholder}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.videoPlayButton}>
                                        <MaterialIcons name="play-arrow" size={40} color="#fff" />
                                    </View>

                                    {selectedDoubt.status === 'live' ? (
                                        <View style={styles.liveIndicator}>
                                            <View style={styles.liveDot} />
                                            <Text style={styles.liveIndicatorText}>LIVE</Text>
                                        </View>
                                    ) : (
                                        <View style={styles.upcomingIndicator}>
                                            <Text style={styles.upcomingIndicatorText}>Starts in 2 hours</Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.liveSessionDetailInfo}>
                                    <Text style={styles.liveSessionDetailInfoTitle}>{selectedDoubt.title}</Text>
                                    <Text style={styles.liveSessionDetailInfoInstructor}>
                                        <MaterialIcons name="person" size={16} color="#666" /> {selectedDoubt.instructor}
                                    </Text>

                                    <View style={styles.liveSessionDetailInfoStats}>
                                        <View style={styles.liveSessionDetailInfoStat}>
                                            <MaterialIcons name="access-time" size={16} color="#666" />
                                            <Text style={styles.liveSessionDetailInfoStatText}>{selectedDoubt.scheduledFor}</Text>
                                        </View>
                                        <View style={styles.liveSessionDetailInfoStat}>
                                            <MaterialIcons name="people" size={16} color="#666" />
                                            <Text style={styles.liveSessionDetailInfoStatText}>{selectedDoubt.participants} participants</Text>
                                        </View>
                                        <View style={styles.liveSessionDetailInfoStat}>
                                            <MaterialIcons name="timelapse" size={16} color="#666" />
                                            <Text style={styles.liveSessionDetailInfoStatText}>{selectedDoubt.duration}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.liveSessionDetailActions}>
                                        {selectedDoubt.status === 'live' ? (
                                            <TouchableOpacity style={styles.joinSessionButton}>
                                                <Text style={styles.joinSessionButtonText}>Join Session</Text>
                                                <MaterialIcons name="play-arrow" size={20} color="#fff" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={styles.setReminderButton}>
                                                <Text style={styles.setReminderButtonText}>Set Reminder</Text>
                                                <MaterialIcons name="notifications" size={20} color="#fff" />
                                            </TouchableOpacity>
                                        )}

                                        <TouchableOpacity style={styles.shareSessionButton}>
                                            <MaterialIcons name="share" size={24} color="#4361EE" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.liveSessionTabs}>
                                    <TouchableOpacity style={[styles.liveSessionTab, styles.activeTab]}>
                                        <Text style={[styles.liveSessionTabText, styles.activeTabText]}>Description</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.liveSessionTab}>
                                        <Text style={styles.liveSessionTabText}>Chat</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.liveSessionTab}>
                                        <Text style={styles.liveSessionTabText}>Resources</Text>
                                    </TouchableOpacity>
                                </View>

                                <ScrollView style={styles.liveSessionTabContent}>
                                    <Text style={styles.liveSessionDescription}>
                                        {selectedDoubt.description ||
                                            `Join our interactive live session on ${selectedDoubt.title} with ${selectedDoubt.instructor}. This session will cover key concepts, common doubts, and exam-relevant topics. You'll have the opportunity to ask questions in real-time and get immediate clarification from our expert.`}
                                        {''}

                                        Topics to be covered:
                                        {''}
                                        • Understanding key concepts
                                        {''}• Solving previous year questions
                                        {''}• Addressing common misconceptions
                                        {''}• Exam-specific strategies
                                        {''}
                                        Don't miss this opportunity to clear your doubts and enhance your preparation!
                                    </Text>
                                </ScrollView>
                            </View>
                        )}
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
        paddingVertical: 8,
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
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitleIcon: {
        marginRight: 8,
    },
    liveSessionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    liveSessionsTitle: {
        fontSize: isTablet ? 20 : 16,
        fontWeight: 'bold',
        color: '#333',
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        fontSize: isTablet ? 14 : 12,
        color: '#4361EE',
        fontWeight: '600',
    },
    liveSessionsRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    liveSessionCard: {
        flex: 1,
        height: 180,
        marginRight: 12,
        borderRadius: 12,
        overflow: 'hidden',
    },
    liveSessionImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
    },
    liveNowBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF3B30',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        position: 'absolute',
        top: 12,
        left: 12,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginRight: 4,
    },
    liveNowText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    upcomingBadge: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        position: 'absolute',
        top: 12,
        left: 12,
    },
    upcomingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    liveSessionGradient: {
        padding: 12,
        justifyContent: 'flex-end',
    },
    liveSessionCardTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    liveSessionCardInstructor: {
        fontSize: isTablet ? 14 : 12,
        color: '#fff',
        marginBottom: 4,
    },
    liveSessionCardStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveSessionCardParticipants: {
        fontSize: isTablet ? 12 : 10,
        color: '#fff',
    },
    liveSessionCardTime: {
        fontSize: isTablet ? 12 : 10,
        color: '#fff',
    },
    doubtsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    doubtsTitle: {
        fontSize: isTablet ? 20 : 16,
        fontWeight: 'bold',
        color: '#333',
    },
    askDoubtButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    askDoubtButtonText: {
        color: '#fff',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    doubtCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    doubtHeader: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    profilePic: {
        width: isTablet ? 50 : 40,
        height: isTablet ? 50 : 40,
        borderRadius: isTablet ? 25 : 20,
        marginRight: 12,
    },
    doubtHeaderContent: {
        flex: 1,
    },
    doubtTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    doubtMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    doubtAuthor: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginRight: 8,
    },
    doubtDate: {
        fontSize: isTablet ? 12 : 10,
        color: '#999',
    },
    doubtDescription: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginBottom: 12,
        lineHeight: isTablet ? 20 : 18,
    },
    doubtFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    doubtStats: {
        flexDirection: 'row',
    },
    doubtStatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    doubtStatText: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
        marginLeft: 4,
    },
    doubtTags: {
        flexDirection: 'row',
    },
    doubtTag: {
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginLeft: 8,
    },
    doubtTagText: {
        color: '#4361EE',
        fontSize: isTablet ? 12 : 10,
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    askDoubtModal: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
        height: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#333',
    },
    modalCloseButton: {
        padding: 8,
    },
    modalContent: {
        padding: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    formLabel: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    formInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: isTablet ? 16 : 14,
        color: '#333',
        backgroundColor: '#f9f9f9',
    },
    formTextarea: {
        height: 120,
        textAlignVertical: 'top',
    },
    formSelect: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: isTablet ? 16 : 14,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formSelectText: {
        color: '#999',
        fontSize: isTablet ? 16 : 14,
    },
    submitButton: {
        backgroundColor: '#4361EE',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14,
    },
    doubtDetailContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    doubtDetailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    doubtDetailBackButton: {
        padding: 8,
    },
    doubtDetailTitle: {
        flex: 1,
        fontSize: isTablet ? 18 : 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    doubtDetailShareButton: {
        padding: 8,
    },
    doubtDetailContent: {
        flex: 1,
    },
    doubtDetailQuestion: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    doubtDetailQuestionHeader: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    doubtDetailProfilePic: {
        width: isTablet ? 50 : 40,
        height: isTablet ? 50 : 40,
        borderRadius: isTablet ? 25 : 20,
        marginRight: 12,
    },
    doubtDetailQuestionMeta: {
        flex: 1,
        justifyContent: 'center',
    },
    doubtDetailQuestionAuthor: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    doubtDetailQuestionDate: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
    },
    doubtDetailQuestionTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    doubtDetailQuestionDescription: {
        fontSize: isTablet ? 16 : 14,
        color: '#333',
        lineHeight: isTablet ? 24 : 20,
        marginBottom: 16,
    },
    doubtDetailTags: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    doubtDetailTag: {
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        marginRight: 8,
    },
    doubtDetailTagText: {
        color: '#4361EE',
        fontSize: isTablet ? 14 : 12,
        fontWeight: '500',
    },
    doubtDetailActions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    doubtDetailAction: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    doubtDetailActionText: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginLeft: 4,
    },
    doubtDetailAnswersHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#f9f9f9',
    },
    doubtDetailAnswersTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortButtonText: {
        fontSize: isTablet ? 14 : 12,
        color: '#4361EE',
        marginLeft: 4,
    },
    doubtDetailAnswer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    doubtDetailAnswerHeader: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    doubtDetailAnswerMeta: {
        flex: 1,
        justifyContent: 'center',
    },
    doubtDetailAnswerAuthor: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    doubtDetailAnswerDate: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
    },
    doubtDetailAnswerContent: {
        fontSize: isTablet ? 16 : 14,
        color: '#333',
        lineHeight: isTablet ? 24 : 20,
        marginBottom: 16,
    },
    doubtDetailAnswerActions: {
        flexDirection: 'row',
    },
    addAnswerSection: {
        padding: 16,
    },
    addAnswerTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    addAnswerInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: isTablet ? 16 : 14,
        color: '#333',
        backgroundColor: '#f9f9f9',
        height: 150,
        textAlignVertical: 'top',
    },
    postAnswerButton: {
        backgroundColor: '#4361EE',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    postAnswerButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14,
    },
    liveSessionDetailContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    liveSessionDetailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#333',
    },
    liveSessionDetailBackButton: {
        padding: 8,
    },
    liveSessionDetailTitle: {
        flex: 1,
        fontSize: isTablet ? 18 : 16,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    liveSessionDetailShareButton: {
        padding: 8,
    },
    liveSessionDetailContent: {
        flex: 1,
    },
    videoContainer: {
        width: '100%',
        height: isTablet ? 400 : 200,
        backgroundColor: '#000',
        position: 'relative',
    },
    videoPlaceholder: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
    },
    videoPlayButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -30 }, { translateY: -30 }],
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    liveIndicator: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: 'rgba(255,0,0,0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveIndicatorText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    upcomingIndicator: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    upcomingIndicatorText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    liveSessionDetailInfo: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    liveSessionDetailInfoTitle: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    liveSessionDetailInfoInstructor: {
        fontSize: isTablet ? 16 : 14,
        color: '#666',
        marginBottom: 12,
    },
    liveSessionDetailInfoStats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    liveSessionDetailInfoStat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 8,
    },
    liveSessionDetailInfoStatText: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginLeft: 4,
    },
    liveSessionDetailActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    joinSessionButton: {
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginRight: 12,
    },
    joinSessionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14,
        marginRight: 8,
    },
    setReminderButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginRight: 12,
    },
    setReminderButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: isTablet ? 16 : 14,
        marginRight: 8,
    },
    shareSessionButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    liveSessionTabs: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    liveSessionTab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#4361EE',
    },
    liveSessionTabText: {
        fontSize: isTablet ? 16 : 14,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#4361EE',
        fontWeight: 'bold',
    },
    liveSessionTabContent: {
        padding: 16,
        flex: 1,
    },
    liveSessionDescription: {
        fontSize: isTablet ? 16 : 14,
        color: '#333',
        lineHeight: isTablet ? 24 : 20,
    },
});

export default DoubtSolvingScreen;

