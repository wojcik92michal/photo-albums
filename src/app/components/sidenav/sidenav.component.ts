import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pg-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    links: Array<{
        url: string,
        title: string
    }>;

    ngOnInit() {
        this.links = [
            { url: '/dashboard', title: 'Dashboard' },
            { url: '/albums', title: 'Albums' },
            { url: '/users', title: 'Users' },
        ];
    }
}
