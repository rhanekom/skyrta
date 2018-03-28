'use strict';

module.exports = class Command {
    constructor(exec, options, input, tmpfiles) {
        this.exec = exec;
        this.args = options || [];
        this.input = input || '';
        this.tmpfiles = tmpfiles || [];
    }
};