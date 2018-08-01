import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'pg-offline-bar',
    templateUrl: './offline.component.html',
    styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit, OnDestroy {

    isOnline: boolean;

    private unsubscribe: Subject<void>;

    ngOnInit() {
        this.unsubscribe = new Subject();

        this.isOnline = true;

        interval(1000)
            .pipe(
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.isOnline = navigator.onLine;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
