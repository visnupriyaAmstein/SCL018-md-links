import {linksMd} from '../index.js'

test('deberia extraerme los links',()=>{
    const links = {
        'https://es.wikipedia.org/wiki/Markdown',
    };

    expect(linksMd.links()).toEqual({
        'https://es.wikipedia.org/wiki/Markdown',
    });
})
