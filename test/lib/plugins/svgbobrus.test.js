var skyrta = require('../../../index');
var svgbob = require('../../../lib/plugins/svgbob');

test('generates valid svg graph', () => {
    let svg = skyrta.generate('bob', '--------->');
    expect(svg.value).toMatch(/<svg[\s\S]*>[\s\S]*<\/svg>/m);
});

test('generates valid svg graph with options', () => {
    let svg = skyrta.generate('bob', '--------->', { 'fontSize' : 14 });
    expect(svg.value).toMatch(/<svg[\s\S]*>[\s\S]*<\/svg>/m);
});

test('generates valid svg graph with invalid options', () => {
    let svg = skyrta.generate('bob', '--------->', { 'stuff' : 14 });
    expect(svg.value).toMatch(/<svg[\s\S]*>[\s\S]*<\/svg>/m);
});

test('getCommand has correct executable for bobsvg', () => {
    const cmd = svgbob.getCommand();
    expect(cmd.exec).toBe('svgbob');
    expect(cmd.args).toBeDefined();
    expect(cmd.args.length).toBe(0);
});

test('options fontFamily gets translated to --font-family', () => {
    const cmd = svgbob.getCommand('', { 'fontFamily': 'arial'});
    expect(cmd.args.length).toBe(2);
    expect(cmd.args[0]).toBe('--font-family');
    expect(cmd.args[1]).toBe('arial');
});

test('options fontSize gets translated to --font-size', () => {
    const cmd = svgbob.getCommand('', { 'fontSize': 4});
    expect(cmd.args.length).toBe(2);
    expect(cmd.args[0]).toBe('--font-size');
    expect(cmd.args[1]).toBe('4');
});

test('options scale gets translated to --scale', () => {
    const cmd = svgbob.getCommand('', { 'scale': 4});
    expect(cmd.args.length).toBe(2);
    expect(cmd.args[0]).toBe('--scale');
    expect(cmd.args[1]).toBe('4');
});

test('options strokeWidth gets translated to --stroke-width', () => {
    const cmd = svgbob.getCommand('', { 'strokeWidth': '6'});
    expect(cmd.args.length).toBe(2);
    expect(cmd.args[0]).toBe('--stroke-width');
    expect(cmd.args[1]).toBe('6');
});