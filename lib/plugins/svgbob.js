'use strict';

module.exports = (function SvgBob() {    

    /*  Options format:
        ---------------        
            {
                fontFamily: "arial"
                fontSize: 14,
                scale: 1,
                strokeWidth: 2
            }        

        Arguments format:
        -----------------
            --font-family <font-family>      text will be rendered with this font (default: 'arial')
            --font-size <font-size>          text will be rendered with this font size (default: 14)        
            --scale <scale>                  scale the entire svg (dimensions, font size, stroke width) by this factor (default: 1)
            --stroke-width <stroke-width>    stroke width for all lines (default: 2)
    */    
    
    const PipedProcess = require('../pipedprocess');
    const Command = require('../command');
    const defaultArguments = [];
    
    function generate(input, options) {
        let cmd = getCommand(input, options);
        let process = new PipedProcess();
        return process.execute(cmd.exec, cmd.args, cmd.input);
    }

    function getCommand(input, options) {
        return new Command('svgbob', getArguments(options), input);
    }

    function getArguments(options) {
        if (!options) { return []; }
        
        let args = defaultArguments;
        return args.concat(convertOptionToArgument('--font-family', options.fontFamily))
            .concat(convertOptionToArgument('--font-size', options.fontSize))
            .concat(convertOptionToArgument('--scale', options.scale))
            .concat(convertOptionToArgument('--stroke-width', options.strokeWidth));
    }

    function convertOptionToArgument(option, value) {
        if (!value) { return []; }
        return [option, value.toString()];        
    }    

    function lang() {
        return 'bob';
    }

    return {
        generate: generate,
        lang: lang,
        getCommand: getCommand
    };
})();