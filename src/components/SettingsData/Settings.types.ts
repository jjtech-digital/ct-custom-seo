export enum NavItems {
  RULES = 'Rules',
  OPENAI = 'Open AI',
  AWS = 'AWS',
  GOOGLEAI = 'Google AI',
}

export interface ISelectedPageProps {
  title: string;
  isDefaultSelected: boolean;
  name: string;
}