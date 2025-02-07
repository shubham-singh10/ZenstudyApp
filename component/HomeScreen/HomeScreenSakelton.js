import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');
export const HomeScreenSakelton = () => {
    return (

        <View style={skeletonStyle.skeletonContainer}>
            <ScrollView contentContainerStyle={skeletonStyle.skeletonScrollViewContent}>
                {/* Banner Skeleton */}
                <View style={skeletonStyle.skeletonCarouselContainer}>
                    <View style={skeletonStyle.skeletonImageLoader} />
                </View>

                {/* Course Cards Skeleton */}
                <View style={skeletonStyle.skeletonCard}>
                    <View style={skeletonStyle.skeletonTitle} />
                    <View style={skeletonStyle.skeletonImageLoader} />
                    <View style={skeletonStyle.skeletonDescription} />
                    <View style={skeletonStyle.skeletonDescription} />
                    <View style={skeletonStyle.skeletonPrice} />
                </View>

                <View style={skeletonStyle.skeletonCard}>
                    <View style={skeletonStyle.skeletonTitle} />
                    <View style={skeletonStyle.skeletonImageLoader} />
                    <View style={skeletonStyle.skeletonDescription} />
                    <View style={skeletonStyle.skeletonDescription} />
                    <View style={skeletonStyle.skeletonPrice} />
                </View>

                <View style={skeletonStyle.skeletonCard}>
                    <View style={skeletonStyle.skeletonTitle} />
                    <View style={skeletonStyle.skeletonImageLoader} />
                    <View style={skeletonStyle.skeletonDescription} />
                    <View style={skeletonStyle.skeletonDescription} />
                    <View style={skeletonStyle.skeletonPrice} />
                </View>
            </ScrollView>
        </View>
    );
};

const skeletonStyle = StyleSheet.create({
    skeletonContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    skeletonScrollViewContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    skeletonCarouselContainer: {
        height: 200,
    },
    skeletonImageLoader: {
        width: '100%',
        height: 150,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginVertical: 10,
    },
    skeletonTitle: {
        height: 20,
        width: screenWidth / 2,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
    skeletonDescription: {
        height: 15,
        width: screenWidth / 1.5,
        backgroundColor: '#e0e0e0',
        marginVertical: 5,
    },
    skeletonPrice: {
        height: 15,
        width: 50,
        backgroundColor: '#e0e0e0',
        marginVertical: 5,
    },
    skeletonCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 15,
        elevation: 5,
    },
});
