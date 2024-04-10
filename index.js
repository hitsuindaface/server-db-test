const { initializeApp, applicationDefault, cert} = require('firebase-admin/app');
const  { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

const citiesRef = db.collection('cities');

// doc = 'SF'
const exData = {
    name: 'San Francisco',
    state: 'CA',
    country: 'USA',
    capital: false,
    population: '860000'
}

const updateData = {
  population: '860001'
}

// Put information
async function addToDataBase(abbr, cityData){
  await citiesRef.doc(abbr).set(cityData);
  return false;
}

async function updateDataBase(abbr, newCityData) {
  await citiesRef.doc(abbr).update(newCityData);
  return false
}

addToDataBase('SF', exData);

const cityRef = db.collection('cities');

// Get information
async function getData(city) {
  
  try {
    const test = await cityRef.doc(city).get(); 
    const testData = test.data(); 
    console.log('im here');
    console.log("Data: ", testData);
    console.log("Population:", testData.population);
    return testData;
  } catch (error) {
    console.log("Error: somthing went wrong fetching the data"); 
    return null;
  }
  // const a = await ref.where('SF', '==', city).get();
}

// await citiesRef.doc('SF').set({
//   name: 'San Francisco', state: 'CA', country: 'USA',
//   capital: false, population: 860000
// });
// await citiesRef.doc('LA').set({
//   name: 'Los Angeles', state: 'CA', country: 'USA',
//   capital: false, population: 3900000
// });
// await citiesRef.doc('DC').set({
//   name: 'Washington, D.C.', state: null, country: 'USA',
//   capital: true, population: 680000
// });
// await citiesRef.doc('TOK').set({
//   name: 'Tokyo', state: null, country: 'Japan',
//   capital: true, population: 9000000
// });
// await citiesRef.doc('BJ').set({
//   name: 'Beijing', state: null, country: 'China',
//   capital: true, population: 21500000
// });

// // Get document
getData('SF');

updateDataBase('SF', updateData);
getData('SF');