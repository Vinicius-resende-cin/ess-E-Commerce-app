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

defineSupportCode(function ({ Given, When, Then }) { 

    When(/^eu digito "([^"]*)" em "([^"]*)"$/, async (value, elemName) => {
        await $(
          "input[name=" + (<string>elemName).toLowerCase().replaceAll(" ", "-") + "]"
        ).sendKeys(<string>value);
    });

    When(/^eu escolho "([^"]*)" em "([^"]*)"$/, async (value, elemName) => {

        const elemValues = value.toString().split(" e ");

            for (let i = 0; i < elemValues.length; i++) {
                if (elemName === "Formas de pagamento"){

                    const option = await $("option[name=" + (<string>elemValues[i]).toLowerCase().replaceAll(" ", "-") + "]");
                    await option.click();
                }else if (elemName === "Categorias") {
                    const selectElem = await element(by.name("categorias"));
                    const options = await selectElem.all(by.tagName("option"));

                    for (let j = 0; j < options.length; j++) {
                        const categoryOption = options[j];
                        const text = await categoryOption.getText();
                        if (text.includes(elemValues[i])) {
                            await categoryOption.click();
                            break;
                          }
                    }
                    
                }
            }    

    });      

    Then(/^eu vejo o produto com nome "(.*)" na loja$/, async(elemName) => {
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

    //Then eu clico no icone que indica "Atualizar produto" do produto com nome "Camisa polo"
    Then(/^eu clico no icone que indica "(.*)" do produto com nome "(.*)"$/, async (element_name, name) => {
        let elem = '';

        if (element_name == "Atualizar produto"){
            elem = 'edit-'+ name;
        } else {
            elem = 'delete-' + name;
        }

        await element(by.name(<string>elem)).click();
    });

    Then(/^eu vejo o input "(.*)" em "(.*)"$/, async (value_expect, elemName) => {
        //
        const value = await $("input[name=" + (<string>elemName).toLowerCase().replaceAll(" ", "-") + "]").getValue(); //ver função para retornar o valor
        expect(value).to.equal(value_expect);

    });

    //And eu vejo a(s) opcao(es) "Boleto bancário" selecionadas em "Formas de pagamento"
    Then(/^eu vejo a\(s\) opcao\(oes\) "([^"]*)" em "([^"]*)"$/, async (value_expect, elemName) => {
        /*const opcoesPagamento = await $$(`[name="${(<string>elemName).toLowerCase().replaceAll(" ", "-")}"] option`);
        const opcoesSelecionadas = value_expect.split(", ");
        
        opcoesSelecionadas.forEach(async opcao => {
          const opcaoEncontrada = opcoesPagamento.find(opcaoPagamento => opcaoPagamento.getText() === opcao);
          expect(opcaoEncontrada).to.exist;
        });*/
      });

});
