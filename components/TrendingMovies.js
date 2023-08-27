import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'
import React from 'react'

const { width, height } = Dimensions.get('window');

const MovieCard = ({ item, handleClick }) => (
  <TouchableOpacity onPress={handleClick} style={styles.movieCardWrapper}>
    <Image 
      source={require('../assets/images/endgamePoster.jpeg')}
      style={{
        width: width,
        height: height*0.7,
        borderRadius: 30,
      }}
    />
  </TouchableOpacity>
)

const TrendingMovies = ({ data }) => {

  const navigation = useNavigation()
  const handleClick = () => {
    navigation.navigate('Movie', item)
  }

  return (
    <View style={styles.trendingWrapper}>
      <Text style={styles.title}>TrendingMovies</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        width={width}
        height={height * 0.7}
        autoPlay={true}
        mode='parallax'
        scrollAnimationDuration={1000}
        customConfig={{ width: width*0.5 }}
        style={{marginVertical: -36}}
      />
    </View>
  )
}

export default TrendingMovies

const styles = StyleSheet.create({
  trendingWrapper: {
    alignItems: 'center',
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    marginHorizontal: 16,
    marginVertical: 20,
    fontFamily: 'Montserrat-Regular',
  },
  movieCardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})