
var request = require("request");
var admin = require("firebase-admin");
var fetch = require("node-fetch");

var serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://{serviceAccount.project_id}.firebaseio.com"
});

const db = admin.firestore();

// Quote API used from https://quotesondesign.com/api-v4-0/
var url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=";

// true - you can have more document with the names eg. inspiration_1540
// false - you will have only one document with the name inspiration (originally this was used in the video)
const multipleDocuments = false;

// Based on https://stackoverflow.com/questions/46637866/promise-then-doesnt-work-on-first-button-click 
let getQuote = function(){
    return fetch(url)
      .then(resp => {
       return resp.ok ? resp.json() : Promise.reject(Error('Get request failed'));
      })
      .catch(networkError => {
       console.error('Error: ' + networkError);
       return Promise.reject(networkError);
      })
      .then(jsonResponse => {
        let result = jsonResponse[0];
        return {
            documentName: multipleDocuments ? 'inspiration_' + result.ID : 'inspiration',
            quote: result.content,
            author: result.title
        };
      });
  };

getQuote().then(result => {
    const obj = result;
    const quoteData = {
        quote: obj.quote,
        author: obj.author
    };
    return db.collection('sampleData').doc(obj.documentName)
    .set(quoteData).then(() => {
        console.log('new quote written to database');
    });
});

