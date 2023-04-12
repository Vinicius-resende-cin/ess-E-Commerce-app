import { defineSupportCode } from "cucumber";
import {
  browser,
  $,
  $$,
  element,
  ElementArrayFinder,
  by,
  ElementFinder,
  protractor
} from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
const request = require('request');
let expect = chai.expect;
let assert = chai.assert;

const baseUrl = "http://localhost:4200/home/gerar-link";
const serverUrl = "http://localhost:3000/api/customLinks";

async function hash(str: string) {
  var hash = 5381;

  for (var i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }

  return hash >>> 0;
}

defineSupportCode(function ({ Given, When, Then }) {
  Given(
    /^eu estou na página "([^"]*)"$/,
    async (nomePagina: string) => {
      const currentUrl = browser.getCurrentUrl();

      expect(currentUrl).to.equal(baseUrl);
    }
  );

  When(
    /^eu insiro "([^"]*)" no campo "([^"]*)"$/,
    async (inputStr: string, nomeCampo: string) => {
      await $(`input[placeholder=${nomeCampo}]`).sendKeys(inputStr);
    }
  );

  When(
    /^eu seleciono a opção "([^"]*)"$/,
    async (nomeBtn: string) => {
      await element(by.name(nomeBtn)).click();
    }
  );

  Then(
    /^eu vejo a mensagem "([^"]*)"$/,
    async (alertMsg: string) => {
      await browser.wait(protractor.ExpectedConditions.alertIsPresent(), );
      var alert = browser.switchTo().alert();

      await new Promise(resolve => setTimeout(resolve, 500));
      expect(Promise.resolve(alert.getText())).to.eventually.equal(alertMsg);

      await alert.accept();
    }
  );

  Then(
    /^o link "([^"]*)" está salvo no sistema"$/,
    async (customLink: string) => {
      const id = hash(customLink);
      const endpointURL = `${serverUrl}/${id}`

      const response = await request.get(endpointURL);

      expect(response.statusCode).to.equal(200);

      const responseData = JSON.parse(response.body);
      expect(responseData).to.not.deep.equal({"message":"Link não encontrado."});
    }
  );
});