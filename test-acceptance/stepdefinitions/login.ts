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
const request = require('request');
const jwt = require('jsonwebtoken');
const { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(10000);

require("dotenv").config({ path: "server/config/.env" });

const baseUrl = "http://localhost:4200/";

const PageUrls = {
    INICIAL: "",
    PRINCIPAL: "home",
    LOGIN: "login",
    REDEFINIR_SENHA: "redefinir-senha",
    RECUPERAR_CONTA: "recuperar-conta",
};

const Messages = {
    ALREADY_LOGGED: 'Você já estava logado',
    EMAIL_NOT_REG: 'Email não cadastrado',
    WRONG_LOGIN: 'Email e senha não correspondem',
    REQUEST_SUCCESS: 'Link de recuperação enviado ao seu email',
    CHANGE_SUCCESS: 'Senha alterada com sucesso',
    DIFF_PASSWORDS: 'As senhas não são iguais',
    NO_SPECIAL: 'A senha precisa ter pelo menos um caractere especial',
    NO_LETTERS: 'A senha precisa ter pelo menos uma letra',
    NOT_ENOUGH_CHARS: 'A senha precisa ter pelo menos 10 caracteres',
    EXPIRED_LINK: 'Link expirado',
    TOO_MANY_TRIES: 'Número de tentativas excedido. Tente mais tarde',
    UNKNOWN_ERROR: 'Algo de errado ocorreu'
};

async function getToken(email: string){
    return jwt.sign({ email: email }, "k8JF9upql53mJ8eA", { expiresIn: '10m' });
}

async function checkLogged() {
    const cookies = await browser.manage().getCookies();
    const options = {
        url: 'http://localhost:3000/api/auth/session',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
          },
        withCredentials: true
    };

    const logged = await new Promise((resolve, reject) => {
        request(options, function(err: any, resp: any) {
            resolve(JSON.parse(resp.body).loggedIn);
        });
    });

    return logged;
}

async function logout() {
    const cookies = await browser.manage().getCookies();
    const options = {
        url: 'http://localhost:3000/api/auth/logout',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
          },
        withCredentials: true
    };

    const loggedOut = await new Promise((resolve, reject) => {
        request(options, function(err: any, resp: any) {
            resolve(JSON.parse(resp.body).success);
        });
    });

    return loggedOut;
}

async function tryLogin(email: string, password: string, param: string) {
    const data = { password: password, email: email };
    const cookies = await browser.manage().getCookies();
    const options = {

        url: 'http://localhost:3000/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
          },
        body: JSON.stringify(data),
        withCredentials: true
    };


    const result = await new Promise((resolve, reject) => {
        request(options, function(err: any, resp: any) {
            resolve(JSON.parse(resp.body)[param]);
        });
    });

    return result;
}

async function changePassword(email:string, password: string) {
    const token = await getToken(email);
    const data = { password: password, email: email, token: token};
    const cookies = await browser.manage().getCookies();

    const options = {
        url: 'http://localhost:3000/api/usuarios/',
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
          },
          body: JSON.stringify(data),
        withCredentials: true
    };

    const success = await new Promise((resolve, reject) => {
        request(options, function(err: any, resp: any) {
            resolve(JSON.parse(resp.body).success);
        });
    });

    return success;
}

