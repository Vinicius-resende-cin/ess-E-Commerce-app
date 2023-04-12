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
const request = require('request');
let expect = chai.expect;
let assert = chai.assert;

const baseUrl = "http://localhost:4200/home/categoria";
const serverUrl = "http://localhost:3000/api/categorias";

defineSupportCode(function ({ Given, When, Then }) {
  Given(
    /^eu não vejo nenhuma categoria de "([^"]*)" cadastrada no sistema$/,
    async (nomeCategoria: string) => {
      const endpointURL = serverUrl + "/" + nomeCategoria;
      await request.del(endpointURL, null);
      await browser.refresh();
      
      const categoria = await element(by.cssContainingText('.nome-categoria', nomeCategoria));
  
      expect(await categoria.isPresent()).to.be.false;
  });

  Given(
    /^eu vejo uma categoria de "([^"]*)" cadastrada no sistema$/,
    async (nomeCategoria: string) => {
      const categoria = element(by.cssContainingText('.nome-categoria', nomeCategoria));
  
      expect(await categoria.isPresent()).to.be.true;
  });

  Given(/^eu estou na página da categoria "([^"]*)"$/, async function (pagina: string) {
    await browser.get(baseUrl);
    
    const tabelaCategorias = await element(by.css('.table'));
    const linhaCategoria = await tabelaCategorias.element(by.cssContainingText('.nome-categoria', pagina)).element(by.xpath('..'));
    await linhaCategoria.element(by.buttonText('Editar')).click();

    await expect(browser.getCurrentUrl()).to.eventually.equal(baseUrl + '/' + pagina);
  });

  Given(
    /^eu vejo que a categoria "([^"]*)" possui a descrição "([^"]*)"$/,
    async (nomeCategoria: string, descricaoCategoria: string) => {
      const descBox = await element(by.css('[name=desc-box]'));
      const descricaoAtual = await descBox.getAttribute('value');
      
      expect(descricaoAtual).to.equal(descricaoCategoria);
  });

  When (
    /^eu seleciono a opção "([^"]*)"$/,
    async (btn: string) => {
      await element(by.name(btn)).click();
  });

  When (
    /^eu adiciono uma categoria de "([^"]*)" com descrição "([^"]*)"$/,
    async (nomeCategoria: string, descricaoCategoria: string) => {
      await element(by.name("name-box")).sendKeys(nomeCategoria);
      await element(by.name("desc-box")).sendKeys(descricaoCategoria);
  });

  When (
    /^eu tento adicionar uma nova categoria sem nenhum nome$/,
    async () => {
      await element(by.name("name-box")).sendKeys();
  });

  When (
    /^eu altero a informação para "([^"]*)"$/,
    async (descricaoCategoria: string) => {
      await element(by.name("desc-box")).clear();
      await element(by.name("desc-box")).sendKeys(descricaoCategoria);
  });

  Then(
    /^eu vejo uma mensagem de "([^"]*)"$/,
    async (mensagem: string) => {
      const msg = await element(by.cssContainingText('[id=message]', mensagem));
  
      expect(await msg.isPresent()).to.be.true;
  });

  Then(
    /^eu vejo que a categoria de "([^"]*)" ainda não está cadastrada no sistema$/,
    async (nomeCategoria: string) => {
      const categoria = await element(by.cssContainingText('.nome-categoria', nomeCategoria));
  
      expect(await categoria.isPresent()).to.be.false;
  });

  Then(
    /^eu vejo a descrição "([^"]*)" na categoria "([^"]*)"$/,
    async (descricaoCategoria: string, nomeCategoria: string) => {
      const tabelaCategorias = await element(by.css('.table'));
      const linhaCategoria = await tabelaCategorias.element(by.cssContainingText('.nome-categoria', nomeCategoria)).element(by.xpath('..'));
      const descricaoAtual = await linhaCategoria.element(by.css('.descricao-categoria')).getText();

      expect(descricaoAtual).to.equal(descricaoCategoria);
  });
});