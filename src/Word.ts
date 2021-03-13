import { Content } from './Content';
import { Entry } from './Entry';
import { Relation } from './Relation';
import { Translation } from './Translation';
import { Variation } from './Variation';

export type Word = {
  entry: Entry;
  translations: Translation[];
  tags: string[];
  contents: Content[];
  variations: Variation[];
  relations: Relation[];
  [prop: string]: unknown;
};
