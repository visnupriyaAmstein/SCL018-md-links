#!/usr/bin/env node
import { mdLinks } from './md-Links.js'
import pathLib from 'path';

const path = process.argv[2];
let firstOption = process.argv[3];
//ruta relativa a absoluta
let dirPath = pathLib.resolve(path);

let options = {
    validate: false,
};

if (
    (firstOption === '--validate' ) 
) {
    options.validate = true;
} 

mdLinks(dirPath, options)
    .then(file => {
    console.log(file);
    })
    .catch(err => console.log('error', err));
