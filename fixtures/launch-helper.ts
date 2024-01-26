import { test as base, BrowserContext, Page } from "@playwright/test";

export let context: BrowserContext;
export let page: Page;

export type TestFixtures = {
  chatTestLauncher: () => Promise<[BrowserContext, Page]>;
};

export const test = base.extend<TestFixtures>({
  chatTestLauncher: async ({ playwright, browserName }, use, testInfo) => {
    await use(async () => {
      const context = await playwright[browserName].launchPersistentContext('', {
        headless: false,
        viewport: null,
        deviceScaleFactor: undefined,
        args: ['--disable-features=msForceBrowserSignIn,msImplicitSignin']
      });
      const page = await context.newPage();

      return [ context, page ];
    });
  }
});


type TestDefinition = {
  name: string;
  definition: () => Promise<void>;
}

export function createTestGroup(
    groupName: string,
    testDefinitions: TestDefinition[]) {
  test.describe(groupName, async () => {
    test.beforeEach(async ({ chatTestLauncher }) => {
      [context, page] = await chatTestLauncher();
    });
    for (const testDef of testDefinitions) {
      test(testDef.name, testDef.definition);
    }
  });
}