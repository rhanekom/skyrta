'use strict';

const SupportedLanguages = require('./lib/supportedlanguages');
const PipedProcess = require('./lib/pipedprocess.js');

module.exports = (function() {
    const Svg = require('./lib/svg');

    let langs = new SupportedLanguages();

    function generate(language, source)  {
        let executable = langs.getCommand(language);

        if (!executable) {
            throw new Error(`Unsupported language ${language}.  Must be one of ${langs.languages.toString()} `);
        }
        
        if (!source) {
            throw new Error('No source provided for input');
        } 

        const pipedprocess = new PipedProcess();
        
        try {  
            let output = pipedprocess.run(executable.exec, executable.args, source);
            
            if (output) {
                return new Svg(output);
            }

            return null;
        } catch (e) {                        
            throw new Error(`Unable to render ${language} graph: ${e}`);
        }        
    }

    function supportedLanguages() {
        return langs;
    }

    return {
        generate: generate,
        supportedLanguages: supportedLanguages
    };
})();