defineSupportCode(function ({Given, When, Then, After}) {
    //desloga se estiver logado
    After(async () => {
        const logged = await checkLogged();
        if(logged){
            await logout();
        }
    });
    
    Given(/^eu estou na pagina "(.*)"$/, async function (pagina) {
        const expectUrl = PageUrls[(<string> pagina).toUpperCase().replaceAll(" ", "_")];
        await browser.get(baseUrl + expectUrl);
        await expect(browser.getCurrentUrl()).to.eventually.equal(baseUrl + expectUrl);
    });

    Given(/^o email "([^"]*)" já foi cadastrado com a senha "([^"]*)"$/, async (email, senha) => {
        await changePassword(<string> email,<string> senha);
        await expect(tryLogin(<string> email, <string> senha, "success")).to.eventually.equal(true);
    });

    Given(/^o email "([^"]*)" não foi cadastrado no sistema$/, async (email) => {
        await expect(tryLogin(<string> email, "", "registered")).to.eventually.equal(false);
    });

    Given('eu já estou logado no sistema', async function () {
        await browser.get(baseUrl + "login");
        await $("input[name=email]").sendKeys("jvs2@cin.ufpe.br");
        await $("input[name=senha]").sendKeys("#qwe12345678");
        await element(by.buttonText("Entrar")).click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect(checkLogged()).to.eventually.equal(true);
    });

    Given(/^eu tenho um link válido para o email "([^"]*)"$/, async (email) => {
        const url = await browser.getCurrentUrl();
        const token = await getToken(<string> email);
        const tokenUrl = url + '?token=' + token;

        await browser.get(tokenUrl);

        await expect(browser.getCurrentUrl()).to.eventually.equal(tokenUrl);
    });

    Given(/^eu já tentei logar com dados errados (\d+) vezes$/, async (vezes) => {
        await browser.get(baseUrl + PageUrls.LOGIN);
        await $("input[name=email").sendKeys("errado");
        await $("input[name=senha]").sendKeys("123");

        for(var i = 0; i < parseInt(<string> vezes); i++){
            await element(by.buttonText("Entrar")).click();
        }
    });
    
    When(/^eu digito o email "([^"]*)" em "([^"]*)"$/, async (email, elemName) => {
        await $("input[name=" + (<string> elemName).toLowerCase().replaceAll(" ", "-") + "]").sendKeys(<string> email);
    });
    
    When(/^eu digito a senha "([^"]*)" em "([^"]*)"$/, async (senha, elemName) => {
        await $("input[name=" + (<string> elemName).toLowerCase().replaceAll(" ", "-") + "]").sendKeys(<string> senha);
    });

    When(/^eu clico em "([^"]*)"$/, async (elem) => {
        await element(by.name(<string> elem)).click();
    });

    When('eu fecho a minha sessão atual e saio do site', async () => {
        await browser.close();
        await browser.restart();
    });

    When(/^eu vou para a página "([^"]*)"$/, async (pagina) => {
        const expectUrl = PageUrls[(<string> pagina).toUpperCase().replaceAll(" ", "_")];
        await browser.get(baseUrl + expectUrl);
    });
    
    Then(/^eu sou redirecionado para a página "(.*)"$/, async (pagina) => {
        const expectUrl = PageUrls[(<string> pagina).toUpperCase().replaceAll(" ", "_")];
        await new Promise(resolve => setTimeout(resolve, 2000));
        await expect(browser.getCurrentUrl()).to.eventually.equal(baseUrl + expectUrl);
    });

    Then(/^eu continuo na página "([^"]*)"$/, async (pagina) => {
        const expectUrl = PageUrls[(<string> pagina).toUpperCase().replaceAll(" ", "_")];
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect(browser.getCurrentUrl()).to.eventually.equal(baseUrl + expectUrl);
    });

    Then(/^eu estou logado no sistema$/, async () => {
        await expect(checkLogged()).to.eventually.equal(true);
    });

    Then(/^eu não estou logado no sistema$/, async () => {
        await expect(checkLogged()).to.eventually.equal(false);
    });

    Then('eu recebo uma mensagem de erro informando que o usuário não existe', async () => {
        await expect(element(by.name('message-span')).getText()).to.eventually.equal(Messages.EMAIL_NOT_REG);
    });

    Then('eu recebo uma mensagem de erro informando que a senha ou email estão errados', async () => {
        await expect(element(by.name('message-span')).getText()).to.eventually.equal(Messages.WRONG_LOGIN);
    });

    Then('eu recebo uma mensagem de que o email foi enviado com sucesso', async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect(element(by.name('message-span')).getText()).to.eventually.equal(Messages.REQUEST_SUCCESS);
    });

    Then('eu recebo uma mensagem informando que minha senha foi atualizada', async () => {
        await expect(element(by.name('message-span')).getText()).to.eventually.equal(Messages.CHANGE_SUCCESS);
    });

    Then('eu recebo uma mensagem informando que eu excedi o limite de tentativas', async () => {
        await expect(element(by.name('message-span')).getText()).to.eventually.equal(Messages.TOO_MANY_TRIES);
    });
    
    Then(/^a senha é apagada$/, async () => {
        await expect(element(by.name('senha')).getAttribute('value')).to.eventually.equal("");
    });

    Then(/^o botão "([^"]*)" fica desativado$/, async (botao) => {
        await expect(element(by.buttonText(<string> botao)).isEnabled()).to.eventually.equal(false);
    });

    Then(/^a senha do email "([^"]*)" foi alterada para "([^"]*)"$/, async (email, senha) => {
        await expect(tryLogin(<string> email, <string> senha, "success")).to.eventually.equal(true);
    });
    
});
