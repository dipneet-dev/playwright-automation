import {test, expect} from '@playwright/test';
import HomePage from '../pages/home.page';
test.describe('Home', () => {
    let homePage: HomePage;
    test('Open HomePage and verify title', async ({ page }) => {
        homePage = new HomePage(page);
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/');
        // verify our title 
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    })
    
    test('open AboutPage and verify the title', async({page}) => {
        // Oen the url
        await page.goto('https://practice.sdetunicorns.com/about/');
        // Verify our tile 
        await expect(page).toHaveTitle('About – Practice E-Commerce Site');
    })

    test('Click get started button using CSS selector', async({ page }) => {
        homePage = new HomePage(page);
        // Open the URL
        await page.goto('https://practice.sdetunicorns.com/');
        // Click the BUtton
        // await page.locator('#get-started').click();
        await homePage.getStartedBtn.click();

        // virify url has get started 
        await expect(page).toHaveURL('https://practice.sdetunicorns.com/#get-started');
    })

    test('Verify the headding text is visible usin text selector', async({ page }) => {
        homePage = new HomePage(page);
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // find the text locator
        // const headingText = await page.locator('text=Think different. Make different.');
        const headingText = await homePage.headingText;
        // verify the headding text is visible 
        await expect(headingText).toBeVisible();
    })

    test('Verify if the home link is enabled using text and css selector', async({ page }) => {
        homePage = new HomePage(page);
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // find the homeText 
        // const homeText = await page.locator('#zak-primary-menu >> text=Home');
        const homeText = await homePage.homeLink;

        // verify Home text is enabled
        await expect(homeText).toBeEnabled();
    })

    //div[@class='zak-header-actions zak-header-actions--desktop']//a[@class='zak-header-search__toggle']

    test('verify search icon is visible using Xpath selector', async ({page}) => {
        homePage = new HomePage(page);
        //Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // find the search icon
        // const searchIcon = await page.locator('//div[@class='zak-header-actions zak-header-actions--desktop']//a[@class='zak-header-search__toggle']');

        // Verify search icon is visible 
        // await expect(searchIcon).toBeVisible();
    })

    test('verify text of all nav links', async ({ page }) => {
        homePage = new HomePage(page);
        const expectedLinks = ["Home", "About", "Shop", "Blog", "Contact", "My account"];
        // Open url
        await page.goto('https://practice.sdetunicorns.com/');
        // find nav links 
        // const navLinks = await page.locator('#zak-primary-menu li[id*=menu]');
        const navLinks = await homePage.navLinks;

        // Verify nav links text
        expect(await navLinks.allTextContents()).toEqual(expectedLinks);
    })

    test('Asserting the success message in contact page', async ({ page }) => {
        homePage = new HomePage(page);
        // go to the contact page
        await page.goto('https://practice.sdetunicorns.com/contact/');

        // Fill name, email, phone and message
        await page.locator('#evf-277-field_ys0GeZISRs-1').fill('Dipneet Meshram');
        await page.locator('#evf-277-field_LbH5NxasXM-2').fill('DipneetMeshram01@gmail.com');
        await page.locator('#evf-277-field_66FR384cge-3').fill('7219376824');
        await page.locator('#evf-277-field_yhGx3FOwr2-4').fill('Full time Employee');

        // locating and submiting the button
        await page.locator('#evf-submit-277').click();

        // Assert the success message 
        await expect(page.locator('.everest-forms-notice.everest-forms-notice--success.everest-forms-submission-scroll')).toHaveText('Thanks for contacting us! We will be in touch with you shortly');

    })

    test('verify recent post count and verify the length of each post item', async ({ page }) => {
        homePage = new HomePage(page);
        // open blog page
        await page.goto('https://practice.sdetunicorns.com/blog/');

        // Get the recent post list elements 
        const recentPostList = page.locator('#recent-posts-3 ul li')
        // loop through the list and assert char length > 10
        for(const el of await recentPostList.elementHandles()){
            expect((await el.textContent())?.trim()?.length).toBeGreaterThan(10)
        }
        // assert the total length = 5
        expect(await recentPostList.count()).toEqual(5);
    })
})
