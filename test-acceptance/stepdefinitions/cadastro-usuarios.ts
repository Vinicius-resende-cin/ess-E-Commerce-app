import { defineSupportCode } from "cucumber";
import {
  browser,
  $,
  $$,
  element,
  ElementArrayFinder,
  by,
  ElementFinder
} from "protractor";
import Swal from 'sweetalert2'

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
let assert = chai.assert;

const Messages = {
  SUCCESSFUL_CAD: "Usuário Cadastrado no Sistema",

};


defineSupportCode(function ({ Given, When, Then }) {

    When(/^Escrevo "([^\"]*)" em "([^\"]*)"$/, async (name, campo) =>{
      await $(`input[name=${campo}]`).sendKeys(<string> name);
    });

    When(/^Clico em "([^\"]*)"$/,async (name:string) => {
      await element(by.buttonText(name)).click();
    });

    Then(/^Eu recebo uma mensagem de cadastro realizado$/,async () => {
      await expect(Swal.getTitle()).to.eventually.equal(Messages.SUCCESSFUL_CAD);
    })
    
});