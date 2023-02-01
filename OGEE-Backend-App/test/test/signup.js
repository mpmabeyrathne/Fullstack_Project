const {Builder, By, Key, until} = require("selenium-webdriver");
const assert = require("assert");
const mocha = require("mocha");

describe("Test Sign Up Controller", function() {
    this.timeout(40000);
    it("Should Sign Up a User", function(done) {
        
        const driver = new Builder().forBrowser("chrome").build();

        driver.get("file:///E:/Projects/OGEE-App/OGEE-App/OGEE-Frontend-App/common/Login.html");

        driver.findElement(By.name("username")).sendKeys("Testuser2");
        driver.findElement(By.name("password")).sendKeys("Testpassword@1");
        driver.findElement(By.name("email")).sendKeys("ttestuser2@test.com");

        driver.findElement(By.css('button[type="button"]')).click();

        done();
    });
});