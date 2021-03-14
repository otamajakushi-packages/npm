import * as fs from 'fs';
import OTMJSON from '../src';
import { Otm } from '../src/Otm';

describe('OTMJSON', (): void => {
  test('OTMJSON.parse', (): void => {
    const json = fs.readFileSync('./tests/test.json', 'utf8');
    const dictionary = OTMJSON.parse(json);
    expect(dictionary.words.length).toBe(8);
  });

  test('OTMJSON.parse 2', (): void => {
    const json = fs.readFileSync('./tests/test.json', 'utf8');
    const dictionary = OTMJSON.parse(json);
    expect(dictionary.words[0].contents[0].markdown).toBe(
      'C言語で `(*ptr)++;` に相当する。',
    );
  });

  type CustomOtm = Otm & {
    humanLanguage: boolean;
  };

  function hasHumanLanguage(
    otm: Otm | CustomOtm | Record<string, unknown>,
  ): otm is CustomOtm {
    return (otm as CustomOtm).humanLanguage !== undefined;
  }

  test('OTMJSON.run', (): void => {
    const json = fs.readFileSync('./tests/test.json', 'utf8');
    const result = OTMJSON.run(json);
    if (result.ok) {
      const dictionary = result.result;
      if (hasHumanLanguage(dictionary)) {
        expect(dictionary.humanLanguage).toBe(false);
      }
    }
  });
});
