import { Injectable } from '@angular/core';

@Injectable()
export default class Store {
  isUserAuthenticated = false;
  headerTabSelected = 'signUp';
  messageCount = 0;
  userInfo: any = {};
  notificationMessages = [];
  allUserEmails = [];
}

