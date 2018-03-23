'use strict';

module.exports = class PipedProcess {
    constructor(defaultClassName) {
        this.defaultClassName = defaultClassName || PipedProcess.defaultClassName();
    }

    run(cmd, args, input) {
        let output = this.execute(cmd, args, input);
        let className = this.defaultClassName;
        return `<div class="${className} ${className}-${cmd}">${output}</div>`;
    }

    execute(cmd, args, cmdInput) {
        const process = require('child_process');
        
        const p = process.spawnSync(cmd, args || [], { 
            detached: false,
            input : cmdInput,
            stdio: 'pipe',
            encoding: 'utf-8'
        });
        
        let code = p.status;

        if (code !== 0) {
            throw Error(`Non-0 status code returned from ${cmd} : ${p.status}\n${p.stderr}`);
        }

        let stdout = p.stdout.toString('utf8');
        return stdout;
    }

    static defaultClassName() {
        return 'skyrta-draw';
    }
};