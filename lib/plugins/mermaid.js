'use strict';

module.exports = (function Mermaid() {

    /*  Options format:
        ---------------        
            {
                theme: "default"
                width: 800,
                height: 600,
                backgroundColor: white,
                configFile: 'config.js',
                cssFile: 'styles.css',
                puppeteerConfigFile: 'puppeteer.js'
            }        

        Arguments format:
        -----------------
            Usage: mmdc [options]


            Options:

                -V, --version                                   output the version number
                -t, --theme [theme]                             Theme of the chart, could be default, forest, dark or neutral. Optional. Default: default (default: default)
                -w, --width [width]                             Width of the page. Optional. Default: 800 (default: 800)
                -H, --height [height]                           Height of the page. Optional. Default: 600 (default: 600)
                -i, --input <input>                             Input mermaid file. Required.
                -o, --output [output]                           Output file. It should be either svg, png or pdf. Optional. Default: input + ".svg"
                -b, --backgroundColor [backgroundColor]         Background color. Example: transparent, red, '#F0F0F0'. Optional. Default: white
                -c, --configFile [configFile]                   JSON configuration file for mermaid. Optional
                -C, --cssFile [cssFile]                         CSS file for the page. Optional
                -p --puppeteerConfigFile [puppeteerConfigFile]  JSON configuration file for puppeteer. Optional
                -h, --help                                      output usage information

    */    
    
    const tmp = require('tmp'); 
    const fs = require('fs');
    const which = require('npm-which');

    const PipedProcess = require('../pipedprocess');
    const Command = require('../command');

    const defaultArguments = [];
    
    function generate(input, options) {
        let cmd = getCommand(input, options);
        let process = new PipedProcess();        
        process.execute(cmd.exec, cmd.args);

        let outputFile = cmd.tmpfiles[0];
        let output = fs.readFileSync(outputFile, 'utf8');
        fs.unlinkSync(outputFile);
        return output;
    }

    function getCommand(input, options) {
        let args = getArguments(options);
        
        var tmpInput = tmp.fileSync();        
        let outputFile = tmpInput.name + '.svg';

        fs.appendFileSync(tmpInput.fd, input);
        
        args = args.concat(['--input', tmpInput.name]);
        args = args.concat(['--output', outputFile]);

        return new Command(getExecutable(), args, input, [outputFile]);
    }    

    function getArguments(options) {
        if (!options) { return []; }
        
        let args = defaultArguments;
        return args.concat(convertOptionToArgument('--theme', options.theme))
            .concat(convertOptionToArgument('--width', options.width))
            .concat(convertOptionToArgument('--height', options.height))
            .concat(convertOptionToArgument('--backgroundColor', options.backgroundColor))
            .concat(convertOptionToArgument('--configFile', options.configFile))
            .concat(convertOptionToArgument('--cssFile', options.cssFile))
            .concat(convertOptionToArgument('--puppeteerConfigFile', options.puppeteerConfigFile));
    }

    function getExecutable() {
        var w = which(process.cwd());
        return w.sync('mmdc');
    }

    function convertOptionToArgument(option, value) {
        if (!value) { return []; }
        return [option, value.toString()];        
    }    

    function lang() {
        return 'mermaid';
    }

    return {
        generate: generate,
        lang: lang,
        getCommand: getCommand
    };
})();