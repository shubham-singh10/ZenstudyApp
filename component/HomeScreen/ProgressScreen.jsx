import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    SafeAreaView,
    Platform,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

// Get screen dimensions for responsive design
const { width } = Dimensions.get('window');
const isTablet = width > 768;

// Custom circular progress component
const CircularProgress = ({ progress, size, strokeWidth, color, backgroundColor }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progressOffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{ width: size, height: size }}>
            <View style={{ transform: [{ rotate: '-90deg' }] }}>
                <Svg width={size} height={size}>
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={backgroundColor}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={progressOffset}
                        strokeLinecap="round"
                        fill="transparent"
                    />
                </Svg>
            </View>
            <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>{progress}%</Text>
            </View>
        </View>
    );
};

// Simulated SVG components for the CircularProgress
const Svg = ({ width, height, children }) => <View style={{ width, height }}>{children}</View>;

const Circle = ({ cx, cy, r, stroke, strokeWidth, fill, strokeDasharray, strokeDashoffset, strokeLinecap }) => {
    const diameter = r * 2;
    return (
        <View
            style={{
                width: diameter,
                height: diameter,
                borderRadius: r,
                borderWidth: strokeWidth,
                borderColor: stroke,
                position: 'absolute',
                top: cy - r,
                left: cx - r,
                backgroundColor: fill === 'transparent' ? 'transparent' : fill,
                overflow: 'hidden',
            }}
        >
            {strokeDasharray && (
                <View
                    style={{
                        width: diameter,
                        height: diameter,
                        borderRadius: r,
                        borderWidth: strokeWidth,
                        borderColor: stroke,
                        borderLeftColor: 'transparent',
                        borderBottomColor: 'transparent',
                        position: 'absolute',
                        transform: [{ rotate: `${(strokeDashoffset / strokeDasharray) * 360}deg` }],
                    }}
                />
            )}
        </View>
    );
};

