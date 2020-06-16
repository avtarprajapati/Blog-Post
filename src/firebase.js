import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCkyAiYu0uIJLgq3Zbo7SFQFPD-8BQuMXk',
  authDomain: 'blog-post-47039.firebaseapp.com',
  databaseURL: 'https://blog-post-47039.firebaseio.com',
  projectId: 'blog-post-47039',
  storageBucket: 'blog-post-47039.appspot.com',
  messagingSenderId: '784019961877',
  appId: '1:784019961877:web:065e586d81c7860503f61c'
};

firebase.initializeApp(firebaseConfig);

export default firebase.database().ref('posts');
