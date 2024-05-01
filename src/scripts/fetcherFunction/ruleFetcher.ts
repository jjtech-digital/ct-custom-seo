import axios from 'axios';
import { apiBaseUrl } from '../../constants';

export const createRules = async (payload: any, setState: Function) => {
  const prompts = payload.rulesContent.map(
    (rule: { rulesInput: any }) => rule.rulesInput
  );
  const body = {
    rules: prompts,
  };
  try {
    setState((prev: any) => ({ ...prev, isApiFetching: true }));
    const response = await axios.post(
      `${apiBaseUrl}/rule/create-rules`,
      body
    );
    setState((prev: any) => ({ ...prev, isApiFetching: false }));
    return response?.data;
  } catch (error) {
    setState((prev: any) => ({ ...prev, isApiFetching: false }));
    console.log(error);
    return error;
  }
};
