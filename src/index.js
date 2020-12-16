import './styles.css';
import { refs } from './refs/refs';
import { signUp, signIn, logOut } from './api/api';
import { state } from './data/data';
import { createSignUpForm } from './components/auth/forms/signUpForm';
import { createSignInForm } from './components/auth/forms/signInForm';
import { createHome } from './components/pages/home';
createHome();

const getPage = e => {
  if (e.target === e.currentTarget) {
    return;
  }
  switch (e.target.dataset.page) {
    case 'signUp':
      createSignUpForm();
      break;
    case 'signIn':
      createSignInForm();
      break;
    case 'home':
      createHome();
      break;
    case 'logOut':
      createHome();
      break;
    default:
      createHome();
      break;
  }

  // if (e.target.dataset.page === 'signUp') {
  //   createSignUpForm();
  // }
  // if (e.target.dataset.page === 'signIn') {
  //   createSignInForm();
  // }
};

const logOutHandler = () => {
  logOut();
  refs.navigation
    .querySelector('[data-page="signUp"]')
    .classList.toggle('hidden');
  refs.navigation
    .querySelector('[data-page="signIn"]')
    .classList.toggle('hidden');
  refs.navigation
    .querySelector('[data-page="logOut"]')
    .classList.toggle('hidden');
};
refs.navigation.addEventListener('click', getPage);
refs.navigation
  .querySelector('[data-page="logOut"]')
  .addEventListener('click', logOutHandler);

// ===========================

// // ==========14.12
// import './styles.css';
// import { refs } from './refs/refs';
// import { signUp, signIn, addToDB, getFromDB, logOut } from './api/api';

// // getFromDB().then(response => console.log(response.data));

// const user = {
//   email: '',
//   password: '',
// };

// const resetUser = () => {
//   user.email = '';
//   user.password = '';
// };

// const getUserData = e => {
//   const { name, value } = e.target;
//   user[name] = value;
//   //   console.log(user);
// };

// const signUpData = async e => {
//   e.preventDefault();
//   const response = await signUp({ ...user, returnSecureToken: true });
//   const data = { email: response.data.email, localId: response.data.localId };
//   const token = response.data.idToken;
//   addToDB(data, token);
//   refs.signUpForm.reset();
//   resetUser();
// };

// const signInData = async e => {
//   e.preventDefault();
//   const response = await signIn({ ...user, returnSecureToken: true });
//   localStorage.setItem('idToken', JSON.stringify(response.data.idToken));
//   refs.signInForm.reset();
//   resetUser();
//   getFromDB();
// };

// // __signUpForm
// refs.signUpForm.addEventListener('input', getUserData);
// refs.signUpForm.addEventListener('submit', signUpData);
// // __signInForm
// refs.signInForm.addEventListener('input', getUserData);
// refs.signInForm.addEventListener('submit', signInData);
// // // __logout
// refs.logoutButton.addEventListener('click', logOut);

// // ===========================
// // const signUpData = e => {
// //   e.preventDefault();
// //   signUp(user).then(response => console.log(response));
// //   refs.signUpForm.reset();
// //   resetUser();
// // };
// // const signInData = e => {
// //   e.preventDefault();
// //   signIn(user).then(response => console.log(response));
// //   refs.signInForm.reset();
// //   resetUser();
// // };

// // функция async
// // // async function signUpData (e) {

// // // }
