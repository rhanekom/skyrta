'use strict';

module.exports = (function() {

    const stripDimensions = require('./stripDimensionsTransformer')

    function transform(data, options) {
        return stripDimensions.transform(data, options);
    }

    return {
        transform: transform
    };
})();