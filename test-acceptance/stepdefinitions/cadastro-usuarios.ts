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

const Messages = {
  SUCCESSFUL_CAD: "Usuário Cadastrado no Sistema",
  SUCCESSFUL_CHANGE_PASS: "Senha foi alterada com sucesso",
  SUCCESSFUL_CHANGE_ADR: "As informações do endereço foi alterada com sucesso",
  SUCCESSFUL_DELETE_USER: "Usuário Removido com sucesso",
  SUCCESSFUL_CHANGE_PERMI: "Usuário Teve a permissão alterada com sucesso",
  ERRO_SIZE_PASSWORD: "Senha Inválida",
  ERRO_REPEATED_EMAIL: "E-mail inválido",
  ERRO_REPEATED_CPF: "CPF inválido",
  ERRO_ACTUAL_PASS: "Senha inserida está incorreta",
  ERRO_NEW_PASS: "A nova senha não segue as regras para criação de senha"
};

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

    Then(/^Eu recebo uma mensagem de cadastro realizado$/,async () => {
       const title = await getTitleAlert()
      expect(title).to.equal(Messages.SUCCESSFUL_CAD);
      
    });

    Then(/^Eu recebo uma mensagem de senha erro no cadastro, senha com menos que 8 dígitos$/,async () => {
      const title = await getTitleAlert()
      expect(title).to.equal(Messages.ERRO_SIZE_PASSWORD);
     
   });

    Then(/^Eu recebo uma mensagem de Erro do cadastro, e-mail já utilizado$/,async () => {
      const title = await getTitleAlert()
      expect(title).to.equal(Messages.ERRO_REPEATED_EMAIL);

    });

    Then(/^Eu recebo uma mensagem de Erro do cadastro, CPF já utilizado$/,async () => {
      const title = await getTitleAlert()
      expect(title).to.equal(Messages.ERRO_REPEATED_CPF);

    });

    Then(/^Eu recebo uma mensagem de Senha alterada com Sucesso$/,async () => {
      const title = await getTitleAlert()
      expect(title).to.equal(Messages.SUCCESSFUL_CHANGE_PASS);

    });

    Then(/^Eu recebo uma mensagem de erro, senha atual errada$/,async () => {
      const title = await getTitleAlert()
      expect(title).to.equal(Messages.ERRO_ACTUAL_PASS);

    });

    Then(/^Eu recebo uma mensagem de erro, nova senha invállida$/,async () => {
      const title = await getTitleAlert()
      expect(title).to.equal(Messages.ERRO_NEW_PASS);

    });
    
    Then(/^Eu recebo uma mensagem de endereço alterado com Sucesso$/,async () => {
      const title = await getTitleAlert()
      expect(title).to.equal(Messages.SUCCESSFUL_CHANGE_ADR);

    });

    Then(/^Eu recebo uma mensagem de que o usuário foi excluído$/,async () => {
      const title = await getTitleAlert()
      expect(title).to.equal(Messages.SUCCESSFUL_DELETE_USER);

    });

    Then(/^Eu recebo uma mensagem de que o usuário teve sua permissao alterada$/,async () => {
      const title = await getTitleAlert()
      expect(title).to.equal(Messages.SUCCESSFUL_CHANGE_PERMI);
    });

    Then(/^Verifico que este usuário de "([^\"]*)" "([^\"]*)" possui a permissao de "([^\"]*)"$/,async (cpfCampo:string, cpf:string, permissao:string) => {
      let valuePermissao = 0;
      if (permissao == "admim")
        valuePermissao = 1;

        let exist: any = await checkPermission(cpf);
      (elems => expect(Promise.resolve(exist)).to.eventually.equal(valuePermissao));
    });
});