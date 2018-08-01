import { Component, Input } from '@angular/core';

import { SettingsService } from '@app/services/settings/settings.service';

@Component({
    selector: 'pg-error-bar',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
    @Input() error: string;

    constructor(
        private settingsService: SettingsService
    ) {}

    hideError(): void {
        this.settingsService.clearErrorDescription();
    }
}
