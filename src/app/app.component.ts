import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SettingsService } from '@app/services/settings/settings.service';

@Component({
    selector: 'pg-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    error: string;

    private unsubscribe: Subject<void>;

    showGlobalLoadingIndicator: Observable<boolean>;

    constructor(private settingsService: SettingsService) { }

    ngOnInit(): void {
        this.unsubscribe = new Subject();

        this.showGlobalLoadingIndicator = this.settingsService.globalLoadingIndicator;

        this.settingsService.errorDescription
            .pipe(
                takeUntil(this.unsubscribe)
            )
            .subscribe((err) => {
                this.error = err;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
