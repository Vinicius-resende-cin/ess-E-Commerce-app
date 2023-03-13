import { defineSupportCode } from "cucumber";
import { browser, $, $$, element, ElementArrayFinder, by } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
let assert = chai.assert;

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

  Given(
    /^no período de "(\d{2}\/\d{4})" até "(\d{2}\/\d{4})" houveram "(\d+)" pedidos, de valor total igual a "R\$(\d+,\d{2})"$/,
    async function (dataInicio, dataFim, quantPedidos, valorTotal) {
      this.periodo = {
        inicio: dataInicio,
        fim: dataFim
      };
      this.quantPedidos = quantPedidos;
      this.valorTotal = valorTotal;
    }
  );

  When(
    /^eu seleciono o período do cálculo de "(\d{2}\/\d{4})" até "(\d{2}\/\d{4})"$/,
    async function (dataInicio, dataFim) {
      this.filtro = {
        inicio: dataInicio,
        fim: dataFim
      };
      await $("input[name='data-inicio']").sendKeys(<string>dataInicio);
      await $("input[name='data-fim']").sendKeys(<string>dataFim);
      await element(by.name("filtrar")).click();
    }
  );

  Then(
    /^eu posso ver o "(.*)" dos pedidos igual a "(.*)"$/,
    async function (propriedade, valor) {
      await assert.eventually.equal(
        element(
          by.name((<string>propriedade).toLowerCase().replaceAll(" ", "-"))
        ).getText(),
        <string>valor,
        `${<string>propriedade} não possui o valor esperado!`
      );
    }
  );

  Then(/^eu posso ver a lista de pedidos do período$/, async function () {
    let listaPedidos: ElementArrayFinder = $$("tr");
    await listaPedidos.then((elems) =>
      expect(Promise.resolve(elems.length)).to.eventually.equal(this.quantPedidos + 1)
    );
  });
});
