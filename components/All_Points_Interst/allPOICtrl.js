angular.module("london_app").controller("allPointsofInterstController", [
  "$scope",
  "$rootScope",
  "$http",
  "$location",
  "ModalService",
  function ($scope, $rootScope, $http, $location, ModalService) {
    let self = this;

    self.gotoFAV = function () {
      $location.path('/favs')
    }

    /** saves in the local favorite list the POI's */
    self.saveInFavLocalList = function (POi) {
      if ($rootScope.localFav.filter(value => value.name == POi.name).length > 0) {
        let i = $rootScope.localFav.findIndex(x => x.name === POi.name);
        if (i > -1) $rootScope.localFav.splice(i, 1);
      } else {
        $rootScope.localFav.push({
          FK_username: $rootScope.loggedUser,
          FK_poi_name: POi.name,
          _time_date: new Date().toISOString().replace('T', ' ').replace('Z', ' '),
          _priority: $rootScope.localFav.length
        });
        console.log($rootScope.localFav)
      }
    };

    /** checking in the local favorite list if the POI that choosen in the list */
    self.checkIfinFav = function (POi) {
      if ($rootScope.localFav.length > 0) {
        if ($rootScope.localFav.filter(value => value.name == POi.name).length > 0)
          return true;
        else return false;
      }
    };

    $http.get("http://localhost:3000/user/poi/getAll_POI").then(
      function (response) {
        let data = response.data;
        $rootScope.allPois = data;
      },
      function (error) { }
    );

    self.open = function (poi) {
      if (!ModalService.isOpen) ModalService.open(poi);
    };
  }
]);
