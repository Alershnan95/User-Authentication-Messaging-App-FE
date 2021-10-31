import { Component, OnInit } from '@angular/core';

import Store from 'src/app/store';
import { cloneObject, doNothing, errorHandler } from 'src/app/shared/util';

import { EventsService } from 'src/app/shared/services/events.service';
import { AuthService } from 'src/app/shared/services/http-services/auth.service';
import { MessageService } from 'src/app/shared/services/http-services/message.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private _message: MessageService, private events: EventsService, private _auth: AuthService, public store: Store) { }

  selectedReceipientEmail = null;
  storeModel = cloneObject(this.store);
  message = '';

  ngOnInit(): void {
    this.enableLogOutButton();
    this.getReceipientEmails();
  }

  enableLogOutButton() {
    this.events.emitLogInState();
  }

  identify(index: number, item: any) {
    return item.email;
  }

  getReceipientEmails() {
    this._auth.getUsersEmails().subscribe((response: any) => {
      (response && response.users) ? this.store.allUserEmails = response.users : doNothing();
      this.storeModel = this.store;
    }, (err: any) => errorHandler(err));
  }

  onEmailSelect(email: any) {
    this.selectedReceipientEmail = email;
  }

  sendMessage() {
    if (!(this.store.userInfo && this.store.userInfo.user && this.store.userInfo.user._id)) {
      errorHandler({ error: { message: 'Something went wrong. Please try again!' } });
      return;
    }
    const request = {
      "sender": this.store.userInfo.user._id,
      "receiver": [this.selectedReceipientEmail],
      "message": this.message,
      "senderName": this.store.userInfo.user.name
    }
    this._message.sendMessage(request).subscribe((response: any) => {
      const successMessage = 'Message has been sent successfully!';
      const snackbarMetadata = { duration: 3000 };
      (response && response.message && response.message._id) ? this._snackBar.open(successMessage, 'SUCCESS', snackbarMetadata) : doNothing();
      this.selectedReceipientEmail = null;
      this.storeModel = cloneObject(this.store);
      this.message = '';
    }, (err: any) => errorHandler(err));
  }


}



