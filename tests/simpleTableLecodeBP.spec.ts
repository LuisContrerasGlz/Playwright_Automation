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
    await page.waitForTimeout(3000);
    await browser.close();
  });

  test('letcode - alert', async () => {
    await test.step('I am in https://letcode.in/test', async () => {
      await page.goto('https://letcode.in/test');
      await expect(page).toHaveTitle('LetCode - Testing Hub');
    });

    await test.step('click on "Table" link', async () => {
      const buttonLink = page.getByRole('link', { name: 'Simple Table' });
      await buttonLink.click();
      await expect(page).toHaveURL('https://letcode.in/table');
    });

    await test.step('Extract and list the elements from the table', async () => {
      const shoppingList = page.locator('#shopping');
      await expect(shoppingList).toBeVisible();
  
      const rows = shoppingList.locator('tbody tr');
      const rowCount = await rows.count();
      console.log('rowCount ', rowCount);

      let sumTable = 0; 
      for (let i = 0; i < rowCount; i++) {
        const cells = rows.nth(i).locator('td');
        const cellText = await cells.nth(1).textContent();
        if (cellText) {
          const cellNumber = parseFloat(cellText.trim()); 
          if (!isNaN(cellNumber)) {
            sumTable += cellNumber;
          }
        }
        console.log('sumTable: ', sumTable);
      }

      let totalNumber = 0;
      const totalRows = shoppingList.locator('tfoot');
      const totalRowCount = await totalRows.count();
      if (totalRowCount > 0) {
        const totalRow = totalRows.nth(0).locator('td');
        const totalText = await totalRow.nth(1).textContent();
        if (totalText){
          totalNumber = parseFloat(totalText.trim()); 
        }
        console.log('totalText: ', totalText);
      } else {
        console.log('No footer rows found.');
      }
      expect(sumTable).toBe(totalNumber);
    });

    await test.step('Mark Raj as present', async () => {
      const namesList = page.locator('#simpletable');
      await expect(namesList).toBeVisible();
  
      const rows = namesList.locator('tbody tr');
      const rowCount = await rows.count();
      console.log('rowCount mark Raj ', rowCount);

      for (let i = 0; i < rowCount; i++) {
        const cells = rows.nth(i).locator('td');
        const cellText = await cells.nth(1).textContent();
        if (cellText && cellText.trim() === 'Raj') {
          const checkbox = cells.nth(3).locator('input[type="checkbox"]');
          await checkbox.check();
          console.log('Checkbox marked for Raj');
        }
      }
    });

    await test.step('Check if the sorting is working properly', async () => {
      const sortTable = page.locator('table.mat-sort.table.is-bordered.is-striped.is-narrow.is-hoverable.is-fullwidth');
      await expect(sortTable).toBeVisible();

      const rows = sortTable.locator('tr');
      const rowCount = await rows.count();
      console.log('rowCount sort table ', rowCount);

      const cols = sortTable.locator('thead th');
      const colCount = await cols.count();
      console.log('colCount sort table ', colCount);
      let list: string[] = [];
      let sortList: string[] = [];
      for (let j = 0; j < colCount; j++) {
        // Click on the current column header
        const header = cols.nth(j);
        await header.click();
        console.log(`Clicked on the column header at index ${j}`);
        await page.waitForLoadState('networkidle');
        list = [];
        for (let i = 0; i < rowCount; i++) {
          const cell = await rows.nth(i).locator(`td:nth-of-type(${j + 1})`);
          const cellText = await cell.innerText(); 
          if (cellText) { 
            list.push(cellText.trim());
          }
        }

        if (j === 0) {
          sortList = [...list].sort((a, b) => a.localeCompare(b));
        } else {
          sortList = [...list].sort((a, b) => parseFloat(a) - parseFloat(b));
        }

        console.log(`Content of column ${j + 1}:`, list);
        console.log('sortList ', sortList)
        expect(sortList).toEqual(list);
      }

    });
  });
});