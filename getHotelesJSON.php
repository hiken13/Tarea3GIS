<?php

$host='localhost';
$db='cursoGIS';
$usr='postgres';
$pass='12345';
$port='5432';

$strconn = "host=$host port=$port dbname=$db user=$usr password=$pass";

$conn = pg_connect($strconn) or die('{"status":1 , "error":"Error de Conexion con la base de datos"}');

$query="select  nombre,"
        . "     telefono,"
        . "     direccion,"
        . "     pag_intern web,"
        . "     st_asgeojson(geom) coordenadas "
        . "from hoteles";

$result = pg_query($conn, $query) or die('{"status":1 , "error":"Error ern la consulta"}');

$respuesta=array();
while ($row=pg_fetch_row($result))
{
    //json_decode($row[4]);
    $array= array ( 
        "nombre" => $row[0] , 
        "telefono" => $row[1] ,
        "direccion" => $row[2] , 
        "web" => $row[3] , 
        "coordenada" => json_decode($row[4]));
    array_push($respuesta, $array);
}

$query="select 	min(ST_XMin(geom)) xmin,
	max(ST_XMax(geom)) xmax,
	min(ST_yMin(geom)) ymin,
	max(ST_yMax(geom)) ymax from hoteles";

$result = pg_query($conn, $query) or die('{"status":1 , "error":"Error ern la consulta"}');
$row= pg_fetch_row($result);
$dimensiones= array 
( 
    "xmin" => $row[0] , 
    "xmax" => $row[1] , 
    "ymin" => $row[2] , 
    "ymax" => $row[3]
);

$query="select srid,type from geometry_Columns where \"f_table_name\"='hoteles'";

$result = pg_query($conn, $query) or die('{"status":1 , "error":"Error ern la consulta"}');
$row= pg_fetch_row($result);

echo json_encode(array( "SRID" => $row[0],
                        "Tipo" => $row[1] , 
                        "Dimensiones" => $dimensiones,
                        "objs"=>$respuesta));
