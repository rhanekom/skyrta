'use strict';

module.exports = class SupportedLanguages {
    constructor() {        
        let plugins = [ 
            require('./plugins/graphviz'), 
            require('./plugins/svgbob'),
            require('./plugins/mermaid')
        ];

        this.supportedLanguages = new Map();
        
        for (let i = 0; i< plugins.length; i++) {
            let p = plugins[i];        
            this.addLanguage(p);
        }
    }

    getCommand(language) {
        let lang = (language || '').toLowerCase();
        return this.supportedLanguages.get(lang);
    }

    get languages() {
        return [...this.supportedLanguages.keys()];
    }

    addLanguage(plugin) {        
        this.supportedLanguages.set(plugin.lang(), plugin);
    }    
};
