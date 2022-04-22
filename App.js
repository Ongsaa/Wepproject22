import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, LogBox, Image, ScrollView, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
// import { initializeApp } from "firebase/app";
import Constants from 'expo-constants';
import LoginScreen from './Login';


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
} catch (err) { }


function dbListener(path, setData) {
  const tb = ref(getDatabase(), path);
  onValue(tb, (snapshot) => {
    setData(snapshot.val());
  })
}


function renderKpop(item, index, setItem) {
  var icon = <Image style={{ width: 200, height: 150 }} source={{ uri: `https://dbkpop.com/wp-content/uploads/${item.year}/${item.number}/${item.code}.jpg` }} />
  var desc = <View style={styles.text}>
    <Text>{"จำนวนสมาชิก " + item.members + "คน"}</Text>   
  </View>;
  return <List.Item onPress={() => setItem(item)} title={item.name} description={desc} left={(props => icon)}></List.Item>
}

function Detail(props) {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView>
          <Card>
          <Card.Cover source={require("./assets/Kpop.jpg")} />
            <Card.Title title="ข้อมูลเพิ่มเติม"/>
            <Card.Content>
              <Text>ชื่อวง: {props.item.name}</Text>
              <Text>จำนวนสมาชิก: {props.item.members}</Text>
              <Text>ชื่อบริษัท: {props.item.company}</Text>
              <Text>ชื่อแฟนคลับ: {props.item.fc}</Text>
              <Text>วันเดบิวต์: {props.item.de}</Text>

              <Button style={{ marginTop: 100, backgroundColor: '#3700ff' }} onPress={() => props.setItem(null)}>
                <Text style={{ color: '#ffff' }}>Back</Text>
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

function Loading() {
  return <View><Text>Loading</Text></View>
}
export default function App() {
  const [kpop, setKpop] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [citem, setCitem] = React.useState(null);

  React.useEffect(() => {
    var auth = getAuth();
    auth.onAuthStateChanged(function (us) {
      setUser(us);
    });
    dbListener("/kpop", setKpop);
  }, []);
  if (user == null) {
    return <LoginScreen />;
  } 
  if (kpop.length == 0) {
    return <Loading />;
  } 

  if (citem != null) {
    return <Detail item={citem} setItem={setCitem} />;
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card.Cover source={require("./assets/Kpop.jpg")} />
        <ScrollView>
          <Card>
            <Card.Title title="K-pop Idols Groups" />
            <Card.Content>
            {/* <FlatList data={kpop} renderItem={renderKpop} ></FlatList> */}
              <FlatList data={kpop} 
              renderItem={({ item, index }) => renderKpop(item, index, setCitem)} >
              </FlatList>
            </Card.Content>
          </Card>
        </ScrollView>
        <Button icon="logout" mode="contained" onPress={() => getAuth().signOut()}>
          Sign Out
        </Button>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" style="light" />
      </View>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E3CB'
  },
  text: {
    padding: 15,
  },
  button: {
    backgroundColor: '#9292D1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    alignItems: 'center',
    color: '#9292D1',
  },
});
