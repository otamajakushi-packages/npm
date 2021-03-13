import IContent from './IContent';
import IEntry from './IEntry';
import IRelation from './IRelation';
import ITranslation from './ITranslation';
import IVariation from './IVariation';

export default interface IWord {
  entry: IEntry;
  translations: ITranslation[];
  tags: string[],
  contents: IContent[],
  variations: IVariation[],
  relations: IRelation[],
  [prop: string]: unknown,
}
