import {isFolder} from '../index.js'

describe('funcIsDiretory', () => {
    it('retorna TRUE si el parametro es una ruta a un directorio', () => {
        const result = isFolder('./prueba');
    });
    
    it('retorna FALSE si el parametro es una ruta a un archivo', () => {
    });
})

