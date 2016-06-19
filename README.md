# Práctica Whatapop

## Puesta en funcionamiento

```sh
$> git clone https://github.com/aki-KeepCoding/practica_whatapop.git
$> cd practica_whatapop
$> npm install
```

Se puede descargar y descomprimir el conjunto de datos de prueba desde (https://www.dropbox.com/s/xhlnte7pamaw42w/angularjs-test-data.zip?dl=0)

```sh
$> unzip angularjs-test-data.zip
```

## Funcionamiento

### Búsqueda

Se puede realizar una búsqueda de productos mediante la caja de búsqueda de la barra superior.

Mientras se escribe se ofrecen sugerencias de productos que tienen el texto en su nombre. Si se selecciona una sugerencia o se pulsa el botón búsqueda se realiza la búsqueda en Whatapop y se muestran los productos coincidentes.


### Filtro de Categorías

Si activamos y desactivamos las categorías sólo se verán los productos de las categorías activadas.

### Filtro de Distancia

Si el navegador soporta la geolocalización se muestra el filtro de distancia. El filtro se puede activar/desactivar. Si lo activamos hay un slider que permite seleccionar una distancia de 0-100-200...-500.

Se muestra también la localización actual del usuario en un mapa con imagen estática.

### Favoritos
En cada tarjeta de producto se puede activar el botón favorito. Estos favoritos se almacenan en el localstorage del navegador y pueden persistir durante distintas sesiones del navegador.


## Más info
Se han incluido comentarios en todo el código para intentar explicar su funcionamiento. 


