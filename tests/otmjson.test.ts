import * as fs from 'fs';
import OTMJSON from '../src';

describe('OTMJSON.parse', (): void => {
  test('OTM-JSONの解析が成功するか', (): void => {
    const json = fs.readFileSync(
      './tests/lojbantan-zei-jbovlaste.json',
      'utf8',
    );
    const dictionary = OTMJSON.parse(json);
    expect(dictionary.words.length).toBe(4691);
  });
});
