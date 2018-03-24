'use strict';

const SupportedLanguages = require('./lib/supportedlanguages');
const PipedProcess = require('./lib/pipedprocess.js');

module.exports = (function() {
    const Svg = require('./lib/svg');

    let langs = new SupportedLanguages();

    function generate(language, source)  {
        let executable = validate(language, source); 
        return execute(executable, source);        
    }

    function supportedLanguages() {
        return langs;
    }

    function validate(language, source) {
        let executable = langs.getCommand(language);

        if (!executable) {
            throw new Error(`Unsupported language ${language}.  Must be one of ${langs.languages.toString()} `);
        }
        
        if (!source) {
            throw new Error('No source provided for input');
        }

        return executable;
    }
    
    function execute(executable, source) {
        try {
            const pipedprocess = new PipedProcess();  
            let output = pipedprocess.run(executable.exec, executable.args, source);
            
            if (output) {
                return new Svg(output);
            }
    
            return null;
        } catch (e) {                        
            throw new Error(`Unable to render graph with ${executable.exec}: ${e}`);
        }
    }

    return {
        generate: generate,
        supportedLanguages: supportedLanguages
    };
})();