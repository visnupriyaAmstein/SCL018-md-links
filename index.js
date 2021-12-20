// import fetch from 'node-fetch';
// import path from 'path';
// import fs from 'fs';
const fs = require('fs');
const path = require('path')
const fetch = require('node-fetch');


// Función solo si  es folder 
const isFolder = (dirRoute) => {
  try {
      const stats = fs.statSync(dirRoute);//devuelve informacion sincronicamente sobre la ruta 
      return stats.isDirectory();
  } catch (e) {
      throw new Error('not a valid directory ' + dirRoute); // new Error prints callstack
  }
};

// Función solo si es un documento 
const isMdFile = (filesRoute) => {
    const extName = path.extname(filesRoute);//devuelve la extensión de la ruta de archivo despues del .
    if (extName === '.md') {  // compara la ruta con md
        return true;
    } else {
        console.log('No es un archivo .md')
    }
};

// Función para poder leer un folder
const readFolder = (folder, mdLinks) => {
    const files = fs.readdirSync(folder);//lee el archivo y devuelve la matriz  con los nombres 
    files.forEach(file => {
    const fullPath = path.join(folder, file);// une la ruta
    if (isFolder(fullPath)) {
        readFolder(fullPath, mdLinks);
    } else if (isMdFile(fullPath)) {
        readFile(fullPath, mdLinks);
    } 
    });
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

// Función para leer un documento 
const readFile = (files, mdLinks) => {
    const file = fs.readFileSync(files, 'utf8');//lee el archivo y lo devuelve 
    mdLinks.push(...linksMd(file, files)); // spread operator
};

const totalLinks = [];

const dirOMd = (routeTotal, totalLinks) => {
  if(isFolder ( routeTotal)) {
    readFolder(routeTotal, totalLinks);
  }else if(isMdFile(routeTotal)) {
    readFile(routeTotal, totalLinks);
  }
};



//pathDelUser = process.argv[2]


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

  dirOMd('./prueba',totalLinks);
  // console.log(totalLinks);
validateOpt(totalLinks)
.then(result=>console.log(result))
.catch(err=>console.log('This error corresponds to the validateOpt promise' + err))
  

// const mdlinksFinder = (fullPath, options = { validate: false, stats: false }) => {
//   return new Promise((resolve, reject) => {
//       try {
//           if (isMdFile(fullPath)) {
//               let pathArray = [];
//               if (typeof fullPath !== 'object') {
//                   pathArray.push(fullPath);
//               } else {
//                   pathArray = fullPath;
//               }
//               pathArray.forEach((path) => {
//                   fileReader(path, options).then(fileData => {
//                     linksMd(fileData, options, path).then(linksData => {
//                         if (options.validate && !options.stats) {
//                           resolve(linksData);                           
//                         } 
//                         if(options.stats && !options.validate) {
//                           const stats = validateOpt(linksData);
//                         resolve(stats);
//                         } 
//                         if(options.validate && options.stats) {
//                         const stats = validateOpt(linksData);
//                           resolve(stats);
//                         } 
//                           resolve(linksData);
//                       }).catch(e => console.log(e));
//                   }).catch(e => console.log(e))
//               })
//           } else if (isFolder(fullPath)) {
//             readFolder(fullPath, options).then(fileData => {
//                 const pathJoin = path.join(`${fullPath}${path.sep}${fileData}`);
//                   resolve(mdlinksFinder(pathJoin, options));
//               }).catch(e => console.log(e));
//           } else {
//               resolve('Error: No existe ningun archivo formato md');
//           }
//       } catch (error) {
//           reject(error);
//       }
//   });
// };