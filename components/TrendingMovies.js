import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'
import React from 'react'
import { image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

const MovieCard = ({ item, handleClick }) => {
  // console.log('item poster path : ' , item.poster_path)

  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Movie',item)} style={styles.movieCardWrapper}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width,
          height: height * 0.7,
          borderRadius: 30,
        }}
      />
    </TouchableOpacity>
  )
}

const TrendingMovies = ({ data }) => {

  const navigation = useNavigation()
  const handleClick = ({ item }) => {
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
        customConfig={{ width: width * 0.5 }}
        style={{ marginBottom: -36, marginTop: -54, }}
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