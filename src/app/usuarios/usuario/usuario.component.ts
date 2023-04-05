import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducers';
import { cargarUsuario } from '../../store/actions/usuario.actions';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
  public usuario$?: Observable<Usuario>;
  loading: boolean = false;
  error: any;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.router.params.pipe().subscribe(({ id }) => {
      this.store.dispatch(cargarUsuario({id}));
    });

    this.usuario$ = this.store.select('usuario').pipe(
      tap(({ loading, error }) => {
        this.loading = loading;
        this.error = error;

      }),
      map(({ user }) => user)
    );
  }
}
