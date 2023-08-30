import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import { theme } from '../theme'
import Loading from '../components/Loading'
import MovieList from '../components/MovieList'
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb'

const { width, height } = Dimensions.get('window')

const PersonScreen = () => {
  const {params: item} = useRoute()
  const navigation = useNavigation()
  const [isFavourite, toggleFavourite] = useState(false)
  const [personMovies, setPersonMovie] = useState()
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState({})

  useEffect(()=>{
    setLoading(true)
    // console.log('Person : ' , item)
    getPersonDetails(item.id)
    getPersonMovies(item.id)
    setLoading(false)
  },[item])

  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id)
    // console.log('Person Details : ', data)
    if(data) setPerson(data)
  }
  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id)
    // console.log('Person Movies\n\n\n : ', data)
    if(data) setPersonMovie(data.cast)
  }

  return (
    <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={styles.personWrapper}>
      <SafeAreaView style={styles.topbarWrapper}>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.imageWrapper}>
            <View style={styles.circularWrapper}>
              <Image source={{uri: image342(person?.profile_path)}} style={styles.personImage} />
            </View>
          </View>

          <View>
            <Text style={styles.personName}>{person?.name}</Text>
            <Text style={styles.personLocation}>{person?.place_of_birth}</Text>
          </View>

          <View style={styles.infoWrapper}>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Gender</Text>
              <Text style={styles.infoDesc}>{person?.gender == 1 ? 'Female' : 'Male'}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Birthday</Text>
              <Text style={styles.infoDesc}>{person?.birthday}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Known for</Text>
              <Text style={styles.infoDesc}>{person?.known_for_department}</Text>
            </View>
            <View style={[styles.infoBox, {borderRightWidth: 0}]}>
              <Text style={styles.infoTitle}>Popularity</Text>
              <Text style={styles.infoDesc}>{person?.popularity?.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.bioWrapper}>
            <Text style={styles.biographyTitle}>Biography</Text>
            <Text style={styles.biographyText}>{person?.biography}</Text>
          </View>
        </View>
      )}

      <MovieList title={'Movie'} data={personMovies} />
    </ScrollView>
  )
}

export default PersonScreen

const styles = StyleSheet.create({
  personWrapper: {
    backgroundColor: '#1f201e',
  },
  topbarWrapper: {
    width: width,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 44,
  },
  iconWrapper: {
    borderRadius: 12,
    padding: 4,
    backgroundColor: theme.background,
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circularWrapper: {
    alignItems: 'center',
    borderRadius: 1000,
    overflow: 'hidden',
    width: width * 0.74,
    height: width * 0.74,
    borderWidth: 1,
    borderColor: '#ffffff99',
  },
  personImage: {
    width: width * 0.74,
    height: height * 0.43
  },
  personName: {
    fontSize: 32,
    fontFamily: 'Montserrat-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 12,
  },
  personLocation: {
    fontSize: 16,
    fontFamily: 'Montserrat-Light',
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 4,
  },
  infoWrapper: {
    backgroundColor: '#ffffff33',
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 100,
    marginTop: 16,
  },
  infoBox:{
    borderRightColor: 'white',
    borderRightWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  infoTitle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold'
  },
  infoDesc: {
    color: 'white',
    fontFamily: 'Montserrat-Light'
  },
  bioWrapper: {
    marginHorizontal: 12,
    marginTop: 16,
  },
  biographyTitle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  biographyText: {
    color: '#ffffff99',
    marginTop: 4,
    fontFamily: 'Montserrat-Light'
  },
})