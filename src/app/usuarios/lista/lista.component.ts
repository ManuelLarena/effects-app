import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {

  // public usuarios: Usuario[] = [];
  public usuarios?: Observable<Usuario[]>;

  constructor(public usuariosService: UsuarioService) { }

  ngOnInit(): void {
    // this.usuariosService.getUsers().subscribe(data => {
    //   console.log(data);
    //   this.usuarios = data;
    // })
    this.usuarios = this.usuariosService.getUsers();
  }

}
