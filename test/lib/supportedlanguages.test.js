const SupportedLanguages = require('../../lib/supportedlanguages');

test('getCommand has bobsvg', () => {
    const languages = new SupportedLanguages();    
    
    const cmd = languages.getCommand('bob');    
    expect(cmd).toBeTruthy();
});

test('getCommand has dot', () => {
    const languages = new SupportedLanguages();    
    
    const cmd = languages.getCommand('dot');
    expect(cmd).toBeTruthy();
});

test('getCommand has mermaid', () => {
    const languages = new SupportedLanguages();    
    
    const cmd = languages.getCommand('mermaid');
    expect(cmd).toBeTruthy();
});

test('getCommand performs normalizes case', () => {
    const languages = new SupportedLanguages();    
    expect(languages.getCommand('DOT')).toBeTruthy();
});

test('getCommand returns undefined on language not found', () => {
    const languages = new SupportedLanguages();    
    expect(languages.getCommand('gibberish')).toBeUndefined();
});

test('getCommand returns undefined if language is not specified', () => {
    const languages = new SupportedLanguages();
    expect(languages.getCommand(null)).toBeUndefined();
    expect(languages.getCommand(undefined)).toBeUndefined();
    expect(languages.getCommand('')).toBeUndefined();
});

test('getLanguages returns a list of the supported languages', () => {    
    const langs = new SupportedLanguages();
    expect(langs.languages).toContain('bob');
    expect(langs.languages).toContain('dot');
});