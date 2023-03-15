import { defineSupportCode } from "cucumber";
import { browser, $, element, by } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
  Given(
    /^eu estou logado como "(.*)" com login "(.*)" e senha "(.*)"$/,
    function (nivelUsuario, login, senha) {
      return;
    }
  );

  Given(/^eu estou na página "(.*)"$/, async function (pagina) {
    await browser.get("http://localhost:4200/");
    await expect(browser.getTitle()).to.eventually.equal("E-commerCin");
    await element(by.name((<string>pagina).toLowerCase().replaceAll(" ", "-"))).click();
  });
});
