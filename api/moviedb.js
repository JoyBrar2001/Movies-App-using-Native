import axios from "axios";
import { apiKey } from "../constants"

const apiBaseurl = 'https://api.themoviedb.org/3'
const trendingMoviesEndPoint = `${apiBaseurl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndPoint = `${apiBaseurl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndPoint = `${apiBaseurl}/movie/top_rated?api_key=${apiKey}`

const searchMoviesEndPoint = `${apiBaseurl}/search/movie?api_key=${apiKey}`

const movieDetailsEndPoint = id => `${apiBaseurl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndPoint = id => `${apiBaseurl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndPoint = id => `${apiBaseurl}/movie/${id}/similar?api_key=${apiKey}`


const personDetailsEndPoint = id => `${apiBaseurl}/person/${id}?api_key=${apiKey}`
const personMovieEndPoint = id => `${apiBaseurl}/person/${id}/movie_credits?api_key=${apiKey}`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg'
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU'

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  }

  try {
    const response = await axios.request(options)
    return response.data
  }
  catch (error) {
    console.log('error : ', error)
    return {}
  }
}

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint)
}
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint)
}
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint)
}

export const fetchMovieDetails = id => {
  return apiCall(movieDetailsEndPoint(id))
}
export const fetchMovieCredits = id => {
  return apiCall(movieCreditsEndPoint(id))
}
export const fetchSimilarMovies = id => {
  return apiCall(similarMoviesEndPoint(id))
}

export const fetchPersonDetails = id => {
  return apiCall(personDetailsEndPoint(id))
}
export const fetchPersonMovies = id => {
  return apiCall(personMovieEndPoint(id))
}

export const searchMovies = params => {
  return apiCall(searchMoviesEndPoint, params)
}