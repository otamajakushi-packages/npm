import { Word } from './Word';
import { Zpdic } from './Zpdic';
import { ZpdicOnline } from './ZpdicOnline';

export type Otm = {
  words: Word[];
  version?: number;
  zpdic?: Zpdic;
  zpdicOnline?: ZpdicOnline;
};
