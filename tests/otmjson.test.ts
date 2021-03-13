import * as fs from 'fs';
import OTMJSON from '../src';
import { Otm } from '../src/Otm';

describe('OTMJSON', (): void => {
  test('OTMJSON.parse', (): void => {
    const json = fs.readFileSync('./tests/test.json', 'utf8');
    const dictionary = OTMJSON.parse(json);
    expect(dictionary.words.length).toBe(8);
  });

  type ZpdicOnline = {
    enableMarkdown: boolean;
  }

  type CustomOtm = Otm & {
    zpdicOnline: ZpdicOnline;
  }

  function hasZpdicOnline(
    otm: Otm | CustomOtm | Record<string, unknown>,
  ): otm is CustomOtm {
    return (otm as CustomOtm).zpdicOnline !== undefined;
  }

  test('OTMJSON.run', (): void => {
    const json = fs.readFileSync('./tests/test.json', 'utf8');
    const result = OTMJSON.run(json);
    if (result.ok) {
      const dictionary = result.result;
      if (hasZpdicOnline(dictionary)) {
        expect(dictionary.zpdicOnline.enableMarkdown).toBe(true);
      }
    }
  });
});
