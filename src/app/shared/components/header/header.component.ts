import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import Store from 'src/app/store';
import { RouteUrlConstants } from '../../constants/constants';
import { EventsService } from '../../services/events.service';
import { MessageService } from '../../services/http-services/message.service';
import { doNothing, errorHandler } from '../../util';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  notificationMessages: any;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog, private _message: MessageService, private store: Store, private events: EventsService, private router: Router) { }

  storeModel = this.store;
  isUserAuthenticated = this.store.isUserAuthenticated;
  logInSubscription$: Subscription = new Subscription;
  messageSubscription$: Subscription = new Subscription;
  showNotification: boolean = false;
  notificationMessages: any;

  ngOnInit() {
    this.subscribeSuccessfulLogIn();
    this.subscribeMessageCount();
  }

  ngOnDestroy() {
    this.logInSubscription$.unsubscribe();
  }

  onTabSelect(tab: string): void {
    this.store.headerTabSelected = tab;
    if (tab === 'logOut') {
      this.store.headerTabSelected = 'signUp';
      this.store.isUserAuthenticated = false;
    }
    if (tab === 'notifications') {
      this.store.headerTabSelected = 'signUp';
      this.viewMessages();
    }
    this.events.headerTabChanged(tab);
    (tab === 'logOut') ? this.router.navigateByUrl(RouteUrlConstants.AUTH).then(() => {
      this.isUserAuthenticated = this.store.isUserAuthenticated;
    }) : doNothing();
  }

  subscribeSuccessfulLogIn() {
    this.logInSubscription$ = this.events.logInDetection().subscribe(() => { this.isUserAuthenticated = this.store.isUserAuthenticated });
  }

  viewMessages() {
    if (!(this.store.userInfo && this.store.userInfo.user && this.store.userInfo.user._id)) {
      errorHandler({ error: { message: 'Something went wrong. Please try again!' } });
      return;
    }
    const request = {
      "receiver": this.store.userInfo.user._id
    };
    this._message.viewMessages(request).subscribe((response: any) => {
      this.notificationMessages = response.messages || [];
      this.showNotification = !this.showNotification;
      this.dialog.open(DialogOverviewExampleDialog, {
        width: '550px',
        height: '500px',
        data: { notificationMessages: this.notificationMessages, }
      });
    }, (err: any) => errorHandler(err));
  }

  subscribeMessageCount() {
    this.messageSubscription$ = this.events.messageCountDetection().subscribe((count) => { this.storeModel.messageCount = count });
  }

  openNotification(state: boolean) {
    this.showNotification = state;
  }


}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  identify(index: number, item: any) {
    return item.message;
  }

}
