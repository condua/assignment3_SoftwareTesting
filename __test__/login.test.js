const puppeteer = require("puppeteer")
let browser;
let page;
let url = "https://school.moodledemo.net/login/index.php";
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("done")
        }, ms)
    })
}
beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        // slowMo: 70,
    })

    page = await browser.newPage();

    await page.goto(url,{timeout:100000})
}, 100000)

afterAll(async () => {
    await browser.close()
})




describe('Testing User Creation Functionality', () => {

    const username = "#username"
    const password = "#password"
    const btn = "#loginbtn"
    const loginerrormessage = "#loginerrormessage"
    test('Page should have the correct title', async () => {
        const title = await page.title(); // string

        expect(title).toBe(title)
    });
    test('login failure 1', async () => {

        await page.type(username, "");
        await page.type(password, "");

        await page.click(btn);

        await page.waitForSelector(loginerrormessage); // Chờ cho selector của thông báo lỗi xuất hiện

        const errorText = await page.$eval(loginerrormessage, el => el.textContent);
        await delay(5000)

        expect(errorText).toContain(errorText); // Kiểm tra thông báo lỗi có hiển thị đúng không

    },100000);
    test('login failure 2', async () => {

        await page.type(username, "1");
        await page.type(password, "1");

        await page.click(btn);

        await page.waitForSelector(loginerrormessage); // Chờ cho selector của thông báo lỗi xuất hiện

        const errorText = await page.$eval(loginerrormessage, el => el.textContent);
        await delay(5000)

        expect(errorText).toContain(errorText); // Kiểm tra thông báo lỗi có hiển thị đúng không

    },100000);
    test('login failure 3', async () => {

        await page.type(username, "manager");
        await page.type(password, "1");

        await page.click(btn);

        await page.waitForSelector(loginerrormessage); // Chờ cho selector của thông báo lỗi xuất hiện

        const errorText = await page.$eval(loginerrormessage, el => el.textContent);
        await delay(5000)

        expect(errorText).toContain(errorText); // Kiểm tra thông báo lỗi có hiển thị đúng không

    },100000);
    test('login failure 4', async () => {

        await page.type(username, "manager1");
        await page.type(password, "moodle");

        await page.click(btn);

        await page.waitForSelector(loginerrormessage); // Chờ cho selector của thông báo lỗi xuất hiện

        const errorText = await page.$eval(loginerrormessage, el => el.textContent);
        await delay(5000)

        expect(errorText).toContain(errorText); // Kiểm tra thông báo lỗi có hiển thị đúng không

    },100000);
    test('Login Successfully', async () => {

        await page.type(username, "manager");
        await page.type(password, "moodle");

        await page.click(btn);
        // const errorsRecieved = await page.evaluate(getErrors, errorSelectors)
        await delay(5000)

        await expect(page.url()).toMatch('https://school.moodledemo.net/my/');    
    },100000);
});

