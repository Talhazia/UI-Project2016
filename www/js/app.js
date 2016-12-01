// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngMaterial', 'starter.controllers', 'starter.services', 'ngMap', 'angularMoment', 'firebase', 'ngFileUpload'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  var config = {
    apiKey: "AIzaSyCkrSozw6ipgXtdOowELqXnU7GI5zQIGiY",
    authDomain: "bigbrother-9bc76.firebaseapp.com",
    databaseURL: "https://bigbrother-9bc76.firebaseio.com",
    storageBucket: "bigbrother-9bc76.appspot.com",
    messagingSenderId: "796521495044"
  };
  firebase.initializeApp(config);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('dashboard', {
    url: '/',
    templateUrl: 'templates/dashboard.html'
  }).state('emergency', {
    url: '/emergency',
    templateUrl: 'templates/emergency.html'
  }).state('anonymous', {
    url: '/anonymous',
    templateUrl: 'templates/anonymous.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
