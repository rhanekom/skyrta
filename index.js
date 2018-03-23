'use strict';

const SupportedLanguages = require('./lib/supportedlanguages');
const PipedProcess = require('./lib/pipedprocess.js');

module.exports = (new function() {
    let languages = new SupportedLanguages();

    function generate(language, source)  {
        let executable = languages.getCommand(language);

        if (!executable) {
            throw new Error(`Unsupported language ${language}.  Must be one of ${SupportedLanguages.SupportedLanguages} `);
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

    return {
        generate: generate
    };
})();