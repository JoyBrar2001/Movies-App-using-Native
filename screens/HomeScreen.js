import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { theme } from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

const ios = Platform.OS == "ios";

const HomeScreen = () => {

  const [trending, setTrending] = useState([1, 2, 3, 4, 5])
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5])
  const [topRated, setTopRated] = useState([1, 2, 3, 4, 5])
  const [loading, setLoading] = useState(false);

  const naviagtion = useNavigation();

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
            <TrendingMovies data={trending} />

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