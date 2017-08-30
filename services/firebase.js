const firebase = require('firebase');
const firebaseConfig = require('../config').firebaseConfig;

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {

}

module.exports = firebase.database();
