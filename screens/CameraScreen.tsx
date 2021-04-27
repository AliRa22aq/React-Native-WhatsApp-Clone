import * as React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';




export default function CameraScreen() {
  return (
    <View style={styles.container}>
        <Text> Camera is Coming </Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});