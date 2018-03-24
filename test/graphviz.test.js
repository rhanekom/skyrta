var skyrta = require('../index');
var SupportedLanguages = require('../lib/supportedlanguages');

test('generates valid svg graph', () => {
    let svg = skyrta.generate(SupportedLanguages.langDot, 'graph { no -- power; }');
    expect(svg.value).toMatch(/<svg[\s\S]*>[\s\S]*<\/svg>/m);
});