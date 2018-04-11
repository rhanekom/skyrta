var skyrta = require('../../../index');
var svgbob = require('../../../lib/plugins/svgbob');

var bobsample = `<svg class="bob" font-family="arial" font-size="14" height="16" width="80" xmlns="http://www.w3.org/2000/svg">
    <defs>
    <marker id="triangle" markerHeight="10" markerUnits="strokeWidth" markerWidth="10" orient="auto" refX="15" refY="10" viewBox="0 0 50 20">
    <path d="M 0 0 L 30 10 L 0 20 z"/>
    </marker>
    </defs>
    <style>

        line, path {
        stroke: black;
        stroke-width: 2;
        stroke-opacity: 1;
        fill-opacity: 1;
        stroke-linecap: round;
        stroke-linejoin: miter;
        }
        circle {
        stroke: black;
        stroke-width: 2;
        stroke-opacity: 1;
        fill-opacity: 1;
        stroke-linecap: round;
        stroke-linejoin: miter;
        }
        circle.solid {
        fill:black;
        }
        circle.open {
        fill:transparent;
        }
        tspan.head{
            fill: none;
            stroke: none;
        }
        
    </style>
    <path d=" M 0 8 L 8 8 M 0 8 L 8 8 L 16 8 M 8 8 L 16 8 L 24 8 M 16 8 L 24 8 L 32 8 M 24 8 L 32 8 L 40 8 M 32 8 L 40 8 L 48 8 M 40 8 L 48 8 L 56 8 M 48 8 L 56 8 L 64 8 M 56 8 L 64 8" fill="none"/>
    <path d="" fill="none" stroke-dasharray="3 3"/>
    <line marker-end="url(#triangle)" x1="64" x2="76" y1="8" y2="8"/>
    <line marker-end="url(#triangle)" x1="64" x2="76" y1="8" y2="8"/>
    <line marker-end="url(#triangle)" x1="72" x2="76" y1="8" y2="8"/>
</svg>`

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