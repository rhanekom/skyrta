var skyrta = require('../../../index');
var graphviz = require('../../../lib/plugins/graphviz');

function simpleGraph(options) {
    return skyrta.generate('dot', 'graph { no -- power; }', options);
}

test('generates valid svg graph', () => {
    let svg = simpleGraph();
    expect(svg.value).toMatch(/<svg[\s\S]*>[\s\S]*<\/svg>/m);
});

test('generates valid svg graph with options', () => {
    let svg = simpleGraph({ engine: 'neato', scale: 72, graphAttributes : { 'forcelabels': false }});
    expect(svg.value).toMatch(/<svg[\s\S]*>[\s\S]*<\/svg>/m);
});

test('fails on invalid engine', () => {
    expect(() => simpleGraph({ engine: 'random' }))
        .toThrowError('no layout engine');
});

test('getCommand has correct executable for dot', () => {
    const cmd = graphviz.getCommand();    
    expect(cmd.exec).toBe('dot');

    // Important that we specify output to SVG as this not the default
    expect(cmd.args).toContain('-Tsvg');
});

test('options engine gets translated to -Kv', () => {
    const cmd = graphviz.getCommand('', { 'engine': 'neato'});
    expect(cmd.args).toContain('-Kneato');
});

test('options scale gets translated to -s', () => {
    const cmd = graphviz.getCommand('', { 'scale': 3});
    expect(cmd.args).toContain('-s3');
});

test('options graphAttributes get translated to -G nodes', () => {
    const cmd = graphviz.getCommand('', { 
        'graphAttributes': {
            'forcelabels': true,
            'levels': 5
        }
    });
    
    expect(cmd.args).toContain('-Gforcelabels=true');
    expect(cmd.args).toContain('-Glevels=5');
});

test('options edgeAttributes get translated to -E nodes', () => {
    const cmd = graphviz.getCommand('', { 
        'edgeAttributes': {
            'edgeURL': 'https://www.google.com',
            'decorate': true
        }
    });
    
    expect(cmd.args).toContain('-EedgeURL=https://www.google.com');
    expect(cmd.args).toContain('-Edecorate=true');
});

test('options nodeAttributes get translated to -N nodes', () => {
    const cmd = graphviz.getCommand('', { 
        'nodeAttributes': {
            'fixedsize': 'true',
            'fontcolor': 'red'
        }
    });
    
    expect(cmd.args).toContain('-Nfixedsize=true');
    expect(cmd.args).toContain('-Nfontcolor=red');
});
