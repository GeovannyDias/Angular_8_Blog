// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const firebaseConfig = {
  // Key Firebase
  apiKey: "AIzaSyC6I5-N3zTYmWdhebFlBNmfjXX6Lthj1Xo",
  authDomain: "blog-geo.firebaseapp.com",
  databaseURL: "https://blog-geo.firebaseio.com",
  projectId: "blog-geo",
  storageBucket: "blog-geo.appspot.com", // gs://blog-geo.appspot.com
  messagingSenderId: "70928019011",
  appId: "1:70928019011:web:fb89de488c92caa7286ef6",
  measurementId: "G-Y33F9BC01C"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
