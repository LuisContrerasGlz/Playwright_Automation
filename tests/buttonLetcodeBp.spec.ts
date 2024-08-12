import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { buttonLetcodePages } from './pages/buttonLetcodePages';


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

  test('letcode - button', async () => {
    await test.step('I am in https://letcode.in/test', async () => {
      await page.goto('https://letcode.in/test');
      await expect(page).toHaveTitle('LetCode - Testing Hub');
    });

    const buttonsLetcode = new buttonLetcodePages(page); 
    await test.step('click on "button"', async () => {
      await buttonsLetcode.buttonLinkClick();
      await expect(page).toHaveURL('https://letcode.in/buttons');
    });

    await test.step('click on "Goto Home and come back here"', async () => {
      //const buttonLink = page.getByLabel('Goto Home and come back here');
      await buttonsLetcode.goHomeClick();
      await expect(page).toHaveURL('https://letcode.in/');
      await page.goBack();
      await expect(page).toHaveURL('https://letcode.in/buttons');
    });

    await test.step('Get the X & Y co-ordinates', async () => {
        const boundingBox = await buttonsLetcode.boundigBoxFindLocation();
        if (boundingBox) {
          console.log(`X: ${boundingBox.x}, Y: ${boundingBox.y}`);
        } else {
          console.log('Element not found or not visible');
        }
    });

    await test.step('Find the color of the button', async () => {
        const color = await buttonsLetcode.colorButtonColor();
        console.log(`Button color: ${color}`);
    });

    await test.step('Find the height & width of the button', async () => {
        const boundingBox = await buttonsLetcode.howTallFatButton()
        if (boundingBox) {
          console.log(`Height: ${boundingBox.height}px, Width: ${boundingBox.width}px`);
        } else {
          console.log('Element not found or not visible');
        }
    });

    await test.step('button is disabled', async () => {
        const isDisabled = await buttonsLetcode.isDisabledButton();
        console.log('button is disabled:', isDisabled);
    });

    await test.step('Click and Hold Button', async () => {
        const clickHoldButton = buttonsLetcode.clickHoldButton;
        const boundingBox = await clickHoldButton.boundingBox();
        if (boundingBox) {
          // Calculate the center of the button to click and hold
          const x = boundingBox.x + boundingBox.width / 2;
          const y = boundingBox.y + boundingBox.height / 2;
  
          // Perform a mouse click and hold at the center of the button
          await page.mouse.click(x, y, { button: 'left', delay: 100 }); 
          console.log('Button is clicked and held.');

          await page.waitForTimeout(1000); 
          
          // Release the mouse button
          await page.mouse.up();
          console.log('Button is released.');
        } else {
          console.log('Element not found or not visible');
        }
      });


  });
});
