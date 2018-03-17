#PROYECTO REACT 

dependencias usadas:
-firebase
-react-webcam

***
Puedes compartir fotos,
tomaar una foto 
conectarte con la API de google

Como se conecta los componentes:
El pricipal y recibe todos es Acceso a google,
de ahi solo paso un componente a App.js

El componente subirFotos: hace la comunicacion con firebase para guardar las fotos que subas , cada ves que entras veras la foto que subiste anteriomente.

El componente Tomarfoto :
Se conecta con api de getUserMedia , pero atraves de un npm , traigo los modulos hechos para usar en TomarFoto

