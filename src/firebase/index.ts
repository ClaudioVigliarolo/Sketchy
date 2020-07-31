import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyDASeZsiwOqbM6Svky-AJYxx9TlqzRklh4',
  authDomain: 'sketchy-8c14d.firebaseapp.com',
  databaseURL: 'https://sketchy-8c14d.firebaseio.com',
  projectId: 'sketchy-8c14d',
  storageBucket: 'sketchy-8c14d.appspot.com',
  messagingSenderId: '698700911118',
  appId: '1:698700911118:web:15d7e4b95bc9260a53a25f',
  measurementId: 'G-H7JSPHS587',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
const commentsCollection = db.collection('comments');
const likesCollection = db.collection('likes');

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
