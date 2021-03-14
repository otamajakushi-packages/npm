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
  intersection,
} from '@mojotech/json-type-validation';
import { ContentWithMarkdown, Otm, OtmWithMarkdown, WordWithMarkdown } from './Otm';
import { Entry } from './Entry';
import { Word } from './Word';
import { Zpdic } from './Zpdic';
import { Translation } from './Translation';
import { Variation } from './Variation';
import { Content } from './Content';
import { Relation } from './Relation';

class OTMJSON {
  static entryDecoder: Decoder<Entry> = object({
    id: number(),
    form: string(),
  });

  static translationDecoder: Decoder<Translation> = object({
    title: string(),
    forms: array(string()),
  });

  static contentDecoder: Decoder<Content> = object({
    title: string(),
    text: string(),
  });

  static variationDecoder: Decoder<Variation> = object({
    title: string(),
    form: string(),
  });

  static relationDecoder: Decoder<Relation> = object({
    title: string(),
    entry: OTMJSON.entryDecoder,
  });

  static wordDecoder: Decoder<Word> = object({
    entry: OTMJSON.entryDecoder,
    translations: array(OTMJSON.translationDecoder),
    tags: array(string()),
    contents: array(OTMJSON.contentDecoder),
    variations: array(OTMJSON.variationDecoder),
    relations: array(OTMJSON.relationDecoder),
  });

  static zpdicDecoder: Decoder<Zpdic> = object({
    alphabetOrder: optional(string()),
    plainInformationTitles: optional(array(string())),
    informationTitleOrder: optional(union(constant(null), array(string()))),
    defaultWord: optional(union(constant(null), OTMJSON.wordDecoder)),
  });

  static contentWithMarkdownDecoder: Decoder<ContentWithMarkdown> = object({
    title: string(),
    text: string(),
    markdown: string(),
  });

  static wordWithMarkdownDecoder: Decoder<WordWithMarkdown> = object( {
    entry: OTMJSON.entryDecoder,
    translations: array(OTMJSON.translationDecoder),
    tags: array(string()),
    contents: array(OTMJSON.contentWithMarkdownDecoder),
    variations: array(OTMJSON.variationDecoder),
    relations: array(OTMJSON.relationDecoder),
  });

  static otmWithMarkdownDecoder: Decoder<OtmWithMarkdown> = object( {
    words: array(OTMJSON.wordWithMarkdownDecoder),
    version: optional(number()),
    zpdic: optional(OTMJSON.zpdicDecoder),
    zpdicOnline: object( {
      explanation: string(),
      enableMarkdown: constant(true),
    }),
  });

  static otmDecoder: Decoder<Otm> = union(
    object({
      words: array(OTMJSON.wordDecoder),
      version: optional(number()),
      zpdic: optional(OTMJSON.zpdicDecoder),
    }),
    object({
      words: array(OTMJSON.wordDecoder),
      version: optional(number()),
      zpdic: optional(OTMJSON.zpdicDecoder),
      zpdicOnline: object({
        explanation: string(),
        enableMarkdown: constant(false),
      }),
    }),
    OTMJSON.otmWithMarkdownDecoder,
  );

  static parse = (
    text: string,
    reviver?:
      | ((this: unknown, key: string, value: unknown) => unknown)
      | undefined,
  ): Otm => OTMJSON.otmDecoder.runWithException(JSON.parse(text, reviver));

  static run = (
    text: string,
    reviver?:
      | ((this: unknown, key: string, value: unknown) => unknown)
      | undefined,
  ): Result.Result<Record<string, unknown>, DecoderError> =>
    dict(anyJson()).run(JSON.parse(text, reviver));
}

export default OTMJSON;
