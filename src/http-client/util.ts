import { HttpClientRequestOptions, TxnAuthJSON } from './interfaces';

export function buildTxnAuthReqOptions(
  txnAuthObj: TxnAuthJSON,
  baseURL: string,
): HttpClientRequestOptions {
  const advices = txnAuthObj.advices ? txnAuthObj.advices.TransactionConditionAdvice : [];
  const transactionID = advices.reduce((prev: string, curr: string) => {
    prev = `${prev} ${curr}`;
    return prev;
  }, '');

  const openTags = `<Advices><AttributeValuePair>`;
  const nameTag = `<Attribute name="TransactionConditionAdvice"/>`;
  const valueTag = `<Value>${transactionID}</Value>`;
  const endTags = `</AttributeValuePair></Advices>`;
  const fullXML = `${openTags}${nameTag}${valueTag}${endTags}`;

  const url = new URL(`${baseURL}json/realms/root/authenticate`);
  url.searchParams.set('authIndexType', 'composite_advice');
  url.searchParams.set('authIndexValue', fullXML);

  const options = {
    init: {
      method: 'POST',
    },
    timeout: 0,
    url: url.toString(),
  };
  return options;
}

export async function examineForIGTxnAuth(res: Response): Promise<boolean> {
  const type = res.headers.get('Content-Type') || '';
  return Promise.resolve(type.includes('html') && res.url.includes('composite_advice'));
}

export async function examineForRESTTxnAuth(res: Response): Promise<boolean> {
  const json = await res.json();
  return !!json.advices;
}

function getTxnIdFromURL(urlString: string): string {
  const url = new URL(urlString);
  const value = url.searchParams.get('authIndexValue');
  return value || '';
}

export async function normalizeIGJSON(res: Response): Promise<TxnAuthJSON> {
  return Promise.resolve({
    resource: '',
    actions: {},
    attributes: {},
    advices: {
      TransactionConditionAdvice: [getTxnIdFromURL(res.url)],
    },
    ttl: 0,
  });
}

export async function normalizeRESTJSON(res: Response): Promise<TxnAuthJSON> {
  return await res.json();
}
