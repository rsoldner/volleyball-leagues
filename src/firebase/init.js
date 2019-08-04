import firebase from 'firebase'
// import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBT6ZAtwFQtfjMrG4a3GA-HKivJMVPj7wI',
  authDomain: 'gators-volleyball.firebaseapp.com',
  databaseURL: 'https://gators-volleyball.firebaseio.com',
  projectId: 'gators-volleyball',
  storageBucket: '',
  messagingSenderId: '847572721026',
  appId: '1:847572721026:web:55765204d8a93b47'
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()
