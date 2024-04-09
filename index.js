const { initializeApp, applicationDefault, cert} = require('firebase-admin/app');
const  { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

const citiesRef = db.collection('cities');

(await citiesRef.doc('SF')).set({
  name: 'San Francisco', state: 'CA', country: 'USA',
  capital: false, population: 860000
});
await citiesRef.doc('LA').set({
  name: 'Los Angeles', state: 'CA', country: 'USA',
  capital: false, population: 3900000
});
await citiesRef.doc('DC').set({
  name: 'Washington, D.C.', state: null, country: 'USA',
  capital: true, population: 680000
});
await citiesRef.doc('TOK').set({
  name: 'Tokyo', state: null, country: 'Japan',
  capital: true, population: 9000000
});
await citiesRef.doc('BJ').set({
  name: 'Beijing', state: null, country: 'China',
  capital: true, population: 21500000
});

// Get document
const cityRef = db.collection('cities').doc('SF');
const doc = await cityRef.get();
if (!doc.exists) {
  console.log('No such document!');
} else {
  console.log('Document data:', doc.data());
}