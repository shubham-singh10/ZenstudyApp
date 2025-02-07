import { StyleSheet } from 'react-native';

const myCourseStyle = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#ffff', // light background color
    },
    errorBox:{
      backgroundColor:'#fff',
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
    },
    errorText:{
      fontSize:22,
      color:'#054bb4',
      fontWeight:'500',
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
    buttonContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
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
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
    },
    continueButtonDisable:{
      backgroundColor:'red',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
    },
    continueButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    nullmsg:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
    },
    nulltext: 
    {
      fontSize: 16,
    color: '#ff0000',}
  });

export default myCourseStyle;
