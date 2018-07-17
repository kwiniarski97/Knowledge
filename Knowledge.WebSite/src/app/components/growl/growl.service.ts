import { Injectable } from '@angular/core';
import { Subject } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrowlService {
  notificationChange: Subject<Object> = new Subject<Object>();

  error(summary: string, details?: string) {
    this.notify('error', summary, details);
  }

  success(summary: string, details?: string) {
    this.notify('success', summary, details);
  }

  info(summary: string, details?: string) {
    this.notify('info', summary, details);
  }

  private notify(severity: string, summary: string, detail: string) {
    this.notificationChange.next({ severity, summary, detail });
  }
}
