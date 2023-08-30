import React, { useCallback, useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading';
import { debounce } from 'lodash';
import { image185, searchMovies } from '../api/moviedb';

const { width, height } = Dimensions.get('window')

const SearchScreen = () => {
  const navigation = useNavigation()
  const [results, setResults] = useState([])
  const movieName = "Avengers: Endgame"
  const [loading, setLoading] = useState(false)

  const handleSearch = value => {
    // console.log('value: ', value)
    if(value && value.length > 2){
      setLoading(true)
      searchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      }).then(data=>{
        setLoading(false)
        // console.log('Got Movies: ', data)
        if(data) setResults(data.results)
      })
    }
    else{
      setLoading(false)
      setResults([])
    }
  }
  const handleTextDebounce = useCallback(debounce(handleSearch,400), [])

  return (
    <SafeAreaView style={styles.searchWrapper}>
      <View style={styles.searchBarWrapper}>
        <TextInput
          onChangeText={handleSearch}
          placeholder='Search Movie'
          placeholderTextColor={'lightgray'}
          style={styles.searchBar}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="cancel" size={44} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) :
        results.length > 0 ?
          <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            style={styles.searchResultsWrapper}
          >
            <Text style={styles.resultsTitle}>Results ({results.length})</Text>
            <View style={styles.resultsWrapper}>
              {results.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('Movie', item)}
                >
                  <Image
                    source={{uri: image185(item?.poster_path)}}
                    style={{ width: width * 0.44, height: height * 0.3, borderRadius: 16 }}
                  />
                  <Text style={styles.movieTitle}>{item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          :
          <Text style={styles.resultsTitle}>No Results Found</Text>
      }
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  searchWrapper: {
    flex: 1,
    backgroundColor: '#1f201e',
  },
  searchBarWrapper: {
    marginHorizontal: 16,
    marginVertical: 44,
    paddingLeft: 20,
    paddingRight: 4,
    paddingVertical: 6,
    borderColor: '#ffffff99',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 100,
  },
  searchBar: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    flex: 1,
  },
  searchResultsWrapper: {
    paddingHorizontal: 16,
    marginTop: -20,
  },
  resultsTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  resultsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  movieTitle: {
    color: '#ffffff99',
    marginTop: 8,
    marginBottom: 16,
  },
})