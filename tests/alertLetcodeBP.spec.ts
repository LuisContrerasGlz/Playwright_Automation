import { test, expect, chromium, Browser, Page } from '@playwright/test';

let browser: Browser;
let page: Page;

test.describe('navigate to https://letcode.in/test', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await page.waitForTimeout(5000);
    await browser.close();
  });

  test('letcode - edit', async () => {
    await test.step('I am in https://letcode.in/test', async () => {
      await page.goto('https://letcode.in/test');
      await expect(page).toHaveTitle('LetCode - Testing Hub');
    });

    await test.step('click on "button"', async () => {
      const buttonLink = page.getByRole('link', { name: 'Dialog' });
      await buttonLink.click();
      await expect(page).toHaveURL('https://letcode.in/alert');
    });


  });
});