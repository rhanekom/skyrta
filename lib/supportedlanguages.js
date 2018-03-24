'use strict';

module.exports = class SupportedLanguages {
    constructor() {
        this.supportedLanguages = new Map();
        this.addLanguage(SupportedLanguages.langBob, 'svgbob', []);
        this.addLanguage(SupportedLanguages.langDot, 'dot', ['-Tsvg']);
    }

    getCommand(language) {
        let lang = (language || '').toLowerCase();
        return this.supportedLanguages.get(lang);
    }

    get languages() {
        return [...this.supportedLanguages.keys()];
    }

    addLanguage(name, exec, args) {
        this.supportedLanguages.set(name, { 'exec': exec, 'args': args});
    }

    static get langDot() {
        return 'dot';
    }

    static get langBob() {
        return 'bob';
    }
};
