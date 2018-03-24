'use strict';

module.exports = class Svg {
    constructor(data) {
        this.data = data;
    }

    get value() {
        return this.data;
    }

    toEmbed() {
        if (!this.data) {
            return null;
        }

        let match = this.data.match(/<svg[\s\S]*?>[\s\S]*<\/svg>/m);

        if (match != null) {
            return match[0];
        }
        return null;
    }

    toString() {
        return this.data;
    }
};