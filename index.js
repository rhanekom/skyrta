'use strict';

const SupportedLanguages = require('./lib/supportedlanguages');
const PipedProcess = require('./lib/pipedprocess.js');

module.exports = class Skyrta {
    constructor() {
        this.languages = new SupportedLanguages();
    }
    
    generate(language, source)  {        
        let executable = this.languages.getCommand(language);

        if (!executable) {
            return;
        }
        
        const pipedprocess = new PipedProcess();

        let svg;

        try {      
            svg = pipedprocess.run(executable.exec, executable.args, source);
            return svg;
        } catch (e) {                        
            throw new Error(`Unable to render ${language} graph: ${e}`);
        }        
    }
};
