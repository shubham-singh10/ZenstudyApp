import { Dimensions, StyleSheet } from "react-native";

const {width: screenWidth} = Dimensions.get('window');

const homestyle = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      paddingHorizontal:20,
    },
    scrollViewContent: {
      flexGrow: 1,
      backgroundColor: '#fff',
    },
    carouselContainer: {
      height: 200,
    },
    imageContainer: {
      width: screenWidth,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 140,
      resizeMode: 'cover',
    },
    pagination: {
      position: 'absolute',
      bottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    paginationDot: {
      width: 10,
      height: 10,
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: '#007bff',
    },
    inactiveDot: {
      backgroundColor: '#ddd',
    },
    coursesContainer: {
      marginVertical: 20,
    },
    coursesTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    courseCard: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 30,
      marginVertical:20,
      marginHorizontal:5,
      width: screenWidth - 50,
      elevation: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#054bb4',
    },
    cImgContainer: {
      width: '100%',
      height: 170,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    courseImage: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      resizeMode: 'cover',
    },
    courseDescription: {
      fontSize: 12,
      color: '#666',
      marginTop:15,
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
    afterDesc: {
      marginTop: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    createdAt:{
      fontSize:14,
      color:'#054bb4',
      fontWeight:'bold',
    },
    price:{
      fontSize:16,
      color:'#054bb4',
      fontWeight:'bold',
    },
    cardBtns:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:15,
    },
    exploreBtn: {
      backgroundColor: '#E6F0FE',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
      width:'45%',
    },
    exploreBtnText: {
      color: '#054bb4',
      fontSize: 14,
      fontWeight: 'bold',
    },
    buyNow:{
      backgroundColor: '#054bb4',  
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
      width:'45%',
    },
    buyNowLoading:{
      backgroundColor: '#054bb2',  
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
      width:'45%',
      flexDirection:'row',
      gap:2,
      opacity:0.9,
    },
    buyNowText:{
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    exploreContainer:{
      backgroundColor:'#E6F0FE',
      padding:20,
      borderRadius: 20,
    },
    exploreText:{
      color:'#054bb4',
      alignSelf:'center',
      fontSize:16,
      fontWeight:'bold',
    },
    exploreIcons:{
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-around', 
    },
    exploreCourses:{
      marginTop:20
    },
    exploreContent:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      gap:0
    },
    exploreContentText:{
      color:'#054bb4',
      fontWeight:'bold',
      fontSize:12,
    },
    notfoundText:{
      alignSelf:'center',
      padding:20,
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
      width: '80%', // Modal width relative to the screen
      padding: 20, // Padding inside the modal
      backgroundColor: 'white', // Modal background color
      borderRadius: 10, // Rounded corners
    },
    modalTop:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:5
    },
    modalCross:{
      backgroundColor:'#054bb4',
      paddingVertical:2,
      paddingHorizontal:6,
      borderRadius:5
    },
    modalCrossText:{
      color:'#fff'
    },
    modalTitle: {
      fontSize: 18, // Title font size
      fontWeight: 'bold', // Title font weight
      marginBottom: 10, // Space below the title
    },
    modalInput: {
      width: '100%', // Full width input
      padding: 10, // Padding inside the input
      borderWidth: 1, // Border width for the input
      borderColor: '#ccc', // Light grey border color
      borderRadius: 5, // Rounded corners for the input
      marginBottom: 20, // Space below the input
    },
    modalButton: {
      backgroundColor: '#054bb4', // Button background color
      padding: 10, // Padding inside the button
      borderRadius: 5, // Rounded corners for the button
    },
    modalButtonText: {
      color: 'white', // Button text color
      fontWeight: 'bold', // Button text weight
      alignSelf:'center',
    },
  });

  export default homestyle;