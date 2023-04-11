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

async function containsSubstring(value, elem) {
    const valueSubstrings = value.toLowerCase().split(' ');
    return valueSubstrings.every(substring => elem.toLowerCase().includes(substring));
}

const PageUrls = {
    INICIAL: "",
    PRINCIPAL: "home",
    LOGIN: "login",
    REDEFINIR_SENHA: "redefinir-senha",
    RECUPERAR_CONTA: "recuperar-conta",
    CADASTRO_USUARIO: "Cadastro-Usuario",
    PERFIL_DO_USUARIO: "home/perfil-user",
    ADMIN_PAINEL: "home/admin-painel",
    GERENCIAR_CATEGORIAS: "home/categoria",
    CATEGORIA_ESPORTES: "home/categoria/Esportes",
    RESUMO_MENSAL: "home/resumo-mensal",
    CADASTRAR_PRODUTO: "home/create-item",	
    MINHA_LOJA: "home/view-itens",	
    VIEW_FULL: "home/item/:id",
  
  };
  

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

    Then(/^eu sou redirecionado para a página do produto com nome "(.*)"$/, async (nome_expected) => {
        const elem = element(by.name('nome'));
        const nome = await elem.getText();
        const id =  element(by.name('nome')).getText();


        if (nome === nome_expected){
            const expectUrl = 'home/view-itens/edit-item/' + id;
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await expect(browser.getCurrentUrl()).to.eventually.equal(baseUrl + expectUrl);
        }
        
    });

    //eu altero "Nome" para "Camisa polo azul bebe"
    When(/^eu altero "(.*)" para "(.*)"$/, async (elemName, value) => {

        if (elemName === "Formas de pagamento" || elemName === "Categorias"){
            const elemValues = value.toString().split(" e ");

            for (let i = 0; i < elemValues.length; i++) {
                if (elemName === "Formas de pagamento"){

                    const option = await $("option[name=" + (<string>elemValues[i]).toLowerCase().replaceAll(" ", "-") + "]");
                    //await option.clear();
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
        } else {
            const element = await $("input[name=" + (<string>elemName).toLowerCase().replaceAll(" ", "-") + "]")
            await element.clear()
            await element.sendKeys(<string>value);
        }
    });

    Then(/^eu vejo "([^"]*)" em "([^"]*)"$/, async (value, elemName) => {

        const elemValues = value.toString().split(" e ");
        const name = (<string>elemName).toLowerCase().replaceAll(" ", "-");
        const elem = element(by.name(name)).getText();
        let contador = 0;

        for (let j = 0; j < elemValues.length; j++) {
            const valueSubstrings = elemValues[j].toString().toLowerCase().split(' ');
            const result = valueSubstrings.every(substring => elem.toString().toLowerCase().includes(substring));

            if (result){
                contador += 1;
            }
        }

        if (contador === elemValues.length){
            await expect(true).to.be.true;
        }
    });

    Then(/^eu sou redirecionado para a página de confirmacao de senha$/, async () => {
        const id: string = await element(by.name('Confirmar')).getAttribute('id');

        const expectUrl = 'home/password-confirmation/' + id;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await expect(browser.getCurrentUrl()).to.eventually.equal(baseUrl + expectUrl);
    
    });

    Then(/^eu vejo que o produto com nome "(.*)" nao esta na loja$/, async(elemName) => {
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
