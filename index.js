// import { statSync, readdirSync, readFileSync } from 'fs';
// import { extname, join } from 'path';
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';

// const ejemplo ='C:\Users\Visnupriya Amstein\Documents\laboratoria\SCL018-md-links\pruebas2.md';
// const ejemplo1 =('Documents/ProyectosLaboratoria/SCL018-md-link');
// console.log("example" ,ejemplo); //true
// console.log("example" ,ejemplo1); // false

// Función solo si  es folder 
const funcIsFolder = (dirRoute) => {
  try {
      const stats = fs.statSync(dirRoute);//devuelve informacion sincronicamente sobre la ruta 
      return stats.isDirectory();
  } catch (e) {
      throw new Error('not a valid directory ' + dirRoute); // new Error prints callstack
  }
};

// Función solo si es un documento 
const funcIsMdFile = (filesRoute) => {
    const extName = path.extname(filesRoute);//devuelve la extensión de la ruta de archivo despues del .
    if (extName === '.md') {  // compara la ruta con md
        return true;
    } else {
        console.log('No es un archivo .md')
    }
};

// Función para poder leer un folder
const funcReadFolder = (folder, mdLinks) => {
    const files = fs.readdirSync(folder);//lee el archivo y devuelve la matriz  con los nombres 
    files.forEach(file => {
    const fullPath = path.join(folder, file);// une la ruta
    if (funcIsFolder(fullPath)) {
        funcReadFolder(fullPath, mdLinks);
    } else if (funcIsMdFile(fullPath)) {
        funcReadFile(fullPath, mdLinks);
    } 
    });
};

export const linksMd = (file, files) => {
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
const funcReadFile = (files, mdLinks) => {
    const file = fs.readFileSync(files, 'utf8');//lee el archivo y lo devuelve 
    mdLinks.push(...linksMd(file, files)); // spread operator
};

const totalLinks = [];

const funcDirOMd = (routeTotal, totalLinks) => {
  if(funcIsFolder ( routeTotal)) {
    funcReadFolder(routeTotal, totalLinks);
  }else if(funcIsMdFile(routeTotal)) {
    funcReadFile(routeTotal, totalLinks);
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

  funcDirOMd('./prueba',totalLinks);
  // console.log(totalLinks);
validateOpt(totalLinks)
.then(result=>console.log(result))
.catch(err=>console.log('This error corresponds to the validateOpt promise' + err))
  

//   validateOpt('pruebas2.md',totalLinks);
//   console.log(totalLinks);

//   const mdLinks = (fullPath, options = { validate: false, stats: false}) => {
//     return new Promise((resolve, reject) => {
//     let totalMdLinks = [];
//     funcDirOrFile(fullPath, totalMdLinks);
//     if (totalMdLinks.length > 0) {
//         if (!options.validate && options.stats) {
//             resolve(validateArray(totalMdLinks))
//         } else if (options.validate && !options.stats) {
//             resolve(statsArray(totalMdLinks));
//         } 
//     }
//     else {
//         reject(new Error('couldn\'t find any link'));
//     }
// });
// };