// Bar chart component
const BarChart = ({ data, maxValue, barWidth, barSpacing, barColor, labelColor }) => {
    return (
        <View style={styles.barChartContainer}>
            {data.map((item, index) => (
                <View key={index} style={styles.barContainer}>
                    <View style={styles.barLabelContainer}>
                        <Text style={[styles.barLabel, { color: labelColor }]}>{item.label}</Text>
                    </View>
                    <View style={styles.barWrapper}>
                        <View
                            style={[
                                styles.bar,
                                {
                                    width: `${(item.value / maxValue) * 100}%`,
                                    backgroundColor: barColor,
                                    height: barWidth,
                                    marginRight: barSpacing,
                                },
                            ]}
                        />
                        <Text style={styles.barValue}>{item.value}%</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const ProgressScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // Dummy data for progress
    useEffect(() => {
        setTimeout(() => {
            setUserData({
                name: 'Rahul Sharma',
                profilePic: 'https://via.placeholder.com/150/4361EE/FFFFFF?text=Rahul',
                overallProgress: 68,
                streak: 15,
                totalHours: 120,
                rank: 128,
                subjects: [
                    { id: 1, name: 'History', progress: 75, color: '#4361EE' },
                    { id: 2, name: 'Geography', progress: 60, color: '#FF6B6B' },
                    { id: 3, name: 'Polity', progress: 85, color: '#4ECDC4' },
                    { id: 4, name: 'Economics', progress: 45, color: '#FFD166' },
                    { id: 5, name: 'Science', progress: 55, color: '#6A0572' },
                ],
                recentActivities: [
                    {
                        id: 1,
                        type: 'test',
                        title: 'Mock Test: UPSC Prelims Paper I',
                        date: 'Yesterday',
                        score: '85/100',
                        icon: 'assignment',
                        color: '#FF6B6B',
                    },
                    {
                        id: 2,
                        type: 'course',
                        title: 'Completed: Indian Polity Module 3',
                        date: '2 days ago',
                        score: '100%',
                        icon: 'play-circle-filled',
                        color: '#4ECDC4',
                    },
                    {
                        id: 3,
                        type: 'quiz',
                        title: 'Daily Quiz: Current Affairs',
                        date: '3 days ago',
                        score: '8/10',
                        icon: 'help-outline',
                        color: '#FFD166',
                    },
                ],
                weeklyActivity: [
                    { day: 'Mon', hours: 2.5 },
                    { day: 'Tue', hours: 3.0 },
                    { day: 'Wed', hours: 1.5 },
                    { day: 'Thu', hours: 4.0 },
                    { day: 'Fri', hours: 2.0 },
                    { day: 'Sat', hours: 3.5 },
                    { day: 'Sun', hours: 1.0 },
                ],
                subjectPerformance: [
                    { label: 'History', value: 75 },
                    { label: 'Geography', value: 60 },
                    { label: 'Polity', value: 85 },
                    { label: 'Economics', value: 45 },
                    { label: 'Science', value: 55 },
                ],
                testScores: [
                    { test: 'Mock Test 1', score: 65 },
                    { test: 'Mock Test 2', score: 72 },
                    { test: 'Mock Test 3', score: 68 },
                    { test: 'Mock Test 4', score: 75 },
                    { test: 'Mock Test 5', score: 82 },
                ],
                achievements: [
                    { id: 1, title: 'Perfect Score', description: 'Score 100% in any module', completed: true },
                    { id: 2, title: 'Study Streak', description: 'Maintain a 15-day study streak', completed: true },
                    { id: 3, title: 'Quiz Master', description: 'Complete 50 daily quizzes', completed: false, progress: 35 },
                    {
                        id: 4,
                        title: 'Test Champion',
                        description: 'Score above 80% in 5 mock tests',
                        completed: false,
                        progress: 3,
                    },
                ],
            });
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <MaterialIcons name="insights" size={48} color="#4361EE" />
                <Text style={styles.loadingText}>Loading progress data...</Text>
            </View>
        );
    }

    const renderOverviewTab = () => (
        <View style={styles.tabContent}>
            {/* Overall Progress Card */}
            <View style={styles.overallProgressCard}>
                <LinearGradient
                    colors={['#4568DC', '#B06AB3']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.overallProgressGradient}
                >
                    <View style={styles.overallProgressContent}>
                        <View style={styles.overallProgressLeft}>
                            <Text style={styles.overallProgressTitle}>Overall Progress</Text>
                            <Text style={styles.overallProgressValue}>{userData.overallProgress}%</Text>
                            <Text style={styles.overallProgressSubtitle}>Keep going! You're doing great.</Text>
                        </View>
                        <View style={styles.overallProgressRight}>
                            <View style={styles.progressCircleContainer}>
                                <View style={styles.progressCircleOuter}>
                                    <View
                                        style={[
                                            styles.progressCircleInner,
                                            { width: `${userData.overallProgress}%`, height: `${userData.overallProgress}%` },
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressCircleText}>{userData.overallProgress}%</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
                <View style={styles.statsCard}>
                    <View style={[styles.statsIconContainer, { backgroundColor: '#E6F0FF' }]}>
                        <MaterialIcons name="local-fire-department" size={20} color="#4361EE" />
                    </View>
                    <View>
                        <Text style={styles.statsValue}>{userData.streak} days</Text>
                        <Text style={styles.statsLabel}>Study Streak</Text>
                    </View>
                </View>

                <View style={styles.statsCard}>
                    <View style={[styles.statsIconContainer, { backgroundColor: '#FFF2E6' }]}>
                        <MaterialIcons name="access-time" size={20} color="#FF8C00" />
                    </View>
                    <View>
                        <Text style={styles.statsValue}>{userData.totalHours} hrs</Text>
                        <Text style={styles.statsLabel}>Total Study</Text>
                    </View>
                </View>

                <View style={styles.statsCard}>
                    <View style={[styles.statsIconContainer, { backgroundColor: '#E6FFE6' }]}>
                        <MaterialIcons name="leaderboard" size={20} color="#008000" />
                    </View>
                    <View>
                        <Text style={styles.statsValue}>#{userData.rank}</Text>
                        <Text style={styles.statsLabel}>Your Rank</Text>
                    </View>
                </View>
            </View>

            {/* Subject Progress */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Subject Progress</Text>
                    <TouchableOpacity onPress={() => setActiveTab('subjects')}>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.subjectsContainer}>
                    {userData.subjects.slice(0, 4).map((subject) => (
                        <View key={subject.id} style={styles.subjectCard}>
                            <View style={styles.subjectHeader}>
                                <Text style={styles.subjectName}>{subject.name}</Text>
                                <Text style={styles.subjectProgress}>{subject.progress}%</Text>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <View style={styles.progressBarBackground}>
                                    <View
                                        style={[styles.progressBarFill, { width: `${subject.progress}%`, backgroundColor: subject.color }]}
                                    />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <TouchableOpacity onPress={() => setActiveTab('activity')}>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.activitiesContainer}>
                    {userData.recentActivities.map((activity) => (
                        <View key={activity.id} style={styles.activityCard}>
                            <View style={[styles.activityIconContainer, { backgroundColor: `${activity.color}20` }]}>
                                <MaterialIcons name={activity.icon} size={24} color={activity.color} />
                            </View>
                            <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>{activity.title}</Text>
                                <Text style={styles.activityDate}>{activity.date}</Text>
                            </View>
                            <View style={styles.activityScore}>
                                <Text style={styles.activityScoreText}>{activity.score}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Weekly Activity */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Weekly Study Hours</Text>
                <View style={styles.weeklyActivityCard}>
                    <View style={styles.weeklyActivityChart}>
                        {userData.weeklyActivity.map((day, index) => (
                            <View key={index} style={styles.weeklyActivityBar}>
                                <View style={[styles.weeklyActivityBarFill, { height: `${(day.hours / 4) * 100}%` }]} />
                                <Text style={styles.weeklyActivityDay}>{day.day}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.weeklyActivityLegend}>
                        <View style={styles.weeklyActivityLegendItem}>
                            <View style={styles.weeklyActivityLegendColor} />
                            <Text style={styles.weeklyActivityLegendText}>Study Hours</Text>
                        </View>
                        <Text style={styles.weeklyActivityTotal}>
                            Total: {userData.weeklyActivity.reduce((sum, day) => sum + day.hours, 0)} hours
                        </Text>
                    </View>
                </View>
            </View>

            {/* Achievements */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Achievements</Text>
                    <TouchableOpacity onPress={() => setActiveTab('achievements')}>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.achievementsContainer}>
                    {userData.achievements.slice(0, 2).map((achievement) => (
                        <View
                            key={achievement.id}
                            style={[styles.achievementCard, achievement.completed ? styles.achievementCompleted : {}]}
                        >
                            <View style={styles.achievementIcon}>
                                <MaterialIcons
                                    name={achievement.completed ? 'emoji-events' : 'hourglass-empty'}
                                    size={24}
                                    color={achievement.completed ? '#FFD700' : '#999'}
                                />
                            </View>
                            <View style={styles.achievementContent}>
                                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                                {!achievement.completed && achievement.progress && (
                                    <View style={styles.achievementProgressContainer}>
                                        <View style={styles.achievementProgressBar}>
                                            <View
                                                style={[
                                                    styles.achievementProgressFill,
                                                    {
                                                        width: `${achievement.title === 'Quiz Master'
                                                                ? (achievement.progress / 50) * 100
                                                                : (achievement.progress / 5) * 100
                                                            }%`,
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <Text style={styles.achievementProgressText}>
                                            {achievement.progress}/{achievement.title === 'Quiz Master' ? 50 : 5}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            {achievement.completed && (
                                <View style={styles.achievementCompletedBadge}>
                                    <MaterialIcons name="check" size={16} color="#fff" />
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    const renderSubjectsTab = () => (
        <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Subject Performance</Text>

            <View style={styles.barChartSection}>
                <BarChart
                    data={userData.subjectPerformance}
                    maxValue={100}
                    barWidth={20}
                    barSpacing={8}
                    barColor="#4361EE"
                    labelColor="#333"
                />
            </View>

            <Text style={styles.tabSubtitle}>Detailed Subject Progress</Text>

            <View style={styles.detailedSubjectsContainer}>
                {userData.subjects.map((subject) => (
                    <View key={subject.id} style={styles.detailedSubjectCard}>
                        <View style={styles.detailedSubjectHeader}>
                            <View style={[styles.detailedSubjectIconContainer, { backgroundColor: `${subject.color}20` }]}>
                                <MaterialIcons
                                    name={
                                        subject.name === 'History'
                                            ? 'history'
                                            : subject.name === 'Geography'
                                                ? 'public'
                                                : subject.name === 'Polity'
                                                    ? 'account-balance'
                                                    : subject.name === 'Economics'
                                                        ? 'trending-up'
                                                        : 'science'
                                    }
                                    size={24}
                                    color={subject.color}
                                />
                            </View>
                            <View style={styles.detailedSubjectInfo}>
                                <Text style={styles.detailedSubjectName}>{subject.name}</Text>
                                <View style={styles.detailedProgressBarContainer}>
                                    <View style={styles.detailedProgressBarBackground}>
                                        <View
                                            style={[
                                                styles.detailedProgressBarFill,
                                                { width: `${subject.progress}%`, backgroundColor: subject.color },
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.detailedSubjectProgress}>{subject.progress}%</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.detailedSubjectButton}>
                                <Text style={styles.detailedSubjectButtonText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>Recommendations</Text>
                <View style={styles.recommendationCard}>
                    <MaterialIcons name="lightbulb" size={24} color="#FFD700" style={styles.recommendationIcon} />
                    <View style={styles.recommendationContent}>
                        <Text style={styles.recommendationText}>
                            Focus on Economics to improve your overall score. We recommend completing the "Economic Fundamentals"
                            module.
                        </Text>
                        <TouchableOpacity style={styles.recommendationButton}>
                            <Text style={styles.recommendationButtonText}>Start Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderActivityTab = () => (
        <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Activity History</Text>

            <View style={styles.activityFilterContainer}>
                <TouchableOpacity style={[styles.activityFilterButton, styles.activityFilterButtonActive]}>
                    <Text style={styles.activityFilterButtonTextActive}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.activityFilterButton}>
                    <Text style={styles.activityFilterButtonText}>Tests</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.activityFilterButton}>
                    <Text style={styles.activityFilterButtonText}>Courses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.activityFilterButton}>
                    <Text style={styles.activityFilterButtonText}>Quizzes</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.activityTimelineContainer}>
                <View style={styles.activityTimeline}>
                    <View style={styles.activityTimelineLine} />

                    {[
                        ...userData.recentActivities,
                        {
                            id: 4,
                            type: 'course',
                            title: 'Started: Geography Module 2',
                            date: '4 days ago',
                            score: 'In Progress',
                            icon: 'play-circle-filled',
                            color: '#4ECDC4',
                        },
                        {
                            id: 5,
                            type: 'quiz',
                            title: 'Weekly Quiz: Indian History',
                            date: '5 days ago',
                            score: '7/10',
                            icon: 'help-outline',
                            color: '#FFD166',
                        },
                        {
                            id: 6,
                            type: 'test',
                            title: 'Mock Test: CSAT Paper',
                            date: '1 week ago',
                            score: '72/100',
                            icon: 'assignment',
                            color: '#FF6B6B',
                        },
                    ].map((activity) => (
                        <View key={activity.id} style={styles.activityTimelineItem}>
                            <View style={[styles.activityTimelineDot, { backgroundColor: activity.color }]} />
                            <View style={styles.activityTimelineCard}>
                                <View style={styles.activityTimelineHeader}>
                                    <View style={[styles.activityTimelineIconContainer, { backgroundColor: `${activity.color}20` }]}>
                                        <MaterialIcons name={activity.icon} size={20} color={activity.color} />
                                    </View>
                                    <Text style={styles.activityTimelineDate}>{activity.date}</Text>
                                </View>
                                <Text style={styles.activityTimelineTitle}>{activity.title}</Text>
                                <View style={styles.activityTimelineFooter}>
                                    <Text style={styles.activityTimelineScore}>Score: {activity.score}</Text>
                                    <TouchableOpacity style={styles.activityTimelineButton}>
                                        <Text style={styles.activityTimelineButtonText}>View</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    const renderAchievementsTab = () => (
        <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Your Achievements</Text>

            <View style={styles.achievementStatsContainer}>
                <View style={styles.achievementStatCard}>
                    <Text style={styles.achievementStatValue}>{userData.achievements.filter((a) => a.completed).length}</Text>
                    <Text style={styles.achievementStatLabel}>Completed</Text>
                </View>
                <View style={styles.achievementStatCard}>
                    <Text style={styles.achievementStatValue}>{userData.achievements.filter((a) => !a.completed).length}</Text>
                    <Text style={styles.achievementStatLabel}>In Progress</Text>
                </View>
                <View style={styles.achievementStatCard}>
                    <Text style={styles.achievementStatValue}>{userData.achievements.length}</Text>
                    <Text style={styles.achievementStatLabel}>Total</Text>
                </View>
            </View>

            <View style={styles.achievementListContainer}>
                <Text style={styles.achievementListTitle}>Completed</Text>
                {userData.achievements
                    .filter((a) => a.completed)
                    .map((achievement) => (
                        <View key={achievement.id} style={[styles.achievementListCard, styles.achievementListCardCompleted]}>
                            <View style={styles.achievementListIcon}>
                                <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
                            </View>
                            <View style={styles.achievementListContent}>
                                <Text style={styles.achievementListName}>{achievement.title}</Text>
                                <Text style={styles.achievementListDescription}>{achievement.description}</Text>
                            </View>
                            <View style={styles.achievementListBadge}>
                                <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                            </View>
                        </View>
                    ))}

                <Text style={[styles.achievementListTitle, styles.achievementListTitleInProgress]}>In Progress</Text>
                {userData.achievements
                    .filter((a) => !a.completed)
                    .map((achievement) => (
                        <View key={achievement.id} style={styles.achievementListCard}>
                            <View style={styles.achievementListIcon}>
                                <MaterialIcons name="hourglass-empty" size={24} color="#999" />
                            </View>
                            <View style={styles.achievementListContent}>
                                <Text style={styles.achievementListName}>{achievement.title}</Text>
                                <Text style={styles.achievementListDescription}>{achievement.description}</Text>
                                <View style={styles.achievementListProgressContainer}>
                                    <View style={styles.achievementListProgressBar}>
                                        <View
                                            style={[
                                                styles.achievementListProgressFill,
                                                {
                                                    width: `${achievement.title === 'Quiz Master'
                                                            ? (achievement.progress / 50) * 100
                                                            : (achievement.progress / 5) * 100
                                                        }%`,
                                                },
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.achievementListProgressText}>
                                        {achievement.progress}/{achievement.title === 'Quiz Master' ? 50 : 5}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Progress & Analytics</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <MaterialIcons name="share" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* User Info */}
            <View style={styles.userInfoContainer}>
                <Image source={{ uri: userData.profilePic }} style={styles.userAvatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{userData.name}</Text>
                    <View style={styles.userRankContainer}>
                        <MaterialIcons name="leaderboard" size={16} color="#4361EE" />
                        <Text style={styles.userRank}>Rank #{userData.rank}</Text>
                    </View>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
                    onPress={() => setActiveTab('overview')}
                >
                    <MaterialIcons name="dashboard" size={20} color={activeTab === 'overview' ? '#4361EE' : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'subjects' && styles.activeTab]}
                    onPress={() => setActiveTab('subjects')}
                >
                    <MaterialIcons name="subject" size={20} color={activeTab === 'subjects' ? '#4361EE' : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'subjects' && styles.activeTabText]}>Subjects</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'activity' && styles.activeTab]}
                    onPress={() => setActiveTab('activity')}
                >
                    <MaterialIcons name="history" size={20} color={activeTab === 'activity' ? '#4361EE' : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>Activity</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
                    onPress={() => setActiveTab('achievements')}
                >
                    <MaterialIcons name="emoji-events" size={20} color={activeTab === 'achievements' ? '#4361EE' : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>Achievements</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {activeTab === 'overview' && renderOverviewTab()}
                {activeTab === 'subjects' && renderSubjectsTab()}
                {activeTab === 'activity' && renderActivityTab()}
                {activeTab === 'achievements' && renderAchievementsTab()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 16,
        fontSize: isTablet ? 18 : 16,
        color: '#666',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#333',
    },
    shareButton: {
        padding: 8,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    userAvatar: {
        width: isTablet ? 60 : 50,
        height: isTablet ? 60 : 50,
        borderRadius: isTablet ? 30 : 25,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    userRankContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userRank: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginLeft: 4,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: 8,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#4361EE',
    },
    tabText: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginLeft: 4,
    },
    activeTabText: {
        color: '#4361EE',
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    tabContent: {
        padding: 16,
    },
    tabTitle: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    tabSubtitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 24,
        marginBottom: 16,
    },
    overallProgressCard: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    overallProgressGradient: {
        borderRadius: 12,
    },
    overallProgressContent: {
        padding: 16,
        flexDirection: 'row',
    },
    overallProgressLeft: {
        flex: 1,
    },
    overallProgressTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    overallProgressValue: {
        fontSize: isTablet ? 32 : 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    overallProgressSubtitle: {
        fontSize: isTablet ? 14 : 12,
        color: 'rgba(255,255,255,0.8)',
    },
    overallProgressRight: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressCircleContainer: {
        width: isTablet ? 100 : 80,
        height: isTablet ? 100 : 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressCircleOuter: {
        width: isTablet ? 100 : 80,
        height: isTablet ? 100 : 80,
        borderRadius: isTablet ? 50 : 40,
        borderWidth: 8,
        borderColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressCircleInner: {
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    progressCircleText: {
        position: 'absolute',
        fontSize: isTablet ? 20 : 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    progressTextContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statsCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        width: width / 3.5,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    statsIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statsValue: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    statsLabel: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
        textAlign: 'center',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    viewAllText: {
        fontSize: isTablet ? 14 : 12,
        color: '#4361EE',
        fontWeight: '600',
    },
    subjectsContainer: {
        marginBottom: 8,
    },
    subjectCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    subjectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    subjectName: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
        color: '#333',
    },
    subjectProgress: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: 'bold',
        color: '#4361EE',
    },
    progressBarContainer: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarBackground: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    activitiesContainer: {
        marginBottom: 8,
    },
    activityCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    activityIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: isTablet ? 14 : 13,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    activityDate: {
        fontSize: isTablet ? 12 : 11,
        color: '#666',
    },
    activityScore: {
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    activityScoreText: {
        fontSize: isTablet ? 12 : 10,
        fontWeight: '600',
        color: '#4361EE',
    },
    weeklyActivityCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    weeklyActivityChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 150,
        marginBottom: 16,
    },
    weeklyActivityBar: {
        width: 30,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    weeklyActivityBarFill: {
        width: '60%',
        backgroundColor: '#4361EE',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    weeklyActivityDay: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
        marginTop: 8,
    },
    weeklyActivityLegend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    weeklyActivityLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    weeklyActivityLegendColor: {
        width: 12,
        height: 12,
        backgroundColor: '#4361EE',
        borderRadius: 2,
        marginRight: 8,
    },
    weeklyActivityLegendText: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    weeklyActivityTotal: {
        fontSize: isTablet ? 12 : 10,
        fontWeight: '600',
        color: '#333',
    },
    achievementsContainer: {
        marginBottom: 8,
    },
    achievementCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    achievementCompleted: {
        borderLeftWidth: 4,
        borderLeftColor: '#FFD700',
    },
    achievementIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    achievementContent: {
        flex: 1,
    },
    achievementTitle: {
        fontSize: isTablet ? 14 : 13,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    achievementDescription: {
        fontSize: isTablet ? 12 : 11,
        color: '#666',
        marginBottom: 4,
    },
    achievementProgressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    achievementProgressBar: {
        flex: 1,
        height: 4,
        backgroundColor: '#f0f0f0',
        borderRadius: 2,
        marginRight: 8,
    },
    achievementProgressFill: {
        height: '100%',
        backgroundColor: '#4361EE',
        borderRadius: 2,
    },
    achievementProgressText: {
        fontSize: isTablet ? 10 : 9,
        color: '#666',
    },
    achievementCompletedBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    barChartContainer: {
        marginVertical: 16,
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    barLabelContainer: {
        width: 80,
    },
    barLabel: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: '500',
    },
    barWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bar: {
        borderRadius: 4,
    },
    barValue: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
    },
    barChartSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    detailedSubjectsContainer: {
        marginBottom: 24,
    },
    detailedSubjectCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    detailedSubjectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailedSubjectIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    detailedSubjectInfo: {
        flex: 1,
    },
    detailedSubjectName: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    detailedProgressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailedProgressBarBackground: {
        flex: 1,
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginRight: 8,
    },
    detailedProgressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    detailedSubjectProgress: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: 'bold',
        color: '#333',
    },
    detailedSubjectButton: {
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginLeft: 12,
    },
    detailedSubjectButtonText: {
        fontSize: isTablet ? 12 : 10,
        fontWeight: '600',
        color: '#4361EE',
    },
    recommendationsContainer: {
        marginBottom: 24,
    },
    recommendationsTitle: {
        fontSize: isTablet ? 18 : 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    recommendationCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    recommendationIcon: {
        marginRight: 12,
    },
    recommendationContent: {
        flex: 1,
    },
    recommendationText: {
        fontSize: isTablet ? 14 : 12,
        color: '#333',
        marginBottom: 12,
        lineHeight: isTablet ? 20 : 18,
    },
    recommendationButton: {
        backgroundColor: '#4361EE',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    recommendationButtonText: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        color: '#fff',
    },
    activityFilterContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    activityFilterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: '#f0f0f0',
    },
    activityFilterButtonActive: {
        backgroundColor: '#4361EE',
    },
    activityFilterButtonText: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
    },
    activityFilterButtonTextActive: {
        fontSize: isTablet ? 14 : 12,
        color: '#fff',
        fontWeight: '600',
    },
    activityTimelineContainer: {
        marginBottom: 24,
    },
    activityTimeline: {
        position: 'relative',
        paddingLeft: 20,
    },
    activityTimelineLine: {
        position: 'absolute',
        left: 8,
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: '#eee',
    },
    activityTimelineItem: {
        position: 'relative',
        marginBottom: 16,
    },
    activityTimelineDot: {
        position: 'absolute',
        left: -20,
        top: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        zIndex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    activityTimelineCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginLeft: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    activityTimelineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    activityTimelineIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityTimelineDate: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    activityTimelineTitle: {
        fontSize: isTablet ? 14 : 12,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    activityTimelineFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    activityTimelineScore: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    activityTimelineButton: {
        backgroundColor: '#E6F0FF',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    activityTimelineButtonText: {
        fontSize: isTablet ? 12 : 10,
        fontWeight: '600',
        color: '#4361EE',
    },
    achievementStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    achievementStatCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        width: '30%',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    achievementStatValue: {
        fontSize: isTablet ? 24 : 20,
        fontWeight: 'bold',
        color: '#4361EE',
        marginBottom: 4,
    },
    achievementStatLabel: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    achievementListContainer: {
        marginBottom: 24,
    },
    achievementListTitle: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    achievementListTitleInProgress: {
        marginTop: 24,
    },
    achievementListCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    achievementListCardCompleted: {
        borderLeftWidth: 4,
        borderLeftColor: '#FFD700',
    },
    achievementListIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    achievementListContent: {
        flex: 1,
    },
    achievementListName: {
        fontSize: isTablet ? 16 : 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    achievementListDescription: {
        fontSize: isTablet ? 14 : 12,
        color: '#666',
        marginBottom: 8,
    },
    achievementListProgressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    achievementListProgressBar: {
        flex: 1,
        height: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 3,
        marginRight: 8,
    },
    achievementListProgressFill: {
        height: '100%',
        backgroundColor: '#4361EE',
        borderRadius: 3,
    },
    achievementListProgressText: {
        fontSize: isTablet ? 12 : 10,
        color: '#666',
    },
    achievementListBadge: {
        marginLeft: 8,
    },
});

export default ProgressScreen;
