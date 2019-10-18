import fs from 'fs';
import { ElementHandle, Page } from 'puppeteer-core';

function mkdir(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

async function $(page: Page, selector: string): Promise<ElementHandle<Element>> {
  const el = await page.waitForSelector(selector);
  if (el === null) {
    throw new Error(`Element not found: ${selector}`);
  }
  return el;
}

async function getHtml(page: Page, selector: string): Promise<string> {
  const el = await page.waitForSelector(selector);
  const html = await getInnerHtml(el);
  return html;
}

async function getJson(page: Page): Promise<any> {
  const html = await getHtml(page, '#sdk-json');
  return JSON.parse(html);
}

const createNativeFn = (fn: (nativeElement: Element) => any) => async (element: ElementHandle) =>
  await element.executionContext().evaluate(fn, element);

const getInnerHtml = createNativeFn((nativeElement: Element) => nativeElement.innerHTML);

export { $, getHtml, getJson, mkdir };
