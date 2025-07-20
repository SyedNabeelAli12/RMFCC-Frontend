
const config = {
 baseURL: process.env.REACT_APP_API_URL,
 token:`${process.env.REACT_APP_API_URL}/token`,
 tokenValidate:`${process.env.REACT_APP_API_URL}/users/me`,
 signUp:`${process.env.REACT_APP_API_URL}/signup`,
 topCountries:`${process.env.REACT_APP_API_URL}/`,
 predict:`${process.env.REACT_APP_API_URL}/predict`,
 forecastPredict:`${process.env.REACT_APP_API_URL}/forecast-predict`,
 forecast:`${process.env.REACT_APP_API_URL}/forecast`,
 distinctCountries:`${process.env.REACT_APP_API_URL}/distinct-countries`,
}




export default config