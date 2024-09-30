import {StyleSheet} from 'react-native';

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

  footer: {
    backgroundColor: '#054bb4',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: 70,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  fnavbox: {
    flexDirection: 'column',
    alignItems: 'center',
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
    color: '#FFD700', 
  },
  activeText: {
    color: '#FFD700', 
  },

});

export default styles;
