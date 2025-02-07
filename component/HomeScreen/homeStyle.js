import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const homestyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  opacity: {
    opacity: 0.8,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: 200,
  },
  imageLoader: {
    position: 'absolute',
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
  finalPriceText: {
    color: '#000',
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
  exploreCourses:{
    marginTop:20,
  },
  coursesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  courseCard: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    marginVertical: 20,
    marginHorizontal: 5,
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
    marginTop: 15,
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
  createdAt: {
    fontSize: 14,
    color: '#054bb4',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#054bb4',
    fontWeight: 'bold',
  },
  couponBtn:{
    marginTop:10,
  },
  couponBtnText:{
    color:'#054bb4',
    fontSize:12,
    fontWeight:'bold',
    textDecorationLine:'underline',
  },
  cardBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  exploreBtn: {
    backgroundColor: '#E6F0FE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
  },
  exploreBtnText: {
    color: '#054bb4',
    fontSize: 12,
    fontWeight: 'bold',
  },
  opacitty: {
    opacity: '0.8',
  },
  buyNow: {
    backgroundColor: '#054bb4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
  },
  buyNowLoading: {
    backgroundColor: '#054bb2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
    flexDirection: 'row',
    gap: 2,
    opacity: 0.9,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
exploreContainer: {
  marginVertical: 20,
  paddingHorizontal: 20,
},

exploreHeaderText: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#000',
  marginBottom: 15,
  textAlign: 'center',
},

exploreIcons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

exploreContent: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 10,
  borderRadius: 15,
  overflow: 'hidden',
  elevation: 5, // Android shadow
},

gradientButton: {
  width: '100%',
  paddingVertical: 18,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 15,
},

iconWrapper: {
  borderRadius: 50,
  alignSelf: 'center',
  marginBottom: 10,
},

exploricon:{
  width: 50,
  height: 50,
},
exploreContentText: {
  fontSize: 15,
  fontWeight: '600',
  color: '#fff',
  textAlign: 'center',
},

  notfoundText: {
    alignSelf: 'center',
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  modalCross: {
    backgroundColor: '#054bb4',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  modalCrossText: {
    color: '#fff',
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  inputBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  modalInput: {
    width: '80%',
    color: '#000',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 10,
  },
  applyButton: {
    backgroundColor: '#054bb4',
    paddingVertical: 10,
    width: '20%',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  applyButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  disableButtonText: {
    color: 'red',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 10,
  },
  modalButton: {
    backgroundColor: '#054bb4',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default homestyle;
