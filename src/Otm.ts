import { Content } from './Content';
import { Entry } from './Entry';
import { Relation } from './Relation';
import { Translation } from './Translation';
import { Variation } from './Variation';
import { Word } from './Word';
import { Zpdic } from './Zpdic';
import { ZpdicOnline } from './ZpdicOnline';

export type ContentWithMarkdown = {
  title: string;
  text: string;
  markdown: string;
};

export type WordWithMarkdown = {
  entry: Entry;
  translations: Translation[];
  tags: string[];
  contents: ContentWithMarkdown[];
  variations: Variation[];
  relations: Relation[];
};
export interface OtmWithMarkdown {
  words: WordWithMarkdown[];
  version?: number;
  zpdic?: Zpdic;
  zpdicOnline: ZpdicOnline & {
    enableMarkdown: true;
  };
}

export type Otm =
  | {
      words: Word[];
      version?: number;
      zpdic?: Zpdic;
    }
  | {
      words: Word[];
      version?: number;
      zpdic?: Zpdic;
      zpdicOnline: ZpdicOnline & {
        enableMarkdown: false;
      };
    }
  | OtmWithMarkdown;

export function hasMarkdown(otm: Otm | OtmWithMarkdown): otm is OtmWithMarkdown {
  return (otm as OtmWithMarkdown).words.every(x =>
    x.contents.every(y => y.markdown !== undefined),
  );
}
