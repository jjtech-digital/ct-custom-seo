import { createRules } from '../fetcherFunction/ruleFetcher';

export function useSettings() {
  const createRuleshandler = async (payload: any, setState: Function) => {
    const response = await createRules(payload, setState);
    return response;
  };
  return { createRuleshandler };
}
