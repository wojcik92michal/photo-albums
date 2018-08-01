import { Injectable, ErrorHandler, Injector } from '@angular/core';

import { SettingsService } from '@app/services/settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: any) {
        const settingsService = this.injector.get(SettingsService);

        let errorMessage = 'Oops, something went wrong!';

        if (error.status && error.message) {
            errorMessage = `${error.status}: ${error.message}`;
        }

        settingsService.setErrorDescription(errorMessage);
        console.error(error);
    }
}
