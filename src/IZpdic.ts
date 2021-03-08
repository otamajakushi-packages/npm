import IWord from './IWord';

export default interface IZpdic {
  alphabetOrder?: string;
  plainInformationTitles?: string[];
  informationTitleOrder?: null | string[];
  defaultWord?: null | IWord;
}
