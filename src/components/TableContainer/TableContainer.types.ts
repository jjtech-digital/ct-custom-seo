export interface LocaleType {
  locale: string;
  value: string;
}
export interface MasterDataCurrentType {
  name: string;
  nameAllLocales: LocaleType[];
  title?: string | null;
  description: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}
export interface MasterDataType {
  current: MasterDataCurrentType;
}
export interface IProduct {
  id: string;
  key: string;
  masterData: MasterDataType;
}
export interface IFetchrawData{
  data:IProduct[]
  limit:string
  message:string
  offset:string
  status:number
  total:number
}

export interface IResponseFromAi {
  id: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
}
