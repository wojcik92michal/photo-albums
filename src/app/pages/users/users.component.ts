import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';

import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SettingsService } from '@app/services/settings/settings.service';
import { UsersService } from '@app/services/users/users.service';
import { User } from '@app/models/user.model';

const pageSizeStorageIndex = 'users_table_page_size';
const defaultPageSize = 5;

@Component({
    selector: 'pg-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
    dataSource: MatTableDataSource<User>;

    pageSize: number;

    private unsubscribe: Subject<void>;

    constructor(private userService: UsersService, private settingsService: SettingsService) { }

    ngOnInit() {
        this.unsubscribe = new Subject();

        this.loadUsersData();
        this.initPageSize();
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onPageChange(event: PageEvent): void {
        const pageSize = event.pageSize;
        this.saveTablePageSize(pageSize);
    }

    private initPageSize(): void {
        const pageSize = this.loadTablePageSize();

        if (pageSize) {
            this.pageSize = pageSize;
        } else {
            this.pageSize = defaultPageSize;
        }
    }

    private saveTablePageSize(pageSize: number): void {
        localStorage.setItem(pageSizeStorageIndex, pageSize.toString());
    }

    private loadTablePageSize(): number {
        const pageSize = localStorage.getItem(pageSizeStorageIndex);

        if (!pageSize) {
            return null;
        }

        return +pageSize;
    }

    private loadUsersData(): void {
        this.settingsService.showlobalLoadingIndicator();

        this.userService.getUsers()
            .pipe(
                finalize(() => this.settingsService.hideGlobalLoadingIndicator()),
                takeUntil(this.unsubscribe)
            )
            .subscribe((users) => {
                this.dataSource = new MatTableDataSource(users);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
