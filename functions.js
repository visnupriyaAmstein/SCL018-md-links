import { statSync, readdirSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import fetch from 'node-fetch';
// import fs from 'fs';
// import path from 'path';
// import fetch from 'node-fetch';

const dirRoute = 'README.md';

// Función solo si  es folder 
const funcIsDirectory = (dirRoute) => {
  try {
      const stats = statSync(dirRoute);//devuelve informacion sincronicamente sobre la ruta 
      return stats.isDirectory();
  } catch (e) {
      throw new Error('not a valid directory ' + dirRoute); // new Error prints callstack
  }
};

// Función solo si es un documento 
const funcIsMdFile = (filesRoute) => {
    const extName = extname(filesRoute);//devuelve la extensión de la ruta de archivo despues del .
    if (extName === '.md') {  // compara la ruta con md
        return true;
    } else {
        console.log('No es un archivo .md')
    }
};

// Función para poder leer un folder
const funcReadDir = (folder, mdLinks) => {
    files = readdirSync(folder);//lee el archivo y devuelve la matriz  con los nombres 
    files.forEach(file => {
    const fullPath = join(folder, file);// une la ruta
    if (funcIsDirectory(fullPath)) {
        funcReadDir(fullPath, mdLinks);
    } else if (funcIsMdFile(fullPath)) {
        funcReadFile(fullPath, mdLinks);
    } 
    });
};

// Función para leer un documento 
const funcReadFile = (files, mdLinks) => {
    const file = readFileSync(files, 'utf8');//lee el archivo y lo devuelve 
    mdLinks.push(...linksMd(file, files)); // spread operator
};

const linksMd = (file, files) => {
  const line = file.split('\n');// separa en lineas el documento 
  let arrayLinks = [];
  for ( let i=0; line.length > i; i++) { 
    const lineI = line[i];
    const reguExpress = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; // expresión regular que muestra el texto y los links 
    const matchLinks = lineI.matchAll(reguExpress);// busca coincidencias 
    const testMatch = reguExpress.test(lineI); // true o false 
    if(testMatch) {
      for(const match of matchLinks) {
        var objMd = {
          href: match[2],
          text: match[1],
          file: files,
          line: i + 1,
        }
      }arrayLinks.push(objMd);
    } 
  }return arrayLinks;
};
const totalLinks = [];

const funcDirOrFile = (routeTotal, totalLinks) => {
  if(funcIsDirectory ( routeTotal)) {
    funcReadDir(routeTotal, totalLinks);
  }else if(funcIsMdFile(routeTotal)) {
    funcReadFile(routeTotal, totalLinks);
  }
};
funcDirOrFile('pruebas2.md',totalLinks);
console.log(totalLinks);


//pathDelUser = process.argv[2]

let arrayLinks = 'pruebas2.md'
const validateOpt = (arrayLinks) => {
  const statusLink = arrayLinks.map((obj) =>
    fetch(obj.href)
    .then((res) => {
      if (res.status === 200) {
        return {
          href: obj.href,
          text: obj.text,
          file: obj.file,
          status: res.status,
          statusText: 'ok',
        };
      } else {
        return {
          href: obj.href,
          text: obj.text,
          file: obj.file,
          status: res.status,
          statusText: 'Fail',
        };
      }
    })
    .catch((err) =>
      ({
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: 404,
        statusText: 'Fail',
      }),
    ));
  return Promise.all(statusLink);
};
