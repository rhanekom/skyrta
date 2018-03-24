'use strict';

module.exports = class PipedProcess {
    run(cmd, args, input) {
        return this.execute(cmd, args, input);
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
};