angular.module('starter.controllers', [])

  .controller('DashboardController', function ($scope, NgMap, $interval, $firebaseArray, $firebaseObject) {
    $scope.anonTips = $firebaseArray(firebase.database().ref("anonymous_tips"));
    $scope.emergency = $firebaseObject(firebase.database().ref("emergency").child("alpha_test"));

    $scope.guards = [
      {
        latitude: 43.94489746,
        longitude: -78.89812434
      },
      {
        latitude: 43.94542275,
        longitude: -78.89396155
      }, {
        latitude: 43.94635744,
        longitude: -78.90019501
      }, {
        latitude: 43.94327522,
        longitude: -78.89893973
      }, {
        latitude: 43.94115079,
        longitude: -78.89742697
      }
    ];

    $scope.moment = moment().format('M/DD/YYYY, H:mm:ss A');
    NgMap.getMap().then(function (map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });

    $interval(function () {
      $scope.moment = moment().format('M/DD/YYYY, H:mm:ss A');
    }, 1000);
  })

  .controller('EmergencyController', function ($scope, NgMap, $interval, $firebaseArray, $mdToast, $firebaseObject) {
    $scope.moment = moment().format('MMMM Do YYYY, h:mm:ss a');
    $scope.location = null;
    $scope.coordinates = [];

    $scope.emergency = $firebaseObject(firebase.database().ref("emergency").child("alpha_test"));

    navigator.geolocation.getCurrentPosition(function (location) {
      $scope.currentLocation = "My Location";
      $scope.location = location;
      $scope.coordinates = [location.coords.latitude, location.coords.longitude];

      $scope.emergency.latitude = location.coords.latitude;
      $scope.emergency.longitude = location.coords.longitude;
      $scope.emergency.updated_timestamp = moment().unix();
      $scope.emergency.$save().then(function (ref) {

      });
    });

    $interval(function () {
      $scope.moment = moment().format('M/D/YYYY, H:mm:ss A');
    }, 1000);
  })

  .controller('AnonymousController', function ($scope, NgMap, $interval, $firebaseArray, $mdToast) {
    $scope.moment = moment().format('MMMM Do YYYY, h:mm:ss a');
    $scope.currentLocation = null;
    $scope.details = null;
    $scope.location = null;
    $scope.imageUrl = null;

    $scope.tips = $firebaseArray(firebase.database().ref("anonymous_tips"));

    navigator.geolocation.getCurrentPosition(function (location) {
      $scope.currentLocation = "My Location";
      $scope.location = location;
    });

    $interval(function () {
      $scope.moment = moment().format('M/D/YYYY, H:mm:ss A');
    }, 1000);

    $scope.AnonymousSubmit = function () {
      if ($scope.currentLocation && $scope.location && $scope.details) {
        $scope.tips.$add({
          latitude: $scope.location.coords.latitude,
          longitude: $scope.location.coords.longitude,
          accuracy: $scope.location.coords.accuracy,
          timestamp: moment().unix(),
          details: $scope.details,
          image_url: ($scope.imageUrl) ? $scope.imageUrl : null
        }).then(function (ref) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Your Anonymous Tips has been submitted!')
              .position("top right")
              .hideDelay(3000)
          );

          $scope.details = null;
          $scope.location = null;
          $scope.imageUrl = null;
        });
      }
    };

    function uploadFile(file) {
      var storage = firebase.storage().ref("tips");

      var uploadTask = storage.put(file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {
        // Handle unsuccessful uploads
      }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;

        $scope.imageUrl = downloadURL;
      });
    }

    $scope.uploadImage = function (file) {
      if (file) {
        uploadFile(file);
      }
    }
  });
