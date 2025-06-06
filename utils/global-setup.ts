import { chromium, FullConfig } from "@playwright/test";

async function globalsetup(config: FullConfig){
    const browser = await chromium.launch();
    const page = await browser.newPage()

    await page.goto('https://practice.sdetunicorns.com/my-account/')
    await page.context().storageState({path: 'notLoggedInState.json'});


    // login    
    await page.locator('#username').fill('Demon')
    await page.locator('#password').fill('Pass@123')
    await page.locator('[value="Log in"]').click()

    // save signed-in state to 'logedInState.json'
    await page.context().storageState({path: 'loggedInState.json'});
    await browser.close();
}

export default globalsetup;