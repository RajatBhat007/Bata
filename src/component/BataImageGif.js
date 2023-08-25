import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const BataImageGif = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/bata.gif')}
        style={styles.image}
      />
    </View>
  );
}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        image: {
          width: screenWidth, // Set the width to the screen width
          height: '100%',     // Set the height to take up the full available height
          resizeMode: 'cover', // Adjust the resizeMode as needed
        },
      });


export default BataImageGif;