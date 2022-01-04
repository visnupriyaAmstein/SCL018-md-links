import {isMdFile,isFolder,validateOpt,linksMd} from '../index.js'
import {mdLinks} from '../md-links.js'

describe("linksMd", () => {
    it("should be a function", () => {
      expect(typeof linksMd).toBe("function");
    });
    it("should return an array", () => {
      const path = "pruebas2.md";
      const result = linksMd(path);
      expect(result).toBeInstanceOf(Array);
    });
  });

describe("validateOpt", () => {
    it("should be a function", () => {
      expect(typeof validateOpt).toBe("function");
    });
    it("should return a promise", () => {
      const path = "pruebas2.md";
      const result = mdLinks(path);
      expect(result).toBeInstanceOf(Promise);
    });
  });
  
describe('isMdFile', () => {
    it('should be a function', () => {
    expect(typeof isMdFile).toBe('function');
    });

    it('should return true', () => {
    const result = isMdFile('pruebas2.md');
    expect(result).toBeTruthy();
    });
    it('should return false', () => {
      const result = isMdFile('./prueba');
      expect(result).toBeFalsy();
      });
});
describe('isFolder', () => {
    it('should be a function', () => {
        expect(typeof isFolder).toBe('function');
    });

    it('should return true', () => {
        const result = isFolder('./prueba');
        expect(result).toBeTruthy();
    });
    it('should return false', () => {
      const result = isFolder('pruebas2.md');
      expect(result).toBeFalsy();
  });
    
});
