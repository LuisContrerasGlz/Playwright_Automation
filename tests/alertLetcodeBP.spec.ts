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
    await page.waitForTimeout(3000);
    await browser.close();
  });


  test('letcode - alert', async () => {
    await test.step('I am in https://letcode.in/test', async () => {
      await page.goto('https://letcode.in/test');
      await expect(page).toHaveTitle('LetCode - Testing Hub');
    });

    await test.step('click on "Dialog" link', async () => {
      const buttonLink = page.getByRole('link', { name: 'Dialog' });
      await buttonLink.click();
      await expect(page).toHaveURL('https://letcode.in/alert');
    });

    await test.step('Accept the Alert', async () => {
      // Listen for the alert and handle it
      page.once('dialog', async dialog => {
        await page.waitForTimeout(3000);
        await dialog.accept();
      });

      const buttonSimpleAlert = page.getByRole('button', { name: 'Simple Alert' });
      await buttonSimpleAlert.click(); 
    });

    await test.step('Dismiss the Alert & print the alert text', async () => {
      // Listen for the alert and handle it
      page.once('dialog', async dialog => {  
        console.log('Alert message:', dialog.message());
        await page.waitForTimeout(3000);
        await dialog.dismiss();
      });

      const buttonConfirmAlert = page.getByRole('button', { name: 'Confirm Alert' });
      await buttonConfirmAlert.click(); 
    });

    await test.step('Type your name & accept', async () => {
      page.once('dialog', async dialog => {
        await dialog.accept('Luis Francisco Contreras');
      });

      const buttonPromptAlert = page.getByRole('button', { name: 'Prompt Alert' });
      await buttonPromptAlert.click(); 
    });

    await test.step('Sweet alert', async () => {
      const buttonModernAlert = page.getByRole('button', { name: 'Modern Alert' });
      await buttonModernAlert.click();

      // Wait for the modern alert to be visible
      //const modernAlert = page.locator('//div[@class="modal-background"]');
      //await expect(modernAlert).toBeVisible();

      // Interact with the close button within the modern alert
      //const closeButton = modernAlert.locator('//button[@aria-label="close"]');
      //await closeButton.click();
      //await page.click('button:has-text("×")');

      // Optionally, you can wait for the alert to disappear
      //await expect(modernAlert).toBeHidden();
    });

  });
});
