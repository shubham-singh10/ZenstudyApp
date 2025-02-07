import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetingDetails } from './store';
import Loader from '../Loader';
import { UserData } from '../userData/UserData';
import axios from 'axios';

const LiveScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { usersData } = UserData();
  const [meetingData, setMeetingData] = useState([]);

  const fetchMeetingDetails = useCallback(
    async (purchasedCourses) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}zenstudy/api/meeting/getMeeting`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
  
        const meetingData = response.data;
        
        // Filter meetings based on purchased course IDs
        const filteredMeetings = meetingData?.filter((meeting) =>
          purchasedCourses.some(
            (course) => course.course_id?._id === meeting.courseId._id
          )
        );
  
        // Add image URLs for filtered meetings
        const imageData = filteredMeetings?.map((meeting) => ({
          ...meeting,
          imageUrl: `${process.env.REACT_APP_API}zenstudy/api/image/getimage/${meeting.courseId.thumbnail}`,
        }));
  
        setMeetingData(imageData || []);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    },
    [] // No external dependencies needed
  );

  const getPurchasedCourses = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}zenstudy/api/payment/purchaseCourse`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: usersData?._id }),
        }
      );
  
      if (response.status === 204) {
        return [];
      }
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data.purchaseCourses || [];
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
      return [];
    }
  }, [usersData?._id]);

 
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        const purchasedCourses = await getPurchasedCourses();
        await fetchMeetingDetails(purchasedCourses);
      } finally {
        setLoading(false);
      }
    };
  
    initializeData();
  }, [fetchMeetingDetails, getPurchasedCourses]);

  if (loading) {
    return <Loader />;
  }


  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  //************** Meeting Start function ***********************//
  const meetingStart = (id) => {
    Linking.openURL(
      `https://live.zenstudy.in/?key=${id}&user=${usersData?._id}`
    );
  };

  return (
    <ScrollView contentContainerStyle={liveStyle.scrollContainer}>
      {Array.isArray(meetingData) && meetingData.length ? (
        meetingData.map((meeting) => {
          const currentTime = new Date();
          const startTime = new Date(meeting.startTime);
          const endTime = new Date(meeting.endTime);
          const isLive = currentTime >= startTime && currentTime <= endTime;

          return (
            <View style={liveStyle.container} key={meeting._id}>
              <View style={liveStyle.contentSection}>
                <Text style={liveStyle.text}>
                  {meeting?.courseId?.title || 'Untitled Course'}
                </Text>
                <Image
                  source={{
                    uri:
                      meeting?.imageUrl ||
                      'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg',
                  }}
                  style={liveStyle.courseImage}
                />
              </View>

              <View style={liveStyle.timingSection}>
                <Text style={liveStyle.timingText}>
                  {formatDay(meeting?.startTime || meeting?.createdAt)}
                </Text>
                <Text style={liveStyle.timingText}>
                  {formatTime(meeting?.startTime)} -{' '}
                  {meeting.endTime ? formatTime(meeting.endTime) : 'N/A'}
                </Text>
              </View>

              <View style={liveStyle.contentSection}>
                {isLive ? (
                  <View style={liveStyle.liveBox}>
                    <Text style={liveStyle.liveDot}>•</Text>
                    <Text style={liveStyle.liveText}>Live Now</Text>
                  </View>
                ) : (
                  <Text style={liveStyle.upcomingText}>Upcoming</Text>
                )}
                <TouchableOpacity
                  style={isLive ? liveStyle.joinBtn : liveStyle.disabledJoinBtn}
                  onPress={() => isLive && meetingStart(meeting?._id)}
                  disabled={!isLive}
                >
                  <Text style={liveStyle.joinText}>
                    {isLive ? 'Join Now' : 'Not Live'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      ) : (
        <Text style={liveStyle.noClassText}>No Live Classes Scheduled</Text>
      )}
    </ScrollView>
  );
};


const liveStyle = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#e6f0fe',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  contentSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timingSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  courseImage: {
    width: 180,
    height: 100,
    borderRadius: 5,
    elevation: 4,
  },
  text: {
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    color: '#054bb4',
    fontWeight: '500',
  },
  timingText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  liveBox: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2DD93B',
  },
  liveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  upcomingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFA500',
    textAlign: 'center',
    marginBottom: 8,
  },
  joinBtn: {
    backgroundColor: '#054bb4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '70%',
  },
  joinText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  disabledJoinBtn: {
    backgroundColor: '#B0B0B0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noClassText: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default LiveScreen;
