import {dirOMd,validateOpt} from './index.js';

export const userPath = process.argv[2];
//const option = Yargs(process.argv.slice(2)).argv;

export const mdLinks = (fullPath, options = { validate: false}) => {
    return new Promise((resolve, reject) => {
      let totalMdLinks = [];
      dirOMd(fullPath, totalMdLinks);
      if (totalMdLinks.length > 0) {
        if (!options.validate ) {
            resolve(validateOpt(totalMdLinks))
            .then(r=>console.log(r))
    }
  }else {
        reject(new Error('couldn\'t find any link'));
    }
  
    }).catch((err) => { console.log('This is why totalMdLinks fails: ' + err)});
  };

    mdLinks(userPath,{ validate: false}).then((results)=> {
        console.log(results);
  })
