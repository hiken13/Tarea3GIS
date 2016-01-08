angular.module('gisApp',[]).controller('controlador',function($scope,$http){
    $scope.size = 640;
    $scope.hospitales = Array();
    $scope.obtenerHospitales = function(){
      $http({method:'GET',url:'getHospitales.php'}).
        then(function(response){
            $scope.hospitales = response;
            console.log($scope.hospitales); 
        },function(){
            console.log("Error obteniendo los hospitales")
        });
    };
    $scope.obtenerHospitales();
});
