import {test, expect} from '@playwright/test';
const path = require('path');
import CartPage from '../pages/card.page';

test.describe('Upload File', () => {
    let cartPage : CartPage;
    test('upload a test file with DOM manipulation', async ({ page }) => {
        cartPage = new CartPage(page);
        // Open url
        await page.goto('https://practice.sdetunicorns.com/cart/');

        // provide the test file path
        const filePath = path.join(__dirname, '../data/js basics for beginners.pdf'); 

        // DOM manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('input#upfile_1');
            if (selector) {
                selector.className=''
            }
        })

        // upload test file
        await page.setInputFiles('input#upfile_1', filePath);
        // click the submit button
        await page.locator('#upload_1').click();
        // assertion
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully');
    })

    test('upload a test file', async ({ page }) => {
        // Open url
        await page.goto('https://practice.sdetunicorns.com/cart/');

        // provide the test file path
        const filePath = path.join(__dirname, '../data/3mb-file.pdf'); 

        // upload test file
        await page.setInputFiles('input#upfile_1', filePath);
        // click the submit button
        await page.locator('#upload_1').click();

        // Wait condition
        await page.locator('#wfu_messageblock_header_1_1')
            .waitFor({ state : 'visible', timeout : 10000})

        // assertion
        await expect(page.locator('#wfu_messageblock_header_1_1')).toContainText('uploaded successfully', {timeout : 10000});
    })
})