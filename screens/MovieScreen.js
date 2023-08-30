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
import Loading from '../components/Loading'
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb'

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == "ios"

const MovieScreen = () => {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([])
  const [similarMovies, setSimilarMovies] = useState()
  const [loadingImage, setLoadingImage] = useState(true)
  const [loadingCast, setLoadingCast] = useState(true)
  const [loadingSimilar, setLoadingSimilar] = useState(true)
  const [movie, setMovie] = useState({})

  useEffect(() => {
    // console.log(item.id)
    // setLoading(true)
    getMovieDetails(item.id)
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
  }, [item])

  const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id)
    // console.log('Got details : ', data)
    if (data) setMovie(data)
    setLoadingImage(false)
  }

  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id)
    // console.log('Credits : ', data.cast)
    if (data) setCast(data.cast)
    setLoadingCast(false)
  }

  const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id)
    // console.log('Similar Movies : ', data.results)
    if (data) setSimilarMovies(data.results)
    setLoadingSimilar(false)
  }


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

        {loadingImage ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: image500(movie?.poster_path) }}
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
        <Text style={styles.movieTitle}>{movie?.title}</Text>
        <Text style={styles.releaseDate}>{movie.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min</Text>
      </View>

      <View style={styles.genresWrapper}>
        {movie?.genres?.map((genre, index) => {
          return (
            <Text key={index} style={styles.genreText}>{genre?.name} {index === movie.genres.length - 1 ? '' : '•'} </Text>
          )
        })}
      </View>

      <Text style={styles.description}>
        {movie?.overview}
      </Text>

      {loadingCast ? (
        <Loading />
      ) : (
        <Cast navigation={navigation} cast={cast} />
      )
      }

      {loadingSimilar ? (
        <Loading />
      ) : (
        <MovieList title="Similar Movies" data={similarMovies} />
      )}
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