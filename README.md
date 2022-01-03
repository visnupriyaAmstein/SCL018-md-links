# Markdown Links

## Índice

* [1. Librería Md-links](#1-Librería-Md-Links)
* [2. Instalación](#2-instalación)
* [3. Guía de uso de Md-links](#3-Guía-de-uso-de-Md-links)
* [4. Organización en diagramde de flujo](#4-Diagrama-de-flujo)
* [5. visualización en la terminal ](#5-visualización-en-la-terminal)


***

## 1. Librería Md-links

Markdown Links es una librería que extrae, analiza y valida los links que se encuentran en los archivos con formato .md (markdown). 

## 2. Instalación

Para dar comienzo a la instalación de la librería , deberas contar con [Node.js](https://nodejs.org/es/) previamente instalado. Despues deberas copiar y ejecutar el siguiente comando en la terminal.

```js
npm i vpriya-md-links
```
![foto1](https://github.com/visnupriyaAmstein/SCL018-md-links/blob/main/images/instalar.png?raw=true)


## 3. Guía de uso de Md-links

ya instalada nuesta librería deberas escribir en la terminal nuestro comando junto con la carpeta que quieres analizar.

```js
$ node md-links.js carpeta o archivo.md --validate
```
### Opciones

--validate

Al ejecutar nuestro comando podremos visualizar el estado de los links con su status http , si es ok (200) o fail (404).

## 4. Organización en diagramde de flujo

Este será el flujo que realizará el archivo o carpeta que deseamos testear.

![foto2](https://github.com/visnupriyaAmstein/SCL018-md-links/blob/main/images/diagrama.png?raw=true)

## 5. visualización en la terminal

Ejemplo del uso de la Librería 

![foto3](https://github.com/visnupriyaAmstein/SCL018-md-links/blob/main/images/terminal.png?raw=true)


Creado por Visnupriya Amstein .
