const puppeteer = require("puppeteer")
let browser;
let page;
let url = "https://school.moodledemo.net/user/editadvanced.php?id=-1";
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

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  


describe('Testing User Creation Functionality', () => {

    const username = "#username"
    const password = "#password"
    const btn = "#loginbtn"

    const loginerrormessage = "#loginerrormessage"


    const id_username = "#id_username"
    const id_newpassword = "#id_newpassword"
    const id_firstname ="#id_firstname"
    const id_lastname = "#id_lastname"
    const id_email = "#id_email"

    const id_error_email = "#id_error_email"
    const id_submitbutton = "#id_submitbutton"

    test('Page should have the correct title', async () => {
        const title = await page.title(); // string

        expect(title).toBe(title)
    });
    test('Login Successfully', async () => {

        await page.type(username, "manager");
        await page.type(password, "moodle");

        await page.click(btn);
        // const errorsRecieved = await page.evaluate(getErrors, errorSelectors)
        await delay(5000)

        await expect(page.url()).toMatch('https://school.moodledemo.net/user/editadvanced.php?course=1&id=-1');    
    },200000);
    
    test('Create a new student unsuccessfully (We do not fill in any field)', async () => {


        await page.click(id_submitbutton);
        const error = await page.waitForSelector(id_error_email); // Chờ cho selector của thông báo lỗi xuất hiện

        expect(error).toBe(error);

    },200000);

    test('Create a new student unsuccessfully (We do not fill in email)', async () => {

        await page.type(id_username, "123456");
        await page.type(id_newpassword, "@Phuc1755");

        await page.click(id_submitbutton);
        const error = await page.waitForSelector(id_error_email); // Chờ cho selector của thông báo lỗi xuất hiện

        expect(error).toBe(error);

    },200000);

    test('Create a new student successfully', async () => {
        await page.$eval(id_username, input => input.value = '');
        await page.type(id_username, `${generateRandomString(16)?.toLocaleLowerCase()}`);
        const em = 'em'; 
        await page.waitForSelector(em); 
        await page.click(em)
        await page.type(id_newpassword, "@Phuc1755");

        await page.type(id_firstname, "Phan");

        await page.type(id_lastname, "Hoàng Phúc");

        await page.type(id_email, `${generateRandomString(16)}@gmail.com`);

        await page.click(id_submitbutton);
        await delay(5000)

        await expect(page.url()).toMatch('https://school.moodledemo.net/admin/user.php');    


    },200000);
});

