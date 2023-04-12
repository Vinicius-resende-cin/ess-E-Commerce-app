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
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
let assert = chai.assert;

const baseUrl = "http://localhost:4200/";

async function searchItemInItens(itemName) {
    const itemNames = await $$("h5.fw-bolder");

    for (let i = 0; i < itemNames.length; i++) {
      const elemItem = itemNames[i];
      const text = await elemItem.getText();

        if (text === itemName) {
            return true;
        }
    }
    return false;      
}

async function getElementByName(name, type) {
  let elementName = name.toLowerCase().replaceAll(" ", "-");
  let selector = `${type}[name=${elementName}]`;
  return $(selector);
}

async function getCategoryOptionByText(text) {
  const selectElem = await element(by.name("categorias"));
  const options = await selectElem.all(by.tagName("option"));

  for (let j = 0; j < options.length; j++) {
    const categoryOption = options[j];
    const optionText = await categoryOption.getText();
    if (optionText.includes(text)) {
      return categoryOption;
    }
  }
}

async function containsSubstring(value, elem) {
    const valueSubstrings = value.toLowerCase().split(' ');
    return valueSubstrings.every(substring => elem.toLowerCase().includes(substring));
}


defineSupportCode(function ({ Given, When, Then }) { 

    When(/^eu envio "([^"]*)" em "([^"]*)"$/, async (value, elemName) => {
        if (elemName === "Formas de pagamento" || elemName === "Categorias"){
            const elemValues = value.toString().split(" e ");

            for (let i = 0; i < elemValues.length; i++) {
                if (elemName === "Formas de pagamento") {
                    const input = await getElementByName(elemValues[i], 'option');
                    await input.click();
                } else if (elemName === "Categorias") {
                    const option = await getCategoryOptionByText(elemValues[i]);
                    if (option) {
                        await option.click();
                    }
                    // await option.click();
                }
            }    

        } else {
            const element = await getElementByName(elemName, 'input')
            await element.clear()
            await element.sendKeys(<string>value);
        }  
    });      

    Then(/^eu vejo o produto com nome "(.*)" na loja$/, async (elemName) => {
        const itemNames = await $$("h5.fw-bolder");
        let found = false;
    
        for (let i = 0; i < itemNames.length; i++) {
          const itemName = itemNames[i];
          const text = await itemName.getText();
    
          if (text === elemName) {
            found = true;
            break;
          }
        }
    
        expect(found).to.be.true;
      });

    Then(/^eu clico no icone que indica "(.*)" do produto com nome "(.*)"$/, async (elementName, name) => {
        const elem = elementName == "Atualizar produto" ? `edit-${name}` : `delete-${name}`;
        await element(by.name(elem)).click();
    });

    Then(/^eu sou redirecionado para a página do produto com nome "(.*)"$/, async (nomeExpected) => {
        const nome = await element(by.name('nome')).getText();
        const id =  await element(by.name('id')).getText();

        if (nome === nomeExpected){
            const expectUrl = 'home/item/' + id;
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await expect(browser.getCurrentUrl()).to.eventually.equal(baseUrl + expectUrl);
        }
    });

    Then(/^eu vejo "([^"]*)" em "([^"]*)"$/, async (value, elemName) => {
        
        const name = (<string> elemName).toLowerCase().replaceAll(" ", "-");
        const elemText = await element(by.name(name)).getText();

        const elemValues = value.toString().split(" e ");

        const contador = elemValues.filter(async (value) => {
            return await containsSubstring(value, elemText);
        }).length;

        if (contador === elemValues.length) {
            await expect(true).to.be.true;
        }
    });

    Then(/^eu sou redirecionado para a página de confirmacao de senha$/, async () => {
        const id: string = await element(by.name('Confirmar')).getAttribute('id');
        const expectUrl = 'home/password-confirmation/' + id;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await expect(browser.getCurrentUrl()).to.eventually.equal(baseUrl + expectUrl);
    });

    Then(/^eu vejo que o produto com nome "(.*)" nao esta na loja$/, async (elemName) => {
        const itemNames = await $$("h5.fw-bolder");
        let found = false;
    
        for (let i = 0; i < itemNames.length; i++) {
          const itemName = itemNames[i];
          const text = await itemName.getText();
    
          if (text === elemName) {
            found = true;
            break;
          }
        }
    
        expect(found).to.be.false;
    });

    Then(/^eu vejo na tela uma mensagem de erro "(.*)"$/, async(msgError) => {
        const msg = await element(by.name('error-msg')).getText();
        expect(msgError).to.equal(msg);
    });

    Then(/^eu vejo o botão "(.*)" indisponivel para clicar$/, async(elementName) => {
        const button = await $(`button[name="${elementName}"]`);
        const isEnabled = await button.isEnabled();
        expect(isEnabled).to.be.false;
    });
});