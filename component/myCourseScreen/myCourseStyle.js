import { StyleSheet } from "react-native";

const myCourseStyle = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#ffff', // light background color
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      margin: 10,
      elevation: 3, // For shadow in Android
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1e3a8a', // Blue color
      marginBottom: 10,
    },
    imageContainer: {
      position: 'relative',
      paddingHorizontal:20,
      elevation:10,
    },
    courseImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
      elevation:10,
  
    },
    playButtonContainer: {
      position: 'absolute',
      right: 10,
      bottom: -15,
      backgroundColor: '#fff',
      borderRadius: 40,
      height:50,
      width:50,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      elevation:10,
    },
    playButton: {
      backgroundColor:'#054bb4',
      height:40,
      width:40,
      borderRadius:30,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
    playButtonText:{
      fontSize:20,
      color:'white',
    },
    languageTag: {
      backgroundColor: '#e0e7ff',
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 4,
      marginTop: 10,
      alignSelf: 'flex-start',
    },
    languageText: {
      color: '#1e3a8a',
      fontWeight: 'bold',
    },
    description: {
      fontSize: 14,
      color: '#333',
      marginVertical: 10,
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    progressText: {
      fontSize: 12,
      color: '#054bb4',
      fontWeight:'bold',
    },
    continueButton: {
      backgroundColor: '#054bb4', // Blue button color
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: 'center',
    },
    continueButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default myCourseStyle;