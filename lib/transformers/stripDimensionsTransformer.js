'use strict';

module.exports = (function() {       
    
    const cheerio = require('cheerio');

    function transform(data, options) {
        if (options.variableSize !== true) {
            return data;
        }
        
        const $ = cheerio.load(data, { xmlMode: true });
        $('svg').attr('height', null).attr('width', null);
        return $.html();        
    }

    return {
        transform: transform
    };
})();