'use strict';

const SupportedLanguages = require('./lib/supportedlanguages');

module.exports = (function() {
    const Svg = require('./lib/svg');

    let langs = new SupportedLanguages();

    function generate(language, source, options = {})  {
        let plugin = validate(language, source);
        return execute(plugin, source, options);
    }

    function supportedLanguages() {
        return langs;
    }

    function validate(language, source) {
        let plugin = langs.getCommand(language);

        if (!plugin) {
            throw new Error(`Unsupported language ${language}.  Must be one of ${langs.languages.toString()} `);
        }

        if (!source) {
            throw new Error('No source provided for input');
        }

        return plugin;
    }

    function execute(plugin, source, options) {
        try {
            let output = plugin.generate(source, options);            
            if (output) { return new Svg(output); }            
        } catch (e) {
            throw new Error(`Unable to render graph language with ${plugin.lang()}: ${e}`);
        }
        
        return null;
    }

    return {
        generate: generate,
        supportedLanguages: supportedLanguages
    };
})();
