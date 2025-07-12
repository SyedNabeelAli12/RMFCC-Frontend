
const config = {
 baseURL: process.env.REACT_APP_API_URL,
 token:`${process.env.REACT_APP_API_URL}/token`,
 tokenValidate:`${process.env.REACT_APP_API_URL}/users/me`,
 signUp:`${process.env.REACT_APP_API_URL}/signup`,
 topCountries:`${process.env.REACT_APP_API_URL}/`,
 predict:`${process.env.REACT_APP_API_URL}/predict`
}




export default config