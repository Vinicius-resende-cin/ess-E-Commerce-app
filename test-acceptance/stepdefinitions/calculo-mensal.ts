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

const formatDateToInput = (dt: string): string => {
  let split_dt = dt.split("/");
  return split_dt[1] + "-" + split_dt[0];
};

const sumValues = async (list: ElementArrayFinder): Promise<number> => {
  let sum = 0;
  sum += await list.reduce(async function (acc: number, elem: ElementFinder) {
    let items = elem.$$("td");

    let value =
      (await items.count()) > 0
        ? Number(await items.get(3).getAttribute("innerText"))
        : 0;

    return acc + value;
  }, 0);
  return sum;
};

defineSupportCode(function ({ Given, When, Then }) {
  Given(
    /^no período de "(\d{2}\/\d{4})" até "(\d{2}\/\d{4})" houveram "(\d+)" pedidos, de valor total igual a "R\$(\d+,\d{2})"$/,
    async function (dataInicio, dataFim, quantPedidos, valorTotal) {
      this.periodo = {
        inicio: formatDateToInput(<string>dataInicio),
        fim: formatDateToInput(<string>dataFim)
      };
      this.quantPedidos = Number(`${quantPedidos}`.replaceAll(",", "."));
      this.valorTotal = Number(`${valorTotal}`.replaceAll(",", "."));
    }
  );

  When(
    /^eu seleciono o período do cálculo de "(\d{2}\/\d{4})" até "(\d{2}\/\d{4})"$/,
    async function (dataInicio, dataFim) {
      let inicio = formatDateToInput(<string>dataInicio);
      let fim = formatDateToInput(<string>dataFim);

      await assert.eventually.equal(
        Promise.resolve(inicio),
        this.periodo.inicio,
        `O período selecionado é diferente do informado anteriormente!`
      );

      await assert.eventually.equal(
        Promise.resolve(fim),
        this.periodo.fim,
        `O período selecionado é diferente do informado anteriormente!`
      );

      await browser.executeScript(
        `document.querySelector('input#start-month').value = '${inicio}'`
      );

      await browser.executeScript(
        `document.querySelector('input#end-month').value = '${fim}'`
      );

      await element(by.name("filtrar")).click();
    }
  );

  When(/^eu filtro os pedidos sem adicionar um período$/, async function () {
    await browser.executeScript(`document.querySelector('input#start-month').value = ''`);

    await browser.executeScript(`document.querySelector('input#end-month').value = ''`);

    await element(by.name("filtrar")).click();
  });

  When(/^eu seleciono por "(.*)" dos pedidos$/, async function (propriedade) {
    let checkBtn = element(
      by.name((<string>propriedade).toLowerCase().replaceAll(" ", "-") + "-check")
    );

    if (!(await checkBtn.isSelected())) {
      await checkBtn.click();
    }

    await expect(checkBtn.isSelected()).to.eventually.be.true;
  });

  Then(
    /^eu posso ver o "(.*)" dos pedidos igual a "(.*)"$/,
    async function (propriedade, valor) {
      await expect(
        element(
          by.name((<string>propriedade).toLowerCase().replaceAll(" ", "-"))
        ).isPresent()
      ).to.eventually.be.true;

      await assert.eventually.equal(
        element(by.name((<string>propriedade).toLowerCase().replaceAll(" ", "-")))
          .getText()
          .then((txt) => {
            return txt.replaceAll(" ", "");
          }),
        <string>valor,
        `${<string>propriedade} não possui o valor esperado!`
      );
    }
  );

  Then(/^eu não posso ver o "(.*)" dos pedidos$/, async function (propriedade) {
    let checkBtn = element(
      by.name((<string>propriedade).toLowerCase().replaceAll(" ", "-") + "-check")
    );

    if (await checkBtn.isSelected()) {
      await checkBtn.click();
    }

    await expect(checkBtn.isSelected()).to.eventually.be.false;

    await expect(
      element(
        by.name((<string>propriedade).toLowerCase().replaceAll(" ", "-"))
      ).isPresent()
    ).to.eventually.be.false;
  });

  Then(/^eu posso ver a lista de pedidos do período$/, async function () {
    let listaPedidos: ElementArrayFinder = $$("tr");
    let quantPedidos = listaPedidos.count();
    await expect(quantPedidos).to.eventually.equal(this.quantPedidos + 1);

    let listaTotVal = sumValues(listaPedidos);
    await expect(listaTotVal).to.eventually.equal(this.valorTotal);
  });
});
