import axios from 'axios';
import { state } from '../data/data';
import { refs } from '../refs/refs';

const API_KEY = 'AIzaSyAyp_8Bd6QFyuw_keTtGGzMqatuG1-92us';
// const API_KEY = 'AIzaSyAZ5jQEE8FRWx9O_E37AcluNQmNVScqQbk';
const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const baseURL = 'https://module13-default-rtdb.firebaseio.com';
// const baseURL = 'https://new13-b6f43-default-rtdb.firebaseio.com';

const signUp = async user => {
  refs.loader.classList.toggle('loader');
  try {
    const response = await axios.post(signUpURL, {
      ...user,
      returnSecureToken: true,
    });
    const data = { email: response.data.email, localId: response.data.localId };
    const token = response.data.idToken;
    addToDB(data, token);
  } catch (error) {
    // console.dir(error.response.data.error.message);
    // throw error;
    state.error = error.response.data.error.message;
    document.querySelector('.error').textContent =
      error.response.data.error.message;
  } finally {
    refs.loader.classList.toggle('loader');
  }
};

const signIn = async user => {
  refs.loader.classList.toggle('loader');

  try {
    const response = await axios.post(signInURL, {
      ...user,
      returnSecureToken: true,
    });
    localStorage.setItem('idToken', JSON.stringify(response.data.idToken));
    getFromDB();
  } catch (error) {
    // console.dir(error.response.data.error.message);
    // console.log(refs.errorIn);
    refs.errorIn.textContent = error.response.data.error.message;
    state.error = error.response.data.error.message;
    // console.log('state :', state);
    throw new Error(state.error);
  } finally {
    refs.loader.classList.toggle('loader');
  }
};

const logOut = () => {
  localStorage.clear();
};

// const addToDB = async (data, token) => {
//   try {
//     await axios.post(`${baseURL}/users.json?auth=${token}`, data);
//   } catch (error) {
//     console.dir(error.response.data.error.message);
//   }
// };

// const getFromDB = () => {
//   if (localStorage.getItem('idToken')) {
//     const token = JSON.parse(localStorage.getItem('idToken'));
//     console.log('token', token);
//     axios
//       .get(`${baseURL}/users.json?auth=${token}`)
//       .then(response => console.log(response.data));
//   } else console.log('no token');
// };
export { signUp, signIn, /*  addToDB, getFromDB, */ logOut };

// ===========================

// //==================14.12
// import axios from 'axios';

// const API_KEY = 'AIzaSyAyp_8Bd6QFyuw_keTtGGzMqatuG1-92us';
// const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
// const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
// const baseURL = 'https://module13-default-rtdb.firebaseio.com';

// const signUp = user => {
//   return axios.post(signUpURL, user);
// };
// const signIn = user => {
//   return axios.post(signInURL, user);
// };

// const logOut = () => {
//   localStorage.clear();
// };

// const addToDB = (data, token) => {
//   axios.post(`${baseURL}/users.json?auth=${token}`, data);
// };

// const getFromDB = () => {
//   if (localStorage.getItem('idToken')) {
//     const token = JSON.parse(localStorage.getItem('idToken'));
//     console.log('token', token);
//     axios
//       .get(`${baseURL}/users.json?auth=${token}`)
//       .then(response => console.log(response.data));
//   } else console.log('no token');
// };
// export { signUp, signIn, addToDB, getFromDB, logOut };
