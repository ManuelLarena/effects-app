import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as usuariosActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuario),
      mergeMap((action) =>
        this.usuarioService.getUserById(action.id).pipe(
          map((user) =>
            usuariosActions.cargarUsuarioSuccess({ usuario: user })
          ),
          catchError((err) =>
            of(usuariosActions.cargarUsuarioError({ payload: err }))
          )
        )
      )
    )
  );
}
