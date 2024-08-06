import { test, expect, chromium, Browser, Page } from '@playwright/test';

let browser: Browser;
let page: Page;

test.describe('navigate to https://letcode.in/test', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: true }); 
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('letcode - edit ', async () => {
    await test.step('I am in https://letcode.in/test', async () => {
      await page.goto('https://letcode.in/test');
      await expect(page).toHaveTitle('LetCode - Testing Hub')
    });

    await test.step('click en "Edit"', async () => {
      const editLink = page.locator('a:text("Edit")');
      await editLink.click(); 
      await expect(page).toHaveURL('https://letcode.in/edit')
    });

    await test.step('fill the full name', async () => {
      const fullNameInput = page.locator('#fullName'); 
      await fullNameInput.fill('Luis Francisco Contreras Gonzalez'); 
    });

    await test.step('fill the text and press keyboard tab', async () => {
      const joinInput = page.locator('#join'); 
      await joinInput.fill('I am excellent');
      await joinInput.press('Tab');
    });

    await test.step('get the text', async () => {
      const getMeInput = page.locator('#getMe'); 
      const inputValue = await getMeInput.inputValue();
      console.log('This is the text inside the text box:', inputValue);
    });

    await test.step('clear the text', async () => {
      const clearMeInput = page.locator('#clearMe'); 
      await clearMeInput.clear();
      console.log('I cleaned the text');
    });

    await test.step('text is disabled', async () => {
      const noEditInput = page.locator('#noEdit'); 
      const isDisabled = await noEditInput.isDisabled();
      console.log('Text is disabled:', isDisabled);
    });

    await test.step('text is readonly', async () => {
      const dontWriteInput = page.locator('#dontwrite'); 
      const isReadonly = await dontWriteInput.isEditable();
      console.log('Text is readonly:', !isReadonly);
    });
  });
});
