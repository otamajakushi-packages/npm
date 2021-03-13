import Word from './Word';
import Zpdic from './Zpdic';

export default interface Otm {
  words: Word[];
  version?: number;
  zpdic?: Zpdic;
}
