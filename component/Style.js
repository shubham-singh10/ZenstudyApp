import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        backgroundColor:'white',
        width:'100%',
        paddingHorizontal:15,
        paddingVertical:15,
        top:0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      logoh1: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
      },
      logoh2:{
        fontSize:10,
        color:'#054BB4',
      },
      helpText: {
        fontSize: 16,
        color: '#007BFF',
      },

      mainHcontainer:{
        flex: 1,
      },
      mainHeader:{
        backgroundColor:'#054bb4',
        height: 55,
        width: '100%',
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        zIndex:1000,
        flexDirection: 'row',
        justifyContent:'space-between',
      },
      leftContent:{
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        paddingLeft: 20,
      },
      userIcon:{
        color:'#fff',
      },
      username:{
        color:'#fff'
      },
      rightContent:{
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        paddingRight:20
      },
      searchIcon:{
        color:'#fff',
      },
      bellIcon:{
        color:'#fff',
      },

      footcontainer:{
        flex:1,
       
      },
      footer:{
        backgroundColor:'#054bb4',
        borderTopRightRadius:40,
        borderTopLeftRadius:40,
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        height:70,
        width:'100%',
        padding:10,
        zIndex:1000,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:30
      },
      fnavbox:{
        flexDirection:'column',
        alignItems:'center'
      },
      ficons:{
        color:'#fff',
      },
      ficonText:{
        color:'#fff',
      },

    });

    export default styles;