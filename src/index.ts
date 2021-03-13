import {
  Decoder,
  object,
  string,
  optional,
  number,
  array,
  constant,
  union,
  dict,
  anyJson,
  DecoderError,
  Result,
} from '@mojotech/json-type-validation';
import IOtm from './IOtm';
import IEntry from './IEntry';
import IWord from './IWord';
import IZpdic from './IZpdic';
import ITranslation from './ITranslation';
import IVariation from './IVariation';
import IContent from './IContent';
import IRelation from './IRelation';

class OTMJSON {
  static entryDecoder: Decoder<IEntry> = object({
    id: number(),
    form: string(),
  });

  static translationDecoder: Decoder<ITranslation> = object({
    title: string(),
    forms: array(string()),
  });

  static contentDecoder: Decoder<IContent> = object({
    title: string(),
    text: string(),
  });

  static variationDecoder: Decoder<IVariation> = object({
    title: string(),
    form: string(),
  });

  static relationDecoder: Decoder<IRelation> = object({
    title: string(),
    entry: OTMJSON.entryDecoder,
  });

  static wordDecoder: Decoder<IWord> = object({
    entry: OTMJSON.entryDecoder,
    translations: array(OTMJSON.translationDecoder),
    tags: array(string()),
    contents: array(OTMJSON.contentDecoder),
    variations: array(OTMJSON.variationDecoder),
    relations: array(OTMJSON.relationDecoder),
  });

  static zpdicDecoder: Decoder<IZpdic> = object({
    alphabetOrder: optional(string()),
    plainInformationTitles: optional(array(string())),
    informationTitleOrder: optional(union(constant(null), array(string()))),
    defaultWord: optional(union(constant(null), OTMJSON.wordDecoder)),
  });

  static otmDecoder: Decoder<IOtm> = object({
    words: array(OTMJSON.wordDecoder),
    version: optional(number()),
    zpdic: optional(OTMJSON.zpdicDecoder),
  });

  static parse = (
    text: string,
    reviver?:
      | ((this: unknown, key: string, value: unknown) => unknown)
      | undefined,
  ): IOtm => OTMJSON.otmDecoder.runWithException(JSON.parse(text, reviver));

  static run = (
    text: string,
    reviver?:
      | ((this: unknown, key: string, value: unknown) => unknown)
      | undefined,
  ): Result.Result<Record<string, unknown>, DecoderError> =>
    dict(anyJson()).run(JSON.parse(text, reviver));
}

export default OTMJSON;
