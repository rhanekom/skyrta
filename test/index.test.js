var SupportedLanguages = require('../lib/supportedlanguages');

var skyrta = require('../index');

const invalidLanguage = 'gibberish';
const invalidExecutable = 'cataaaqaa';

test('generate throws error when no matching language type is provided', () => {
    expect(() => skyrta.generate(invalidLanguage, 'any source')).toThrowError('Unsupported language');
});

test('generate contains list of languages when no matching language is found', () => {
    expect(() => skyrta.generate(invalidLanguage, 'any source')).toThrowError(SupportedLanguages.langBob);
});

test('generate throws error if no source is provided', () => {
    expect(() => skyrta.generate(SupportedLanguages.langBob, null)).toThrowError('No source');
    expect(() => skyrta.generate(SupportedLanguages.langBob, undefined)).toThrowError('No source');
});


test('generate throws error if invalid executable returned from supported languages', () => {
    skyrta.supportedLanguages().addLanguage(invalidLanguage, 'cataaqaaa', []);
    expect(() => skyrta.generate(invalidLanguage, '{ graph }')).toThrowError('Unable to render');
});