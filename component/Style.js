import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Shadow for Android
    elevation: 5,
  },
  logoh1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  logoh2: {
    fontSize: 10,
    color: '#054BB4',
  },
  helpText: {
    fontSize: 16,
    color: '#007BFF',
  },

  mainHeader: {
    backgroundColor: '#054bb4',
    height: 55,
    width: '100%',
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  leftContent: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingLeft: 20,
  },
  userIcon: {
    color: '#fff',
  },
  username: {
    color: '#fff',
  },
  rightContent: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingRight: 20,
  },
  searchIcon: {
    color: '#fff',
  },
  bellIcon: {
    color: '#fff',
  },
  footcontainer: {
    backgroundColor: '#fff',
  },
  footer: {
    backgroundColor: '#054bb4',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: 70,
    width: '100%',
    paddingTop: 25,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  fnavbox: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 5,
  },
  ficons: {
    color: '#fff',
  },
  ficonText: {
    color: '#fff',
  },
  activeTab: {
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
  },
  activeIcon: {
    color: 'gray',
  },
  activeText: {
    color: '#03f0fc',
  },

});

export default styles;
