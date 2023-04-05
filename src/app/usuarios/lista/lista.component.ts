import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  public usuarios$?: Observable<Usuario[]>;
  loading: boolean = false;
  error: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(cargarUsuarios());
    this.usuarios$ = this.store.select('usuarios').pipe(
      tap(({ loading, error }) => {
        this.loading = loading;
        this.error = error;
      }),
      map(({ users }) => users)
    );
  }
}
