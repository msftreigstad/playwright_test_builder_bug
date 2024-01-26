import { createTestGroup, page } from "../fixtures/launch-helper";

createTestGroup('Test Group', [
  {
    name: 'First test',
    definition: async () => {
      page.goto('https://www.bing.com/');
    }
  }, 
  {
    name: 'Second test',
    definition: async () => {
      page.goto('https://www.bing.com/chat');
    }
  }
]);