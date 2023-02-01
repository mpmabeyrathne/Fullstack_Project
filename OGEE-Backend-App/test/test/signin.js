const {Builder, By, Key, until} = require("selenium-webdriver");
const assert = require("assert");
const mocha = require("mocha");

describe("Test Login Form", function() {
    this.timeout($0000);
    it("Should Login a User", function(done) {
       
        const driver = new Builder().forBrowser("chrome").build();
 
        driver.get("file:///E:/Projects/OGEE-App/OGEE-App/OGEE-Frontend-App/common/Login.html");
     
        driver.findElement(By.id("loginEmail")).sendKeys("pasindu@gmail.com");
        driver.findElement(By.id("loginPassword")).sendKeys("Pasindu1@");

        
        driver.findElement(By.id("btnLogin")).click();

        done();
    });
});