import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor() { }

  onHeaderTabSelection = new Subject<string>();
  logInState = new Subject<null>();
  messageCount = new Subject<number>();

  headerTabChanged(tab: string) {
    this.onHeaderTabSelection.next(tab);
  }

  headerTabChangeDetection(): Observable<any> {
    return this.onHeaderTabSelection.asObservable();
  }

  emitLogInState() {
    this.logInState.next();
  }

  logInDetection(): Observable<null> {
    return this.logInState.asObservable();
  }

  emitMessageCount(count:number) {
    this.messageCount.next(count);
  }

  messageCountDetection(): Observable<number> {
    return this.messageCount.asObservable();
  }



}
