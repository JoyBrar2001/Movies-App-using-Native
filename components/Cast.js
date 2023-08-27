import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Cast = ({ cast, navigation }) => {
  let characterName = "Captain America"
  let personName = "Chris Evans"

  return (
    <View style={styles.castMainWrapper}>
      <Text style={styles.topCast}>Top Cast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {cast && cast.map((person, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.castWrapper}
            onPress={() => navigation.navigate('Person', person)}
          >
            <View style={styles.imageWrapper}>
              <Image 
                source={require('../assets/images/chrisEvans.jpeg')} 
                style={styles.castImage} 
              />
            </View>
            <Text style={styles.characterName}>{characterName.length > 12 ? characterName.slice(0,10) + '...' : characterName}</Text>
            <Text style={styles.personName}>{personName.length > 12 ? personName.slice(0,10) + '...' : personName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Cast

const styles = StyleSheet.create({
  castMainWrapper: {
    marginVertical: 16,
  },
  topCast: {
    fontFamily: 'Montserrat-Medium',
    color: 'white',
    marginHorizontal: 16,
    fontSize: 20,
    textAlign: 'left',
  },
  castWrapper: {
    marginRight: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  imageWrapper: {
    overflow: 'hidden',
    height: 90,
    width: 90,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#ffffff99',
  },
  castImage: {
    height: 90,
    width: 90,
  },
  characterName: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium'
  },
  personName: {
    color: 'white',
    opacity: 0.7,
    fontSize: 12,
    fontFamily: 'Montserrat-Light'
  },
})