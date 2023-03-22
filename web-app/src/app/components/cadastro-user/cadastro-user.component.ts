import { Component } from '@angular/core';
import { User } from '../../../../../commom/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.scss']
})
export class CadastroUserComponent {
  passwordSize: boolean = false;
  passwordDiff: boolean = false;
  user = this.criaUser();

  constructor(private userservice: UserService){}

  criaUser(): User{
    let user: User = {
      nomeCompleto: "",
      celular: "",
      dataNasci: "",
      email: "",
      emailC: "",
      senha: "",
      senhaC: "",
      endereco: "",
      complemento: "",
      cep: "",
      estado: "",
      cidade: ""
    }

    return user
  }

  verificaSenha(){
    
    if (this.user.senha == this.user.senhaC){
        this.passwordDiff = false;
      }
      else{
        this.passwordDiff = true;
    }
    
    
    if(this.user.senha.length >=8 ){
      this.passwordSize = false;
    }
    else if(this.user.senha == ""){
      this.passwordSize = false;
    
    }
    else{
      this.passwordSize = true;
      
    }
  }

  enviaUser(){
    this.userservice.createUser(this.user).subscribe(
      (result) => {console.log(result)
      this.user=this.criaUser()} 
    )
  }

  
}
