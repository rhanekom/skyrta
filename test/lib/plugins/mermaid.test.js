var skyrta = require('../../../index');
var mermaid = require('../../../lib/plugins/mermaid');

const tinyGraph = 'classDiagram\r\nClass01 <|-- AveryLongClass : Cool';

test('generates valid svg graph', () => {
  let svg = skyrta.generate('mermaid', tinyGraph, { 'puppeteerConfigFile': 'test/puppeteer-config.json' });
    expect(svg.value).toMatch(/<svg[\s\S]*>[\s\S]*<\/svg>/m);
});

test('generates valid svg graph with options', () => {
  let svg = skyrta.generate('mermaid', tinyGraph, { theme: 'forest', backgroundColor: 'white', 'puppeteerConfigFile': 'test/puppeteer-config.json' });
    expect(svg.value).toMatch(/<svg[\s\S]*>[\s\S]*<\/svg>/m);
});


test('getCommand has correct executable for mermaid', () => {
    const cmd = mermaid.getCommand(tinyGraph);
    expect(cmd.exec).toContain('mmdc');
});

test('getCommand has input and output parameters for generation', () => {
    const cmd = mermaid.getCommand(tinyGraph);
    expect(cmd.args).toContain('--input');
    expect(cmd.args).toContain('--output');
    expect(cmd.args.length).toBeGreaterThanOrEqual(4);
});


test('options theme is translated to --theme', () => {
    const cmd = mermaid.getCommand(tinyGraph, { theme: 'default'});
    expect(cmd.args).toContain('--theme');
    expect(cmd.args).toContain('default');
});


test('options width is translated to --width', () => {
    const cmd = mermaid.getCommand(tinyGraph, { width: 800});
    expect(cmd.args).toContain('--width');
    expect(cmd.args).toContain('800');
});

test('options height is translated to --height', () => {
    const cmd = mermaid.getCommand(tinyGraph, { height: 600});
    expect(cmd.args).toContain('--height');
    expect(cmd.args).toContain('600');
});

test('options backgroundColor is translated to --backgroundColor', () => {
    const cmd = mermaid.getCommand(tinyGraph, { backgroundColor: 'white'});
    expect(cmd.args).toContain('--backgroundColor');
    expect(cmd.args).toContain('white');
});

test('options configFile is translated to --configFile', () => {
    const cmd = mermaid.getCommand(tinyGraph, { configFile: 'config.js'});
    expect(cmd.args).toContain('--configFile');
    expect(cmd.args).toContain('config.js');
});

test('options cssFile is translated to --cssFile', () => {
    const cmd = mermaid.getCommand(tinyGraph, { cssFile: 'styles.css'});
    expect(cmd.args).toContain('--cssFile');
    expect(cmd.args).toContain('styles.css');
});

test('options puppeteerConfigFile is translated to --puppeteerConfigFile', () => {
    const cmd = mermaid.getCommand(tinyGraph, { puppeteerConfigFile: 'puppeteer.js'});
    expect(cmd.args).toContain('--puppeteerConfigFile');
    expect(cmd.args).toContain('puppeteer.js');
});
