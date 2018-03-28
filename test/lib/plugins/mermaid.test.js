var skyrta = require('../../../index');
// var mermaid = require('../../../lib/plugins/mermaid');

test('generates valid svg graph', () => {
    let svg = skyrta.generate('mermaid', 'classDiagram\r\nClass01 <|-- AveryLongClass : Cool');
    expect(svg.value).toMatch(/<svg[\s\S]*>[\s\S]*<\/svg>/m);
});
