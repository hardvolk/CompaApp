angular.module('CompaApp')
.controller('Groups', function($scope, $cordovaGeolocation, $ionicLoading, $http, $ionicPopup) {
    
    /********************* MAP ******************************************/
    console.log("Cargando mapa...");
    //  Prepairing the Map
    $ionicLoading.show({
      template: 'Cargando...'
    });    
    
    var myLatlng = new google.maps.LatLng(0.3000, 0.4833);

    var mapOptions = {
        center: myLatlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.currentLat;
    $scope.currentLong;

    // Center the Map to current Location
    navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.currentLat = pos.coords.latitude;
        $scope.currentLong = pos.coords.longitude;

        /*
        var currentLocationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "My Location"
        });
        */
    });
    
    /***************** GROUPS *******************************************/
    

    $scope.Groups = {};
    $scope.Groups.List = [];
    
    // Function to get the list of the nearest groups from the server
    $scope.getGroups = function(){
        var dist = 15; // This is the distance for looking groups near the current Location

        $http({
                 url: API_URL + 'Controllers/Groups.php?action=GetNearestGroups&lat=' + $scope.currentLat + '&long=' + $scope.currentLong + '&dist=' + dist,
                 method: "GET",
                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function (response, status, headers, config) {
                 $scope.Groups.List = response;
                 $scope.DropPins(); // Drawing pins                  
             }).error(function (response, status, headers, config) {
                 $ionicPopup.alert({
                     title: 'Oh! Algo salió mal',
                     template: 'Ocurrió un problema al conectarse con el sevidor - status:' + status
                     });
             });
    };

    // The following function is called when the user clicks the "info" icon in the list 
    $scope.ShowMoreInfo = function(inx){
        /*$ionicPopup.alert({
            title: $scope.Groups.List[inx].SchoolName,
            template: '<b>Día: </b>' + $scope.Groups.List[inx].Day + '<br>' +
                        '<b>Hora: </b>' + $scope.Groups.List[inx].Hour + 'hrs <br>' + 
                        '<b>Lugar: </b>' + $scope.Groups.List[inx].Where
            });
            */
            $scope.map.setCenter($scope.Groups.List[inx].marker.position);
            $scope.map.setZoom(18);
            $scope.Groups.List[inx].marker.infoWindow.open($scope.map, $scope.Groups.List[inx].marker);
    };

    /************************************ MARKERS IN THE MAP ***************************/
    // The following function is called when the Group List is retrieved from the server
    // this will drop a pin in the map for each group
    $scope.DropPins = function(){
        console.log("*** Adding markers - Groups in List: " + $scope.Groups.List.length);
        for(var i=0; i < $scope.Groups.List.length; i++)
        {
            var groupLatlng = new google.maps.LatLng($scope.Groups.List[i].Latitude, $scope.Groups.List[i].Longitude);
            var marker = new google.maps.Marker({
                position: groupLatlng,
                map: $scope.map,
                title: $scope.Groups.List[i].SchoolShortName
            });
            

            // InfoWindow is the popup window showing more info about the pin when it's clicked            
            marker.infoWindow = new google.maps.InfoWindow({
                content: '<h1 class="firstHeading">' + $scope.Groups.List[i].SchoolShortName + '</h1>' +
                         '<p><b>Día: </b>' + $scope.Groups.List[i].Day + '<br>' + 
                         '<b>Hora: </b>' + $scope.Groups.List[i].Hour + 'hrs <br>' + 
                         '<b>Referencia:</b>' + $scope.Groups.List[i].Where + '</p>',
                maxWidth: 200
            });

             marker.addListener('click', function(){
                this.infoWindow.open($scope.map, this);
            });
            
            $scope.Groups.List[i].marker = marker;
        }
    };
    
    // Trigger when the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
        // do something only the first time the map is loaded
        $ionicLoading.hide();
        $scope.getGroups();
    });

    
    
    
})