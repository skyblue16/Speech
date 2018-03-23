#PROYECTO REACT 

Herramientas:

-**React**
-**Firebase**
-**CSS**
-**React webcam**
-**React bootstrap**


![El flujo de la pagina]('public/img/descripcion.png')
***

Puedes compartir fotos,
tomar una foto,
chat para comunicarte con el mundo
conectarte con la API de google

Como se conecta los componentes:
El pricipal y recibe todos es Acceso a google,
de ahi solo paso un componente a App.js

El componente subirFotos: hace la comunicacion con firebase para guardar las fotos que subas , cada ves que entras veras la foto que subiste anteriomente.

El componente Tomarfoto :
Se conecta con api de getUserMedia , pero atraves de un npm , traigo los modulos hechos para usar en TomarFoto

componente Chatroom :
se conecta con con el componente de subirfotos, para poder integrarlo en un chat

