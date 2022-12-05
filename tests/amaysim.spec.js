// @ts-check
const { test, expect } = require('@playwright/test');
const env = require('../data.json')

test.describe("Refer A Friend", ()=>{
    test.beforeEach(async ({page}) =>{
        await page.goto(env.environment)
        await page.getByRole('link', { name: 'Account' }).click();
        await page.getByLabel('amaysim number or email').fill(env.amaysim_number);
        await page.getByLabel('Password').fill(env.password);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByText('0466 134 57415GB Data Plan').click();
        await page.getByRole('link', { name: 'Refer a friend' }).click();
    });

    test("Referral Link Can Be Copied By Clicking Copy Button", async ({page})=>{
        const referFrame = await page.frameLocator('[title="Powered By Friendbuy"]');
        const referralCode = await referFrame.locator('#r > span > p > a').getAttribute('href');
        await referFrame.locator('#s > span > p').click()
        await new Promise(resolve => setTimeout(resolve, 5000));
        await referFrame.locator('#a').focus();
        await page.keyboard.press('Control+KeyV')
        await expect(await referFrame.locator('#a').inputValue()).toEqual(referralCode);
    });

    test("Confirmation Message Should Displayed On Successful Refer A Friend", async ({page})=>{
        const referFrame = await page.frameLocator('[title="Powered By Friendbuy"]');
        await referFrame.locator('#a').focus();
        await page.keyboard.insertText('testemail@gmail.com')
        await referFrame.locator('#c > span > p').click();
        await expect(await referFrame.locator('#H > span > p')).toHaveText('Thanks for sharing the big love');
    });

    test("Clicking 'Share Again' Button Redirects Back To 'Refer A Friend' Form", async({page})=>{
        const referFrame = await page.frameLocator('[title="Powered By Friendbuy"]');
        await referFrame.locator('#a').focus();
        await page.keyboard.insertText('testemail@gmail.com')
        await referFrame.locator('#c > span > p').click();
        await referFrame.locator('#w > span > p').click();
        await expect(await referFrame.locator('#r > span > p > a')).toBeVisible();
    });

})


