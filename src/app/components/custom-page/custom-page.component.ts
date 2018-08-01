import { Component, Input } from '@angular/core';

@Component({
    selector: 'pg-page',
    templateUrl: './custom-page.component.html',
    styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent {

    @Input() pageTitle: string;
    @Input() backUrl?: string;
}
