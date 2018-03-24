'use strict';

module.exports = class Language {
    constructor(name, exec, params) {
        this.name = name;
        this.exec = exec;
        this.params = params;
    }
};