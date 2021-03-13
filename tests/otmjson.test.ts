import * as fs from 'fs';
import OTMJSON from '../src';
import IOtm from '../src/IOtm';

describe('OTMJSON', (): void => {
  test('OTMJSON.parse', (): void => {
    const json = fs.readFileSync('./tests/test.json', 'utf8');
    const dictionary = OTMJSON.parse(json);
    expect(dictionary.words.length).toBe(8);
  });

  interface IZpdicOnline {
    enableMarkdown: boolean
  }

  interface ICustomOtm extends IOtm {
    zpdicOnline: IZpdicOnline;
  }

  function hasZpdicOnline(otm: IOtm | ICustomOtm | Record<string, unknown>): otm is ICustomOtm {
    return (otm as ICustomOtm).zpdicOnline !== undefined;
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
