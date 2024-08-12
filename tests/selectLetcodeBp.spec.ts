import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { letcodePages } from './pages/letcodePages';


let browser: Browser;
let page: Page;

test.describe('navigate to https://letcode.in/test', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
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

    const letcode = new letcodePages(page);
    await test.step('click on "button"', async () => {
      await letcode.clickLink();
      await expect(page).toHaveURL('https://letcode.in/dropdowns');
    });


    await test.step('Select the apple using visible text', async () => {
        const fruitDropdown = letcode.fruitsDropdown;
        await expect(fruitDropdown).toBeVisible();
        await letcode.selectFruit('Apple')
        const selectedText = await letcode.selectedFruit();
        console.log('Selected text:', selectedText);
        await expect(selectedText).toBe('Apple');
    });

    await test.step('Select the apple using visible text', async () => {
        const superDropdown = letcode.superHeroDropdown;
        await expect(superDropdown).toBeVisible();
        await letcode.selectSuper('Batman');
        const selectedText = await letcode.selectedSuper();
        console.log('Selected text:', selectedText);
        await expect(selectedText).toBe('Batman');
    });

    await test.step('Select the last programming language and print all the options', async () => {
        const langDropdown = letcode.langDropdown;
        await expect(langDropdown).toBeVisible();
        const langs = await letcode.avaibleLang();
        console.log('All language available:', langs);
        const lastOptionValue = langs[langs.length - 1];
        await letcode.selectLang(lastOptionValue);
        console.log('Selected option:', lastOptionValue);
    });

    await test.step('Select India using value & print the selected value', async () => {
        const countryDropdown = letcode.countryDropdown;
        await expect(countryDropdown).toBeVisible();
        await letcode.selectCountry('India');
        const country = await letcode.selectedCountry();
        console.log('Selected text:', country);
    });
  });
});