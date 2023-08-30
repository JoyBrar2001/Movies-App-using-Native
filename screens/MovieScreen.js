import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { theme } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast'
import MovieList from '../components/MovieList'
import Loading from '../components/loading'

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == "ios"

const MovieScreen = () => {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  let movieName = "Avengers: Endgame"
  const [cast, setCast] = useState([1, 2, 3, 4, 5])
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // API CALL HERE
  }, [item])

  return (
    <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={styles.movieScreenWrapper} >
      <View>
        <SafeAreaView style={styles.topbarWrapper}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size={35} color={isFavourite ? theme.background : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={require('../assets/images/endgamePoster.jpeg')}
              style={{ width: width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(31,32,30,0.8)', 'rgba(31,32,30,1)']}
              style={styles.gradientStyles}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >

            </LinearGradient>
          </View>
        )}
      </View>

      <View style={styles.movieDetailsWrapper}>
        <Text style={styles.movieTitle}>{movieName}</Text>
        <Text style={styles.releaseDate}>Released • 2020 • 170 min</Text>
      </View>

      <View style={styles.genresWrapper}>
        <Text style={styles.genreText}>Action • </Text>
        <Text style={styles.genreText}>Thrill • </Text>
        <Text style={styles.genreText}>Comedy</Text>
      </View>

      <Text style={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure veritatis sit nihil quas voluptas corporis cum explicabo quisquam recusandae, quia quibusdam aliquid aliquam, ut aperiam? Exercitationem accusamus dolore ullam voluptas beatae, quasi laudantium odit architecto non odio, minima quaerat. Adipisci ut soluta quasi saepe debitis, velit error commodi repudiandae tempora.</Text>

      <Cast navigation={navigation} cast={cast} />

      <MovieList title="Similar Movies" data={similarMovies} />
    </ScrollView>
  )
}

export default MovieScreen

const styles = StyleSheet.create({
  movieScreenWrapper: {
    paddingBottom: 20,
    backgroundColor: '#1f201e',
  },
  topbarWrapper: {
    width: width,
    position: 'absolute',
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 44,
  },
  iconWrapper: {
    borderRadius: 12,
    padding: 4,
    backgroundColor: theme.background,
  },
  gradientStyles: {
    width: width,
    height: height * 0.40,
    position: 'absolute',
    bottom: 0,
  },
  movieDetailsWrapper: {
    marginTop: -(height * 0.09),
  },
  movieTitle: {
    color: "white",
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
  },
  releaseDate: {
    fontFamily: 'Montserrat-Light',
    color: 'white',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 12,
  },
  genresWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  genreText: {
    fontFamily: 'Montserrat-Light',
    color: 'white',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 12,
  },
  description: {
    marginHorizontal: 16,
    textAlign: 'left',
    color: 'white',
    opacity: 0.7,
    fontFamily: 'Montserrat-ExtraLight',
    marginTop: 12,
  },
})