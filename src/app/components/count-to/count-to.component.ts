import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'pg-count-to',
    templateUrl: './count-to.component.html',
    styleUrls: ['./count-to.component.scss']
})
export class CountToComponent implements OnInit, OnChanges, OnDestroy {

    @Input() duration: number;
    @Input() interval: number;
    @Input() countTo: number;

    displayValue: number;

    private currentValue: number;
    private unsubscribe: Subject<void>;

    ngOnInit(): void {
        this.unsubscribe = new Subject();
    }

    ngOnChanges(): void {
        const value = Number(this.countTo);
        if (isNaN(value) || value < 0) {
            return;
        }

        this.currentValue = 0;
        const stepsNum = Math.round(this.duration / this.interval);
        const increaseValue = this.countTo / stepsNum;

        interval(this.interval)
            .pipe(
                take(stepsNum),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.currentValue += increaseValue;
                this.displayValue = Math.round(this.currentValue);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
