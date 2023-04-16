import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Itens, Categoria } from 'src/app/common/global-types';
import { ItemService } from 'src/app/services/item.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ObjectId } from 'mongodb';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})

export class EditItemComponent implements OnInit {
  item!: Itens;
  itemModifiqued!: Itens;
  category_list! : Categoria[];
  errorMsg!: string;

  constructor(private itemservice: ItemService, private route: ActivatedRoute, private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.itemservice.getAll('/itens/' + id).subscribe((resultado) => {
      this.item = resultado as Itens;
      this.itemModifiqued = {...this.item};

    })

    this.categoriaService.getCategories().subscribe((result) => {
      this.category_list = result as Categoria[];
    });
  }

  updateItem() {
    let id = '';

    if (this.item._id) {
      id = this.item._id.toString();
    }
    
    this.itemModifiqued.nome = (<HTMLInputElement>document.getElementById('input-nome')).value;
    this.itemModifiqued.descricao = (<HTMLInputElement>document.getElementById('input-desc')).value;
    this.itemModifiqued.quantidade = Number((<HTMLInputElement>document.getElementById('input-quantidade')).value);
    this.itemModifiqued.preco = Number((<HTMLInputElement>document.getElementById('input-preco')).value);
    this.itemModifiqued.forma_pagamento = (<HTMLInputElement>document.getElementById('input-pagamento')).value.split(",");
    this.itemModifiqued.categoria = (<HTMLInputElement>document.getElementById('input-categoria')).value.split(",");

    this.itemservice.editItem('/itens/' + id, this.itemModifiqued).subscribe(
      (result) => {
        this.errorMsg = ''
        this.router.navigate(['home', 'view-itens']);
      },
      (erro) => {
        this.errorMsg = erro.error.message;
      }
    );
  }

  validarEdicao(): boolean {
    const quantidade = (<HTMLInputElement>document.getElementById('input-quantidade')).value;
    const preco = (<HTMLInputElement>document.getElementById('input-preco')).value;
    const forma_pagamento = (<HTMLInputElement>document.getElementById('input-pagamento')).value;
    const categoria = (<HTMLInputElement>document.getElementById('input-categoria')).value;
    const titulo = (<HTMLInputElement>document.getElementById('input-nome')).value;
    const descricao = (<HTMLInputElement>document.getElementById('input-desc')).value;

    if (quantidade && preco && forma_pagamento && categoria && titulo && descricao) {
      return true;
    }
    return false;
  }

  onImageSelected(event: any): void {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      
      if (reader.result){
        this.itemModifiqued.imagem = reader.result.toString()
      }
    };
  }
}