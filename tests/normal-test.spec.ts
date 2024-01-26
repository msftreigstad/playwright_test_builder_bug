import { BrowserContext, Page } from "playwright/test";
import { test } from "../fixtures/launch-helper";

export let context: BrowserContext;
export let page: Page;

test.beforeEach(async ({ chatTestLauncher }) => {
  [context, page] = await chatTestLauncher();
});

test('Normal test', async () => {
  await page.goto('https://www.bing.com/');
});