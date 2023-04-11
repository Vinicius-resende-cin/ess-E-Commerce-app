# Estrutura do projeto a ser utilizado na disciplina de ESS

### Dependências

- Angular
- Node 
- npm

### Instalando dependências 
```
sudo apt install npm
sudo npm install -g @angular/cli
```
### Iniciando o projeto
```
cd web-app
sudo npm install
cd ..
cd server
sudo npm install
cd ..
cd test-acceptance
sudo npm install
```
### Rodando o projeto
Iniciar o servidor
```
cd server
npm start
```
Iniciando o frontend
```
cd web-app
ng serve
```
### Iniciando os Testes
```
cd test-acceptance
npm run webdriver-update
npm run webdriver-start

(em outro terminal)
cd test-acceptance
npm test
```
