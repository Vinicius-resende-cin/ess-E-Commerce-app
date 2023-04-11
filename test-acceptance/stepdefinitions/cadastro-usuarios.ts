import { defineSupportCode } from "cucumber";
import { get } from "http";
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
const request = require("request");
let expect = chai.expect;
let assert = chai.assert;

async function getTitleAlert(){
   // Obter a lista de janelas abertas pelo navegador
   const handles = await browser.getAllWindowHandles();
   // Mudar para a janela modal (a última na lista)
   await browser.switchTo().window(handles[handles.length - 1]);
   // Procurar o elemento que contém o título da janela modal
   const titleElement = $('h2.swal2-title');
   // Obter o texto do elemento
   const title = await titleElement.getText();

   return title
   
}

const formatDateToInput = (dt: string): string => {
  let split_dt = dt.split("/");
  return split_dt[2] + "-" + split_dt[1] + "-" + split_dt[0];
};

async function getInfo(info:string) {
  const options = {
    url: "http://localhost:3000/api/users/verify/" + info,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let infoResp: any;
  const existInfo: any = await new Promise((resolve, reject) => {
    request(options, function (err: any, resp: any) {
      resolve(resp.body);
    });
  });

  return existInfo
}

async function checkEmail(info:string) {
  
  let existInfo:any = getInfo(info)

  if (existInfo.length === 0){
    return 0
  }else{
    return 1;
  }
  
}

async function checkPermission(info:string) {
  let existInfo:any = getInfo(info)
  return existInfo.permissao
}


defineSupportCode(function ({ Given, When, Then }) {

    Given(/^O sistema já possui "([^\"]*)" "([^\"]*)" já cadastrado$/,async (campo: string, name: string) => {
      let exist: any = await checkEmail(name);
      (elems => expect(Promise.resolve(exist)).to.eventually.equal(1));
    });

    Given(/^Eu vejo o usuário de "([^\"]*)" "([^\"]*)", "([^\"]*)" em "([^\"]*)", "([^\"]*)" em "([^\"]*)" na tabela de usuários do sistema$/,async (Nome: string, campoNome: string, CPF:string, campoCPF, email:string, campoEmail:string) => {
      let exist: any = await checkEmail(CPF);
      (elems => expect(Promise.resolve(exist)).to.eventually.equal(1));
    });

    When(/^Escrevo "([^\"]*)" em "([^\"]*)"$/, async (name: string, campo: string) =>{
      if (campo == "data de nascimento"){
        campo = "dt-nascimento"
        name = formatDateToInput(<string>name);
      }
      await $(`input[name=${campo}]`).sendKeys(<string> name);
    });

    When(/^Clico em "([^\"]*)"$/,async (name:string) => {
      await $(`button[name=${name}]`).click();
    });

    When(/^Clico na opcao "([^\"]*)"$/,async (name:string) => {
      await element(by.buttonText(name)).click();
    }); 

    When(/^Eu clico no Botão "([^\"]*)" do usuário "([^\"]*)"$/,async (nameButton:string , cpfUser:string) => {
      var allButtons = element.all(by.name(nameButton));

      var elem = (allButtons.filter(elemento =>(elemento.getAttribute('id').then (ids => ids === 'btn-' + cpfUser)))).first();

      await elem.click()

    });

    Then(/^Eu recebo uma mensagem de sucesso, "([^\"]*)"$/,async (msg: string) => {
      const title = await getTitleAlert()
      expect(title).to.equal(msg);
     
   });

    Then(/^Eu recebo uma mensagem de erro, "([^\"]*)"$/,async (msg: string) => {
      const title = await getTitleAlert()
      expect(title).to.equal(msg);

    });

    Then(/^Verifico que este usuário de "([^\"]*)" "([^\"]*)" possui a permissao de "([^\"]*)"$/,async (cpfCampo:string, cpf:string, permissao:string) => {
      let valuePermissao = 0;
      if (permissao == "admim")
        valuePermissao = 1;

        let exist: any = await checkPermission(cpf);
        (elems => expect(Promise.resolve(exist)).to.eventually.equal(valuePermissao));
    });
});