angular.module("london_app").controller("allPointsofInterstController", [
  "$scope",
  "$rootScope",
  "$http",
  "$location",
  "ModalService",
  "RemoveDBFavourite",
  function ($scope, $rootScope, $http, $location, ModalService, RemoveDBFavourite) {
    let self = this;

    self.gotoFAV = function () {
      $location.path('/favs')
    }

    /** saves in the local favorite list the POI's */
    self.saveInFavLocalList = function (POi) {
      let targetPoi = $rootScope.userFavs.filter(value => value.FK_poi_name == POi.name)
      if (targetPoi.length > 0) {
        if (targetPoi[0].DB) {
          RemoveDBFavourite.delete(targetPoi[0].FK_poi_name)
        }
        let i = $rootScope.userFavs.findIndex(x => x.FK_poi_name === POi.name);
        if (i > -1) $rootScope.userFavs.splice(i, 1);
      } else {
        $rootScope.userFavs.push({
          FK_username: $rootScope.loggedUser,
          FK_poi_name: POi.name,
          _time_date: new Date().toISOString().replace('T', ' ').replace('Z', ''),
          img: $rootScope.allPois.filter(p => p.name === POi.name)[0].picture,
          category: $rootScope.allPois.filter(p => p.name === POi.name)[0].category,
          poiRank: $rootScope.allPois.filter(p => p.name === POi.name)[0].poiRank,
          DB: false
        });
        console.log('ADDED FAVS:', $rootScope.userFavs)
      }
    };

    /** checking in the local favorite list if the POI that choosen in the list */
    self.checkIfinFav = function (POi) {
      if ($rootScope.userFavs.length > 0) {
        if ($rootScope.userFavs.filter(value => value.FK_poi_name == POi.name).length > 0)
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
