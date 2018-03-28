var skyrta = require('../index');

const validLanguage = 'bob';
const invalidLanguage = 'gibberish';

test('generate throws error when no matching language type is provided', () => {
    expect(() => skyrta.generate(invalidLanguage, 'any source')).toThrowError('Unsupported language');
});

test('generate contains list of languages when no matching language is found', () => {
    expect(() => skyrta.generate(invalidLanguage, 'any source')).toThrowError(validLanguage);
});

test('generate throws error if no source is provided', () => {
    expect(() => skyrta.generate(validLanguage, null)).toThrowError('No source');
    expect(() => skyrta.generate(validLanguage, undefined)).toThrowError('No source');
});

test('generate throws error if invalid executable returned from supported languages', () => {
    skyrta.supportedLanguages().addLanguage({
        lang: () => invalidLanguage,
        generate: () => { throw Error('oops'); }
    });
    expect(() => skyrta.generate(invalidLanguage, '{ graph }')).toThrowError('Unable to render');
});