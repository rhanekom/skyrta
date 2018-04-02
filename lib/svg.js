'use strict';

var cheerio = require('cheerio');

module.exports = class Svg {
    constructor(data, options = {}) {
        this.options = options;
        this.data = this.transform(data, options);
    }

    get value() {
        return this.data;
    }

    transform(data, options) {
        options = options || {};
        let transformed = data;

        // Explicitly opt into variable height
        if (options.variableSize === true) {
            const $ = cheerio.load(data, { xmlMode: true });
            $('svg').attr('height', null).attr('width', null);
            transformed = $.html();
        }
        
        return transformed;
    }

    toEmbed() {
        if (!this.data) { return null; }

        let match = this.data.match(/<svg[\s\S]*?>[\s\S]*<\/svg>/m);

        if (match != null) { return match[0]; }

        return null;
    }

    toString() {
        return this.data;
    }
};