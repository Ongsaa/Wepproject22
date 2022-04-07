import React from 'react';
import {View, FlatList, StyleSheet, Text, Button } from 'react-native';
import Constants from 'expo-constants';

export default class mem extends React.Component {
  static navigationOptions = {
    title: 'รายละเอียดกิจกรรม',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
       <Button
        title="ดูผู้เข้าร่วม"
        onPress={() => navigate('Member')}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
