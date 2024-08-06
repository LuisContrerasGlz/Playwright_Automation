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
    await browser.close();
  });

  test('letcode - alert', async () => {
    await test.step('I am in https://letcode.in/test', async () => {
      await page.goto('https://letcode.in/test');
      await expect(page).toHaveTitle('LetCode - Testing Hub');
    });

    await test.step('click on "Table" link', async () => {
      const buttonLink = page.getByRole('link', { name: 'Advance Table' });
      await buttonLink.click();
      await expect(page).toHaveURL('https://letcode.in/advancedtable');
    });

    await test.step('Select 10 entries', async () => {
      const dropdown = page.locator('#advancedtable_length select');;
      await expect(dropdown).toBeVisible();
      await dropdown.selectOption({ label: '10' });
      const selectedText = await dropdown.evaluate(el => {
          const selectElement = el as HTMLSelectElement;
          const selectedOption = selectElement.options[selectElement.selectedIndex];
          return selectedOption ? selectedOption.text : '';
      });
      console.log('Selected text:', selectedText);
      await expect(selectedText).toBe('10');

      const namesTable = page.locator('#advancedtable');
      await expect(namesTable).toBeVisible({ timeout: 10000 });

      const rows = namesTable.locator('tbody tr');
      const rowCount = await rows.count();
      console.log('rowCount ', rowCount);
      await expect(rowCount).toBe(10);
    });

    await test.step('Search University of Abertay Dundee', async () => {
      const searchText = page.getByLabel('Search:');
      await expect(searchText).toBeVisible();
      await searchText.fill('Abertay');
      const namesTable = page.locator('#advancedtable');
      await expect(namesTable).toBeVisible({ timeout: 10000 });

      const rows = namesTable.locator('tbody tr');
      const rowCount = await rows.count();
      console.log('rowCount ', rowCount);
      await expect(rowCount).toBe(1);

      const cells = rows.nth(0).locator('td');
      const cellText = await cells.nth(1).textContent();
      if (cellText) {
        console.log('cellText ', cellText);
        await expect(cellText).toBe('University of Abertay Dundee');
      }
      await searchText.fill('');
    });

    await test.step('click on column S.NO header to sort', async () => {
      const columnHeader = page.locator('#advancedtable thead th').first();
      await expect(columnHeader).toBeVisible({ timeout: 10000 });
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
    });

    await test.step('click on column UNIVERSITY NAME header to sort', async () => {
      const columnHeader = page.locator('#advancedtable thead th').nth(1);
      await expect(columnHeader).toBeVisible({ timeout: 10000 });
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
    });

    await test.step('click on column COUNTRY header to sort', async () => {
      const columnHeader = page.locator('#advancedtable thead th').nth(2);
      await expect(columnHeader).toBeVisible({ timeout: 10000 });
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
    });

    await test.step('click on column WEBSITE header to sort', async () => {
      const columnHeader = page.locator('#advancedtable thead th').nth(3);
      await expect(columnHeader).toBeVisible({ timeout: 10000 });
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
    });



    await test.step('select page 2', async () => {
      const page2Button = page.locator('#advancedtable_paginate').locator('a.paginate_button', { hasText: '2' });
      await expect(page2Button).toBeVisible({ timeout: 10000 }); 
      await page2Button.click();

      const activePage2Button = page.locator('#advancedtable_paginate').locator('a.paginate_button.current', { hasText: '2' });
      await expect(activePage2Button).toBeVisible({ timeout: 10000 });
    });

    await test.step('select Previous', async () => {
      const previousPageButton = page.locator('#advancedtable_paginate').locator('a.paginate_button', { hasText: 'Previous' });
      await expect(previousPageButton).toBeVisible({ timeout: 10000 }); 
      await previousPageButton.click();

      const activePage1Button = page.locator('#advancedtable_paginate').locator('a.paginate_button.current', { hasText: '1' });
      await expect(activePage1Button).toBeVisible({ timeout: 10000 });
    });

    await test.step('select next', async () => {
      const nextPageButton = page.locator('#advancedtable_paginate').locator('a.paginate_button', { hasText: 'Next' });
      await expect(nextPageButton).toBeVisible({ timeout: 10000 }); 
      await nextPageButton.click();

      const activePage2Button = page.locator('#advancedtable_paginate').locator('a.paginate_button.current', { hasText: '2' });
      await expect(activePage2Button).toBeVisible({ timeout: 10000 });
    });

    await test.step('select last', async () => {
      const lastPageButton = page.locator('#advancedtable_paginate').locator('a.paginate_button', { hasText: 'Last' });
      await expect(lastPageButton).toBeVisible({ timeout: 10000 }); 
      await lastPageButton.click();

      const pageButtons = page.locator('#advancedtable_paginate').locator('a.paginate_button');
      const lastPageNumber = await pageButtons.last().innerText();
      await expect(lastPageButton).toHaveText(lastPageNumber);
    });

    await test.step('select first', async () => {
      const firstPageButton = page.locator('#advancedtable_paginate').locator('a.paginate_button', { hasText: 'First' });
      await expect(firstPageButton).toBeVisible({ timeout: 10000 }); 
      await firstPageButton.click();

      const activePage1Button = page.locator('#advancedtable_paginate').locator('a.paginate_button.current', { hasText: '1' });
      await expect(activePage1Button).toBeVisible({ timeout: 10000 });
    });


  });
});