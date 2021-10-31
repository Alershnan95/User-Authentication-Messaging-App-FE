import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpApiConstants } from 'src/app/shared/constants/constants'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) { }

  viewMessages(request: any): any {
    return this.http.post(HttpApiConstants.message.VIEW_MESSAGES, request);
  }

  getMessageCount(request: any): any {
    return this.http.post(HttpApiConstants.message.GET_MESSAGE_COUNT, request);
  }

  sendMessage(request: any): any {
    return this.http.post(HttpApiConstants.message.SEND_MESSAGE, request);
  }

}
