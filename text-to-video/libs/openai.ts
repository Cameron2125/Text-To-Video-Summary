import {Configuration, OpenAIApi} from 'openai';
const configuration = new Configuration({
  organization: "org-oBDWTD50zACNX3mC3hTDTH4C",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai; 
