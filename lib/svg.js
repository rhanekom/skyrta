'use strict';


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
        
        let transformer = require('./transformers/svgTransformer');
        return transformer.transform(data, options);
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