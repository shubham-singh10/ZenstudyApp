import { StyleSheet } from 'react-native';

const profileStyle = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    backgroundColor: '#e6f0fe',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    marginRight: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  profileText: {
    flex: 1,
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 18,
    color: '#000',
    flexWrap: 'wrap',
  },
  userName: {
    fontWeight: 'bold',
    color: '#004aad',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#004aad',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  supportSection: {
    backgroundColor: '#e6f0fe',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  supportText: {
    fontSize: 18,
    color: '#004aad',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default profileStyle;
