import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Subscription } from '../../../../node_modules/rxjs';
import { GrowlService } from './growl.service';

@Component({
  selector: 'app-growl',
  templateUrl: './growl.component.html',
  styleUrls: ['./growl.component.css']
})
export class GrowlComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
  subscription: Subscription;

  constructor(private growlSevice: GrowlService) {}

  ngOnInit() {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.subscription = this.growlSevice.notificationChange.subscribe(notification => {
      this.msgs = [];
      this.msgs.push(notification);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
