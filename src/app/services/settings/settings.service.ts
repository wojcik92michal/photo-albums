import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    errorDescription = new BehaviorSubject<string>(null);
    globalLoadingIndicator = new BehaviorSubject<boolean>(false);

    constructor() { }

    showlobalLoadingIndicator(): void {
        this.globalLoadingIndicator.next(true);
    }

    hideGlobalLoadingIndicator(): void {
        this.globalLoadingIndicator.next(false);
    }

    setErrorDescription(errorDescription: string): void {
        this.errorDescription.next(errorDescription);
    }

    clearErrorDescription(): void {
        this.errorDescription.next(null);
    }
}
