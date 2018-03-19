# Getting Started with Cloud Firestore with Node.js

Example Node.js application based on Firecast video:
https://www.youtube.com/watch?v=Z87OZtIYC_0

Free quotes API used for quote generation:
https://quotesondesign.com/api-v4-0/

On default your database will have only one document (sampleData/inspiration) like in the video, and the app will update this only document every call.

But you can turn on multiple mode, allowing to have multiple documents (eg. sampleData/inspiration_1540).

## Getting Started

You will need nodeJS and npm.
Clone the repo, then run in the console:
```
cd cloud-firestore-nodejs/
npm install
```

Then add your Firebase Private Key to your project. Create your private key if you don't have it yet:
https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app

Then copy the key to the directory
```
cp [key_original_location] .
mv [key_original_name] ServiceAccountKey.json
```

Then run it
```
node index.js
```

If you want to save multiple documents, enable it with
```
const multipleDocuments = true;
```
