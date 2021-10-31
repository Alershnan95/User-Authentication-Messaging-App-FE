import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import Store from 'src/app/store';
import { camelToNormalCase, cloneObject, doNothing, errorHandler } from 'src/app/shared/util';
import { constants, RouteUrlConstants } from 'src/app/shared/constants/constants'
import { FormFields } from 'src/app/shared/models/auth.model';

import { EventsService } from 'src/app/shared/services/events.service';
import { AuthService } from 'src/app/shared/services/http-services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/http-services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit, OnDestroy {
  constructor(private _snackBar: MatSnackBar,private _message: MessageService, private store: Store, private events: EventsService, private _auth: AuthService,
    private router: Router) { }

  storeModel = this.store;
  actionButtonLabel = constants.buttonLabels.SUBMIT;
  headerLabel = 'Sign Up';
  form = new FormFields();
  headerTabSubscription$: Subscription = new Subscription;

  ngOnInit(): void {
    this.subscribeHeaderTabChanges();
  }

  ngOnDestroy() {
    this.headerTabSubscription$.unsubscribe();
  }

  subscribeHeaderTabChanges() {
    this.headerTabSubscription$ = this.events.headerTabChangeDetection().subscribe((tab: string) => {
      this.headerLabel = camelToNormalCase(tab);
      this.actionButtonLabel = (this.headerLabel === 'Sign In') ? constants.buttonLabels.LOGIN : constants.buttonLabels.SUBMIT;
    });
  }

  performAction() {
    const request = cloneObject(this.form);
    (this.storeModel.headerTabSelected === 'signIn') ? delete request.name : doNothing();
    switch (this.storeModel.headerTabSelected) {
      case 'signIn':
        this.loginIn(request);
        break;

      case 'signUp':
        this.signUpUser(request);
        break;
    }

  }

  loginIn(request: any) {
    this._auth.signIn(request).subscribe((response: any) => {
      this.authCallback(response, 'Logged In Successfully!');
    }, (err: any) => errorHandler(err));
  }

  signUpUser(request: any) {
    this._auth.signUp(request).subscribe((response: any) => {
      this.authCallback(response, 'Signed Up Successfully!');
    }, (err: any) => errorHandler(err));
  }

  authCallback(response: any, message: string) {
    this.store.isUserAuthenticated = !!(response && response.token);
    const snackbarMetadata = { duration: 3000 };
    (this.store.isUserAuthenticated) ? this._snackBar.open(message, 'SUCCESS', snackbarMetadata) : doNothing();
    if (!(response && response.token && response.user && response.user._id)) {
      errorHandler({ error: { message: 'Something went wrong. Please try again!' } });
      return;
    }
    this.store.userInfo = response;
    this.updateMessageCount(response);
    (this.store.isUserAuthenticated) ? this.router.navigateByUrl(RouteUrlConstants.HOME) : doNothing();
  }

  updateMessageCount(response: any) {
    const request = {
      receiver: [response.user._id]
    }
    this._message.getMessageCount(request).subscribe((response: any) => {
      (response && response.count) ? this.store.messageCount = response.count : doNothing();
      this.events.emitMessageCount(response.count);
    }, (err: any) => errorHandler(err));
  }
}



