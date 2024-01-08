import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://onlinelibrary.wiley.com/');

});

//Verify that the homepage of Wiley Online Library loads correctly
test('verify the homepage of wiley online library', async ({ page }) => {

  await expect(page).toHaveTitle("Wiley Online Library | Scientific research articles, journals, books, and reference works", {timeout: 10000});
});

// Test 1: Successful Login
test('Successful login redirects to user dashboard', async ({ page }) => {

  await page.waitForSelector('text=Login',{state:'visible'});
  await page.locator('text=Login').first().click();

  await page.waitForSelector('#username')
  await page.locator('#username').type('kkogula4@gmail.com');

  await page.locator('#password').type('Whitebatveni@27');
  
  await page.waitForSelector('text=Log In',{state:'visible'});
  await page.locator('text=Log In').first().click();
  await expect(page).toHaveURL('https://onlinelibrary.wiley.com/');
});

// Test 2: Search Functionality
test('Search for a Specific Article', async ({ page }) => {

  // Enter specific article title in the search bar and click "Search"
  await page.waitForSelector('#searchField1')
  await page.locator('#searchField1').type('Abacus');

  await page.press('input[type="search"]', 'Enter');
  await page.waitForNavigation();
  await expect(page).toHaveURL(/action\/doSearch\?/);
  await expect(page.url()).toContain('Abacus');
  await page.locator('.result__suffix').getByText('Abacus');
});

// Test 3: Search with Invalid Term
test('Search with invalid keyword', async ({ page }) => {
  await page.waitForSelector('#searchField1')
  await page.locator('#searchField1').type('asdhakjdhajkdh345');
  await page.press('input[type="search"]', 'Enter');
  await page.locator('.result__current').getByText('0 results');
});