angular.module('gisApp',[]).controller('controlador',function($scope,$http){
    $scope.size = 640;
    $scope.hospitales = new Object();
    $scope.canvasX = $scope.size;
    $scope.canvasY = $scope.size;
    $scope.factorProporcional = 0;

    $scope.obtenerHospitales = function ()
    {
        $http({method: 'GET', url: 'getHospitalesJSON.php'}).
                then(
                        function (response)
                        {
                            $scope.hospitales = response;
                            $scope.factorProporcional = ($scope.hospitales.data.Dimensiones.ymax - $scope.hospitales.data.Dimensiones.ymin) / $scope.canvasY;
                            console.log($scope.factorProporcional);
                            console.log($scope.hospitales);
                            $scope.dibujaHospitales();
                        },
                        function ()
                        {
                            console.log("Error cargando los Hospitales");
                        });
    };

    $scope.dibujaHospitales = function ()
    {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        $scope.hospitales.data.objs.forEach(function (value)
        {
            var x = value.coordenada.coordinates[0][0];
            var y = value.coordenada.coordinates[0][1];
            x = 10 + Math.round((x - $scope.hospitales.data.Dimensiones.xmin) / $scope.factorProporcional);
            y = 10 + Math.round((y - $scope.hospitales.data.Dimensiones.ymin) / $scope.factorProporcional);
            y = $scope.canvasY - y;
            //context.beginPath();
            //context.arc(x, y, 3, 0, 2 * Math.PI);
            //context.fill();
            //context.lineWidth = 3;
            context.moveTo(x - 5, y);
            context.lineTo(x + 5, y);
            context.moveTo(x, y - 5);
            context.lineTo(x, y + 5);
            //context.moveTo(x, 0);
            //context.lineTo(x, 95);
            context.strokeStyle = "rgb(255,0,0)";
            context.stroke();
        });


    };

    $scope.obtenerHospitales();
});

