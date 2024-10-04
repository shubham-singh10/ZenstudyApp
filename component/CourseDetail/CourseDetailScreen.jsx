import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image, 
  Text 
} from 'react-native';

const CourseDetail = () => {
  return (
    <ScrollView contentContainerStyle={courseStyle.scrollContainer}>
      <View style={courseStyle.container}>
        
        <View style={courseStyle.contentSection}>
          <Text style={courseStyle.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </Text>
          <Image
            source={{
              uri: 'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg',
            }}
            style={courseStyle.courseImage}
          />
        </View>

        
        <View style={courseStyle.timingSection}>
          <Text style={courseStyle.timingText}>Sat-Sun</Text>
          <Text style={courseStyle.timingText}>5-6 PM</Text>
        </View>
        
        
        <View style={courseStyle.contentSection}>
          <View style={courseStyle.liveBox}>
          <Text style={courseStyle.liveDot}></Text>
          <Text style={courseStyle.liveText}>Live Now</Text>
          </View>
          <TouchableOpacity style={courseStyle.joinBtn}>
            <Text style={courseStyle.joinText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const courseStyle = StyleSheet.create({
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
    justifyContent:'space-between',
  },
  courseImage: {
    width: 180,
    height: 100,
    borderRadius: 5,
    elevation:4,
  },
  text: {
    flex: 1, 
    marginRight: 10,
    fontSize: 14,
    color: '#054bb4',
    fontWeight:'500',
  },
  timingText: {
    fontSize: 14,
    color: '#555',
    fontWeight:'bold',
    marginHorizontal:10
  },
  liveBox:{
    flexDirection:'row',
    gap:5,
    alignItems:'center',
  },
  liveDot:{
    width:10,
    height:10,
    borderRadius:5,
    backgroundColor: "#2DD93B",
  },
  liveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  joinBtn: {
    backgroundColor: '#054bb4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    width:'70%'
  },
  joinText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf:'center'
  },
});

export default CourseDetail;
