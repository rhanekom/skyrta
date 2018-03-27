'use strict';

module.exports = class Command {
    constructor(exec, options, input) {
        this.exec = exec;
        this.args = options || [];
        this.input = input || '';
    }
};