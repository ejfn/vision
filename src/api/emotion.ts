import { decode } from 'base-64';

import { EmotionResult } from '../types/api';

// const API_KEY: string = '********';

export async function emotionDetect(base64: string): Promise<Array<EmotionResult>> {

  const url: string = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize';

  const request: Request = new Request(
    url,
    {
      method: 'POST',
      body: b64toBinary(base64),
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': API_KEY
      }
    }
  );

  const response: Response = await fetch(request);
  if (!response.ok) {
    // tslint:disable-next-line:no-unsafe-any
    throw new Error((await response.json()).error.message);
  }

  return response.json() as Promise<Array<EmotionResult>>;
}

function b64toBinary(b64Data: string): Uint8Array {
  const byteCharacters: string = decode(b64Data);
  const byteNumbers: Array<number> = [];
  for (let i: number = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  return new Uint8Array(byteNumbers);
}
