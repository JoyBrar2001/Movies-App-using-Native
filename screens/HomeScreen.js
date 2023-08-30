import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { theme } from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

const ios = Platform.OS == "ios";

const HomeScreen = () => {

  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [loading, setLoading] = useState(true);
  const naviagtion = useNavigation();

  useEffect(() => {
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  },[])

  const getTrendingMovies = async() => {
    const data = await fetchTrendingMovies()
    // console.log('Trending Movies : ', data)
    if(data && data.results) setTrending(data.results)
    setLoading(false)
  }
  const getUpcomingMovies = async() => {
    const data = await fetchUpcomingMovies()
    // console.log('Trending Movies : ', data)
    if(data && data.results) setUpcoming(data.results)
    // setLoading(false)
  }
  const getTopRatedMovies = async() => {
    const data = await fetchTopRatedMovies()
    // console.log('Trending Movies : ', data)
    if(data && data.results) setTopRated(data.results)
    // setLoading(false)
  }

  return (
    <View style={styles.homeWrapper}>
      <SafeAreaView style={styles.topBarWrapper}>
        <StatusBar style='light' />
        <View style={styles.searchWrapper}>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text style={styles.title}>
            <Text style={{ color: theme.text }}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => naviagtion.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, marginTop: -10, }}>
            {trending && 
              <TrendingMovies data={trending} />
            }

            <MovieList title="Upcoming" data={upcoming} />
            <MovieList title="Top Rated" data={topRated} />

          </ScrollView>
        )
      }
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
    backgroundColor: '#1f201e',
  },
  topBarWrapper: {
    marginTop: 44,
    marginBottom: ios ? -8 : 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontFamily: 'Montserrat-SemiBold',
  },
});