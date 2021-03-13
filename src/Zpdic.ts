import Word from './Word';

export default interface Zpdic {
  alphabetOrder?: string;
  plainInformationTitles?: string[];
  informationTitleOrder?: null | string[];
  defaultWord?: null | Word;
}
