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

  test('letcode - button', async () => {
    await test.step('I am in https://letcode.in/test', async () => {
      await page.goto('https://letcode.in/test');
      await expect(page).toHaveTitle('LetCode - Testing Hub');
    });

    await test.step('click on "button"', async () => {
      const buttonLink = page.getByRole('link', { name: 'Click' });
      await buttonLink.click();
      await expect(page).toHaveURL('https://letcode.in/buttons');
    });

    await test.step('click on "Goto Home and come back here"', async () => {
      const buttonLink = page.getByLabel('Goto Home and come back here');
      await buttonLink.click();
      await expect(page).toHaveURL('https://letcode.in/');
    });

    await test.step('go back to the previous page', async () => {
      await page.goBack();
      await expect(page).toHaveURL('https://letcode.in/buttons');
    });

    await test.step('Get the X & Y co-ordinates', async () => {
        const buttonLink = page.getByRole('button',{name:'Find Location'})
        const boundingBox = await buttonLink.boundingBox();
        if (boundingBox) {
          console.log(`X: ${boundingBox.x}, Y: ${boundingBox.y}`);
        } else {
          console.log('Element not found or not visible');
        }
    });

    await test.step('Find the color of the button', async () => {
        const buttonColor = page.getByLabel('Find the color of the button')
        const color = await buttonColor.evaluate(el => window.getComputedStyle(el).color);
        console.log(`Button color: ${color}`);
    });

    await test.step('Find the height & width of the button', async () => {
        const heightButton = page.getByRole('button',{name:'How tall & fat I am?'})
        const boundingBox = await heightButton.boundingBox();
        if (boundingBox) {
          console.log(`Height: ${boundingBox.height}px, Width: ${boundingBox.width}px`);
        } else {
          console.log('Element not found or not visible');
        }
    });

    await test.step('button is disabled', async () => {
        const buttonDisabled = page.getByRole('button',{name:'Disabled'}) 
        const isDisabled = await buttonDisabled.isDisabled();
        console.log('button is disabled:', isDisabled);
    });

    await test.step('Click and Hold Button', async () => {
        const clickHoldButton = page.getByRole('button', { name: 'Button Hold!' });
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
