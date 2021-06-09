import { Word } from './Word';

export type Zpdic = {
  alphabetOrder?: string;
  plainInformationTitles?: null | string[];
  informationTitleOrder?: null | string[];
  defaultWord?: null | Word;
};
