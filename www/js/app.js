// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('CompaApp', ['ionic', 'ngCordova'])

.run(function($ionicPlatform,$location,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      $location.path('/');
      $rootScope.$apply();
  });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
  
    // $ionicConfigProvider.views.maxCache(10);
    $ionicConfigProvider.views.transition('platform');
    // $ionicConfigProvider.views.forwardCache(false);
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
    $ionicConfigProvider.backButton.text('');                  // default is 'Back'
    $ionicConfigProvider.backButton.previousTitleText(false);  // hides the 'Back' text
    // $ionicConfigProvider.templates.maxPrefetch(20);
  
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.posts', {
      url: "/posts",
      views: {
        'menuContent' :{
          templateUrl: "templates/posts.html",
          controller: 'Posts'
        }
      }
    })
  
  .state('app.groups', {
      url: "/groups",
      views: {
        'menuContent' :{
          templateUrl: "templates/groups.html",
          controller: 'Groups'
        }
      }
    })
  
    .state('app.events', {
      url: "/events",
      views: {
        'menuContent' :{
          templateUrl: "templates/events.html",
          controller: 'Events'
        }
      }
    })

    .state('app.resources', {
      url: "/resources",
      views: {
        'menuContent' :{
          templateUrl: "templates/resources.html",
          controller: 'Resources'
        }
      }
    })
  
  .state('app.donate', {
      url: "/donate",
      views: {
        'menuContent' :{
          templateUrl: "templates/donate.html",
          controller: 'Donate'
        }
      }
    })
  
  .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html",
          controller: 'About'
        }
      }
    })
  
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/groups');
})

.controller('AppCtrl', function($scope){
    
})
