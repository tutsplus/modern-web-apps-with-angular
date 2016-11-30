import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';

@Injectable()
export class EmitterService {
    private events = new Subject();

    subscribe(next, error, onComplete) {
        return this.events.subscribe(next, error, onComplete);
    }

    next(evt) {
        this.events.next(evt);
    }
}
