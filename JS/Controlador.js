angular.module('gisApp', []).controller('controlador', function ($scope, $http) {

    $scope.hospitales = new Object();
    $scope.canvasX = 700;
    $scope.canvasY = 650;
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
            context.font = '8px Calibri';

            x = 5 + Math.round((x - $scope.hospitales.data.Dimensiones.xmin) / $scope.factorProporcional);
            y = 5 + Math.round((y - $scope.hospitales.data.Dimensiones.ymin) / $scope.factorProporcional);
            y = $scope.canvasY - y;
            var newx = context.measureText(value.nombre).width / 2;
            context.fillText(value.nombre, x - newx, y - 10);

            context.moveTo(x - 5, y);
            context.lineTo(x + 5, y);
            context.moveTo(x, y - 5);
            context.lineTo(x, y + 5);

            context.strokeStyle = "rgb(255,0,0)";
            context.stroke();
        });


    };

    $scope.obtenerHospitales();


    /*
     * Hoteles
     */
    $scope.obtenerHoteles = function ()
    {
        $http({method: 'GET', url: 'getHotelesJSON.php'}).
                then(
                        function (response)
                        {
                            $scope.hoteles = response;
                            $scope.factorProporcional = ($scope.hoteles.data.Dimensiones.ymax - $scope.hoteles.data.Dimensiones.ymin) / $scope.canvasY;
                            console.log($scope.factorProporcional);
                            console.log($scope.hoteles);
                            $scope.dibujaHoteles();
                        },
                        function ()
                        {
                            console.log("Error cargando los hoteles");
                        });
    };

    $scope.dibujaHoteles = function ()
    {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        $scope.hoteles.data.objs.forEach(function (value)
        {
            var x = value.coordenada.coordinates[0][0];
            var y = value.coordenada.coordinates[0][1];
            x = Math.round((x - $scope.hoteles.data.Dimensiones.xmin) / $scope.factorProporcional);
            y = Math.round((y - $scope.hoteles.data.Dimensiones.ymin) / $scope.factorProporcional);
            y = $scope.canvasY - y;

            context.beginPath();



            // Radii of the white glow.
            var innerRadius = 0.5,
                    outerRadius = 2,
                    // Radius of the entire circle.
                    radius = 5;

            //var gradient = context.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
            //gradient.addColorStop(0, 'blue');
            //gradient.addColorStop(1, 'red');
            //context.arc(x, y, 3, 0, 2 * Math.PI);
            context.arc(x, y, radius, 0, 2 * Math.PI);

            context.fillStyle = 'red';
            context.shadowColor = 'blue';
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowBlur = 6;
            context.fill();
        });


    };

    $scope.obtenerHoteles();
});

