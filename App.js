import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, LogBox, Image, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAOueBY5bee7TcwEcXt4blj3-BwUQdD1P0",
  authDomain: "webpro-461fc.firebaseapp.com",
  databaseURL: "https://webpro-461fc-default-rtdb.firebaseio.com",
  projectId: "webpro-461fc",
  storageBucket: "webpro-461fc.appspot.com",
  messagingSenderId: "242065346944",
  appId: "1:242065346944:web:a27d6d7b0370e911f7b165",
  measurementId: "G-4NDNECDZC9"
};

LogBox.ignoreAllLogs(true);
 
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {   }


function dbListener(path,setData){
   const tb = ref(getDatabase(), path);
   onValue(tb, (snapshot)=>{
     setData(snapshot.val());
   })
}


function renderKpop({item}){
  
  var icon = <Image style={{width:200,height:150}}
  source={{uri:`https://dbkpop.com/wp-content/uploads/${item.year}/${item.number}/${item.code}.jpg`}}/>   
  var desc = <View style={styles.text}>
  <Text>{ "บริษัท "+item.company}</Text>
  <Text>{ "จำนวนสมาชิก "+item.members+"คน"}</Text>
  <Text>{ "ชื่อแฟนคลับ "+item.fc}</Text>
  <Text>{ "เดบิวต์ "+item.de}</Text>

  <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('mem')}>
          <Text>Details</Text>
  </TouchableOpacity>   
  </View>;
   return <List.Item  title={item.name} description={desc}  left={(props=>icon)}></List.Item>  
}

function Loading(){
  return <View><Text>Loading</Text></View>
}
export default function App() {
  const [kpop, setKpop] = React.useState([]);
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    var auth = getAuth();
    auth.onAuthStateChanged(function (us) {
      setUser(us);
    });
    dbListener("/kpop", setKpop);
   }, []);
   if(kpop.length==0){
    return <Loading/>;
  }
  
  return (
    <PaperProvider> 
    <View style={styles.container}>
    <Card.Cover source={require("./assets/Kpop.jpg")}/>
      <ScrollView>
        <Card>
        <Card.Title title="K-pop Idols Groups"/>
        <Card.Content>
        <FlatList data={kpop} renderItem={renderKpop} ></FlatList>
        </Card.Content>
        </Card>
        
        </ScrollView>
        
      <StatusBar style="auto" />
      </View>
      
    </PaperProvider>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E3CB'
  },
  text:{
  padding:15,
  },
  button: {
    backgroundColor: '#9292D1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width:0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    alignItems: 'center',
    color: '#9292D1',
  },
});

