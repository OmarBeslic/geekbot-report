import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();

  try {
    await page.goto(
      "https://autaut.atlassian.net/jira/your-work",
      { waitUntil: "networkidle0" }
    );
    
    //Click to login with microsoft
    await page.waitForSelector("#microsoft-auth-button");
    await page.click('#microsoft-auth-button');

    // Wait for the email input field to appear, then type the email and click next
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', "omar.beslic@igamingplatform.com");
    await page.click('input[type="submit"]');

    // Wait for the password input field to appear, then type the password and click sign in
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', "#");
    await new Promise(r => setTimeout(r, 5000));
    await page.waitForSelector('#idSIButton9');
    await page.click('#idSIButton9');
    await page.waitForSelector('#idSIButton9');
    await page.click('#idSIButton9');
    await page.goto("https://autaut.atlassian.net/plugins/servlet/ac/io.tempo.jira/tempo-app#!/my-work/week?type=LIST",{ waitUntil: "networkidle0" })
    await page.goto("https://autaut.atlassian.net/plugins/servlet/ac/io.tempo.jira/tempo-app#!/configuration/identity-service",{ waitUntil: "networkidle0" })


    // Add login steps here if necessary

    // Navigating to Tempo and settings
    // await page.goto('https://your_atlassian_tools_url.com/tempo/settings', { waitUntil: 'networkidle0' });

    // Navigating to OAuth 2.0 Application
    // await page.click('#oauth-application-link');

    // Extracting the credentials
    // const clientId = await page.$eval('#client-id', (el) => el.textContent);
    // const redirectUrl = await page.$eval('#redirect-url', (el) => el.textContent);

    // console.log('Client ID: ', clientId);
    // console.log('Redirect URL: ', redirectUrl);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    // await browser.close();
  }
})();
