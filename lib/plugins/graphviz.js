'use strict';

module.exports = (function GraphViz() {    

    /*  Options format:
        ---------------
        {
            graphAttributes: {},
            nodeAttributes:  {},
            edgeAttributes:  {},
            scale: 72,
            engine: dot/neato/fdp/sfdp/twopi/circo
        }

        Arguments format:
        -----------------
            -Gname=val  - Set graph attribute 'name' to 'val'
            -Nname=val  - Set node attribute 'name' to 'val'
            -Ename=val  - Set edge attribute 'name' to 'val'
            -Kv         - Set layout engine to 'v' (overrides default based on command name)
            -s[scale]   - Set the scale (default 1)
    */

    const PipedProcess = require('../pipedprocess');
    const Command = require('../command');
    const defaultArguments = ['-Tsvg'];
    
    function generate(input, options) {
        let cmd = getCommand(input, options);
        let process = new PipedProcess();
        return process.execute(cmd.exec, cmd.args, cmd.input);
    }

    function getCommand(input, options) {
        return new Command('dot', getArguments(options), input);
    }

    function getArguments(options) {
        options = options || {};
        let args = defaultArguments;
        return args.concat(getScale(options['scale']))
            .concat(getEngine(options['engine']))
            .concat(getDefaults(options['graphAttributes'], '-G'))
            .concat(getDefaults(options['nodeAttributes'], '-N'))
            .concat(getDefaults(options['edgeAttributes'], '-E'));
    }

    function getDefaults(defaults, prefix) {
        let attributes = [];

        if (defaults) {
            for (const key of Object.keys(defaults)) {
                attributes.push(`${prefix}${key}=${defaults[key]}`);
            }    
        }

        return attributes;
    }
    
    function getScale(scale) {
        if (!scale) { return []; }
        return [`-s${scale}`];
    }

    function getEngine(engine) {
        if (!engine) { return []; }        
        return [`-K${engine}`];
    }    

    function lang() {
        return 'dot';
    }

    return {
        generate: generate,
        lang: lang,
        getCommand: getCommand
    };
})();