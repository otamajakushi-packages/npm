import { Word } from './Word';

export type Zpdic = {
  alphabetOrder?: string;
  plainInformationTitles?: string[];
  informationTitleOrder?: null | string[];
  defaultWord?: null | Word;
};
