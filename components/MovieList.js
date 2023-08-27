import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { theme } from '../theme'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');

const MovieList = ({title, data}) => {
  let MovieName = "Avengers: Age of Ultron"
  const navigation = useNavigation()

  return (
    <View style={styles.movieListWrapper}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity>
          <Text style={{ color: theme.text, fontSize: 18 }}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15, marginTop: 12,}}>
        {data.map((item, index) => (
          <TouchableOpacity style={styles.movieCardWrapper} key={index} onPress={() => navigation.navigate('Movie', item)}>
            <View style={styles.imageWrapper}>
              <Image source={require('../assets/images/endgamePoster.jpeg')} style={styles.image} />
            </View>
            <Text style={{ color: "white" }}>{
              MovieName.length > 14 ? MovieName.slice(0,14)+'...' : MovieName
              }</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default MovieList

const styles = StyleSheet.create({
  movieListWrapper: {
    marginVertical: 16,
  },
  titleWrapper: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
  movieCardWrapper: {
    marginRight: 16,
  },
  image: {
    height: height*0.25,
    width: width*0.33,
  },
  imageWrapper: {
    marginVertical: 4,
    marginRight: 4,
  },
})