import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import Store from 'src/app/store';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteGuard implements CanActivate {

  constructor(private store: Store) { }

  canActivate(): boolean {
    return this.store.isUserAuthenticated;
  }

}
