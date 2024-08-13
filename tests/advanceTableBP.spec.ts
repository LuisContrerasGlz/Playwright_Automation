import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { advancedTable } from './pages/advanceTablePage';

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

    const advancetable = new advancedTable(page);
    await test.step('click on "Table" link', async () => {
      await advancetable.buttonLinkClick();
      await expect(page).toHaveURL('https://letcode.in/advancedtable');
    });

    await test.step('Select 10 entries', async () => {
      const atLengthSelector = advancetable.atLengthSelector;
      await expect(atLengthSelector).toBeVisible();
      await advancetable.aleSelectOption('10');
      const selectedText = await advancetable.aleSelectedOption();
      console.log('Selected text:', selectedText);
      await expect(selectedText).toBe('10');

      const namesTable = advancetable.namesTable;
      await expect(namesTable).toBeVisible({ timeout: 10000 });

      const rows = advancetable.rowsNamesTable;
      const rowCount = await advancetable.countRowsNamesTable();
      console.log('rowCount ', rowCount);
      await expect(rowCount).toBe(10);
    });

    await test.step('Search University of Abertay Dundee', async () => {
      const searchText = advancetable.searchText;
      await expect(searchText).toBeVisible();//
      await advancetable.fillSearch('Abertay');
      const rowCount = await advancetable.countRowsNamesTable();
      const rows = advancetable.rowsNamesTable;
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
      const columnHeader = advancetable.columnHeader.first();
      await expect(columnHeader).toBeVisible({ timeout: 10000 });
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
    });

    await test.step('click on column UNIVERSITY NAME header to sort', async () => {
      const columnHeader = advancetable.columnHeader.nth(1);
      await expect(columnHeader).toBeVisible({ timeout: 10000 });
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
    });

    await test.step('click on column COUNTRY header to sort', async () => {
      const columnHeader = advancetable.columnHeader.nth(2);
      await expect(columnHeader).toBeVisible({ timeout: 10000 });
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
    });

    await test.step('click on column WEBSITE header to sort', async () => {
      const columnHeader = advancetable.columnHeader.nth(3);
      await expect(columnHeader).toBeVisible({ timeout: 10000 });
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
      await columnHeader.click();
      await expect(columnHeader).toHaveClass(/sorting_asc|sorting_desc/);
    });

    await test.step('select page 2', async () => {
      await advancetable.selectPage('2');
      const isPage2Active = await advancetable.isPageActive('2');
      await expect(isPage2Active).toBeTruthy();
    });

    await test.step('select Previous', async () => {
      await advancetable.selectPrevious();
      const isPage1Active = await advancetable.isPageActive('1');
      await expect(isPage1Active).toBeTruthy();
    });

    await test.step('select next', async () => {
      await advancetable.selectNext();
      const isPage2ActiveAgain = await advancetable.isPageActive('2');
      await expect(isPage2ActiveAgain).toBeTruthy();
    });

    await test.step('select last', async () => {
      const lastPageButton = advancetable.lastPageButton;
      await expect(lastPageButton).toBeVisible({ timeout: 10000 }); 
      await lastPageButton.click();
      const pageButtons = advancetable.pageButtons;
      const lastPageNumber = await pageButtons.last().innerText();
      await expect(lastPageButton).toHaveText(lastPageNumber);
    });

    await test.step('select first', async () => {
        await advancetable.selectPage('First');
        const isPage1Active = await advancetable.isPageActive('1');
        await expect(isPage1Active).toBeTruthy();
    });

  });
});