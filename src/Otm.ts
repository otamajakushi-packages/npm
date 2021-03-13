import { Word } from './Word';
import { Zpdic } from './Zpdic';

export type Otm = {
  words: Word[];
  version?: number;
  zpdic?: Zpdic;
};
