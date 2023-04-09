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

defineSupportCode(function({Given, When, Then}) {
    Given(/^Estou vendo o histórico de pedidos da minha conta$/, async() => {
        await browser.get(baseUrl + "home/historico-pedidos");
    });

    Given(/^Estou vendo o item "(.*)" do pedido "(\d*)" no histórico$/, async(item, pedido) => {
        await browser.sleep(3000);
        var allItens = element.all(by.name('item'));
        await allItens.filter(elemento => (elemento.getAttribute('id').then(ids => ids === 'btn-' + pedido + '-' + item))).then
            (elemento => expect(Promise.resolve(elemento.length)).to.eventually.equal(1));
    });

    Given(/^Vejo que o produto "(.*)" do pedido "(\d*)" ainda tem "(\d*)" em estoque no sistema$/, async(item, pedido, quant) => {
        var allQuantidade = element.all(by.name('estoque'));

        var elem = (allQuantidade.filter(elemento => (elemento.getAttribute('id').then
        (ids => ids === 'estoque-' + pedido + '-' + item)))).first();

        await expect(Promise.resolve(elem.getText())).to.eventually.equal(quant);
    });

    Given(/^Vejo que o produto "(.*)" do pedido "(\d*)" não está em estoque no sistema$/, async(item, pedido) => {
        var allQuantidade = element.all(by.name('estoque'));

        var elem = (allQuantidade.filter(elemento => (elemento.getAttribute('id').then
        (ids => ids === 'estoque-' + pedido + '-' + item)))).first();

        await expect(Promise.resolve(elem.getText())).to.eventually.equal('0');
    });

    Given(/^foram compradas "(\d*)" "(.*)" no pedido "(\d*)"$/, async(quant, item, pedido) => {
        var allQuantidade = element.all(by.name('quantidade'));

        var elem = (allQuantidade.filter(elemento => (elemento.getAttribute('id').then
        (ids => ids === 'quantidade-' + pedido + '-' + item)))).first();

        await expect(Promise.resolve(elem.getText())).to.eventually.equal(quant);
    });

    Given(/^Vejo que em "(.*)" houveram "(\d*)" pedidos$/, async(data, quantidade) => {
        var allHoras = element.all(by.name('hora'));

        var filtro = await allHoras.filter(async function(elemento) {
            return (await elemento.getText()).includes(<string> data);
        });

        await expect(Promise.resolve(String(filtro.length))).to.eventually.equal(quantidade);
    });

    When(/^Eu seleciono o produto "(.*)" do pedido "(\d*)"$/, async(item, pedido) => {
        var allItens = element.all(by.name('item'));

        var elem = (allItens.filter(elemento => (elemento.getAttribute('id').then
        (ids => ids === 'btn-' + pedido + '-' + item)))).first();

        await elem.click();
    });

    When (/^Eu seleciono "(.*)" no pedido "(\d*)"$/, async(nome, pedido) => {
        var allComprar = element.all(by.name('comprar'));

        var elem = (allComprar.filter(elemento => (elemento.getAttribute('id').then
        (ids => ids === 'btn-' + pedido)))).first();

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
        var allItens = element.all(by.name('item'));

        await allItens.filter(elemento => (elemento.getAttribute('id').then(ids => ids === 'nome-' + item))).then
            (elemento => expect(Promise.resolve(elemento.length)).to.eventually.equal(1));
    });

    Then(/^Eu vejo que o produto "(.*)" não esta no carrinho de compras$/, async(item) => {
        var allItens = element.all(by.name('item'));

        await allItens.filter(elemento => (elemento.getAttribute('id').then(ids => ids === 'nome-' + item))).then
            (elemento => expect(Promise.resolve(elemento.length)).to.eventually.equal(0));
    });

    Then(/^Eu vejo que "(\d*)" unidades do item "(.*)" estão no carrinho de compras$/, async(quant, item) => {
        var allItens = element.all(by.name('quant'));

        var elem = (allItens.filter(elemento => (elemento.getAttribute('id').then
        (ids => ids === 'quant-' + item)))).first();

        await expect(Promise.resolve(elem.getText())).to.eventually.equal(quant);
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