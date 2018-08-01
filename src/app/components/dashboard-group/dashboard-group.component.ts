import { Component, Input } from '@angular/core';

@Component({
    selector: 'pg-dashboard-group',
    templateUrl: './dashboard-group.component.html',
    styleUrls: ['./dashboard-group.component.scss']
})
export class DashboardGroupComponent {

    @Input() groupTitle: string;
    @Input() groupValue: number;
}
