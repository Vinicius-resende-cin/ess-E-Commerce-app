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
const request = require("request");
let expect = chai.expect;
let assert = chai.assert;

const baseUrl = "http://localhost:4200/";

const formatDateToInput = (dt: string): string => {
    let split_dt = dt.split("/");
    return split_dt[1] + "-" + split_dt[0];
};

function filtrarPorId(name:string, str:string) {
    var allElements = element.all(by.name(name));
    return allElements.filter(elem => (elem.getAttribute('id')
    .then(ids => ids === str)));
}

async function testarQuantidade(name:string, quantidade, strId:string) {
    var elem = filtrarPorId(name, strId).first();

    return expect(Promise.resolve(elem.getText())).to.eventually.equal(quantidade);;
};

async function testarItem(name:string, quantidade: number, strId: string) {
    await filtrarPorId(name, strId).then
        (elemento => expect(Promise.resolve(elemento.length)).to.eventually.equal(quantidade));
}

defineSupportCode(function({Given, When, Then}) {
    Given(/^Estou vendo o histórico de pedidos da minha conta$/, async() => {
        await browser.get(baseUrl + "home/historico-pedidos");
        // await browser.sleep(1000);
    });

    Given(/^Estou vendo o item "(.*)" do pedido "(\d*)" no histórico$/, async(item, pedido) => {
        await testarItem('item', 1, 'btn-' + pedido + '-' + item);
    });

    Given(/^Vejo que o produto "(.*)" do pedido "(\d*)" ainda tem "(\d*)" em estoque no sistema$/, async(item, pedido, quant) => {
        await testarQuantidade('estoque', quant, 'estoque-' + pedido + '-' + item);
    });

    Given(/^Vejo que o produto "(.*)" do pedido "(\d*)" não está em estoque no sistema$/, async(item, pedido) => {
        await testarQuantidade('estoque', '0', 'estoque-' + pedido + '-' + item);
    });

    Given(/^foram compradas "(\d*)" "(.*)" no pedido "(\d*)"$/, async(quant, item, pedido) => {
        await testarQuantidade('quantidade', quant, 'quantidade-' + pedido + '-' + item);
    });

    Given(/^Vejo que em "(.*)" houveram "(\d*)" pedidos$/, async(data, quantidade) => {
        var allHoras = element.all(by.name('hora'));

        var filtro = await allHoras.filter(async function(elemento) {
            return (await elemento.getText()).includes(<string> data);
        });

        await expect(Promise.resolve(String(filtro.length))).to.eventually.equal(quantidade);
    });

    When(/^Eu seleciono o produto "(.*)" do pedido "(\d*)"$/, async(item, pedido) => {
        var elem = filtrarPorId('item', 'btn-' + pedido + '-' + item).first();

        await elem.click();
    });

    When (/^Eu seleciono comprar novamente no pedido "(\d*)"$/, async(pedido) => {
        var elem = filtrarPorId('comprar', 'btn-' + pedido).first();

        await elem.click();
    });

    When(/^Eu seleciono "(\d{2}\/\d{4})" nos campos do filtro do histórico$/, async(inicio) => {
        let dataInicio = formatDateToInput(<string> inicio);

        await browser.executeScript(
            `document.querySelector('input#start-month').value = '${dataInicio}'`
        );
    
        await browser.executeScript(
            `document.querySelector('input#end-month').value = '${dataInicio}'`
        );

        await element(by.name("filtrar")).click();
    });

    Then(/^Eu vejo a página do produto "(.*)"$/, async(item) => {
        await expect(Promise.resolve(element(by.tagName('h2')).getText())).to.eventually.equal(item);
    });

    Then(/^Eu vejo uma mensagem dizendo que "(.*)"$/, async(message) => {
        await browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
        var alert = browser.switchTo().alert()
        expect(Promise.resolve(alert.getText())).to.eventually.equal(message);
        await alert.accept();
    });

    Then(/^Eu vejo que o produto "(.*)" esta no carrinho de compras$/, async(item) => {
        await testarItem('item', 1, 'nome-' + item);
    });

    Then(/^Eu vejo que o produto "(.*)" não esta no carrinho de compras$/, async(item) => {
        await testarItem('item', 0, 'nome-' + item);
    });

    Then(/^Eu vejo que "(\d*)" unidades do item "(.*)" estão no carrinho de compras$/, async(quant, item) => {
        await testarQuantidade('quant', quant, 'quant-' + item);
    });

    Then(/^Eu vejo que há apenas "(\d*)" pedidos no histórico$/, async(quant) => {
        var allPedidos = element.all(by.name('id'));

        await expect(Promise.resolve(String((await allPedidos).length))).to.eventually.equal(quant);
    });

    Then(/^Vejo que os pedidos foram feitos em "(.*)"$/, async(data) => {
        var allHoras = element.all(by.name('hora'));

        var filtro = await allHoras.filter(async function(elemento) {
            return (await elemento.getText()).includes(<string> data);
        });

        await expect(Promise.resolve((await allHoras).length)).to.eventually.equal(filtro.length);
    });
})