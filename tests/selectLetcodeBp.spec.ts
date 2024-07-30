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
      const buttonLink = page.getByRole('link', { name: 'Drop-Down' });
      await buttonLink.click();
      await expect(page).toHaveURL('https://letcode.in/dropdowns');
    });


    await test.step('Select the apple using visible text', async () => {
        const dropdown = page.locator('#fruits');
        await expect(dropdown).toBeVisible();
        await dropdown.selectOption({ label: 'Apple' });
        const selectedText = await dropdown.evaluate(el => {
            const selectElement = el as HTMLSelectElement;
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            return selectedOption ? selectedOption.text : '';
        });
        console.log('Selected text:', selectedText);
        await expect(selectedText).toBe('Apple');
    });

    await test.step('Select the apple using visible text', async () => {
        const dropdown = page.locator('#superheros');
        await expect(dropdown).toBeVisible();
        await dropdown.selectOption({ label: 'Batman' });
        const selectedText = await dropdown.evaluate(el => {
            const selectElement = el as HTMLSelectElement;
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            return selectedOption ? selectedOption.text : '';
        });
        console.log('Selected text:', selectedText);
        await expect(selectedText).toBe('Batman');
    });

    await test.step('Select the last programming language and print all the options', async () => {
        const langDropdown = page.locator('#lang');
        await expect(langDropdown).toBeVisible();
        const options = await langDropdown.evaluate(el => {
          const selectElement = el as HTMLSelectElement;
          return Array.from(selectElement.options).map(option => option.text);
        });
        console.log('All language available:', options);
        const lastOptionValue = options[options.length - 1];
        await langDropdown.selectOption({ label: lastOptionValue });
        console.log('Selected option:', lastOptionValue);
    });

    await test.step('Select India using value & print the selected value', async () => {
        const countryDropdown = page.locator('#country');
        await expect(countryDropdown).toBeVisible();
        await countryDropdown.selectOption({ label: 'India' });
        const selectedText = await countryDropdown.evaluate(el => {
            const selectElement = el as HTMLSelectElement;
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            return selectedOption ? selectedOption.text : '';
        });
        console.log('Selected text:', selectedText);
    });


    await test.step('Select India using value & print the selected value', async () => {
        const countryDropdown = page.locator('#country');
        await expect(countryDropdown).toBeVisible();
        const options = await countryDropdown.evaluate(el => {
          const selectElement = el as HTMLSelectElement;
          return Array.from(selectElement.options).map(option => option.text);
        });
        const index = options.indexOf('India');
        await countryDropdown.selectOption({ index });
        const selectedText = await countryDropdown.evaluate(el => {
          const selectElement = el as HTMLSelectElement;
          const selectedOption = selectElement.options[selectElement.selectedIndex];
          return selectedOption ? selectedOption.text : '';
        });
        console.log('Selected text:', selectedText);
        await expect(selectedText).toBe('India');
    });

  });
});