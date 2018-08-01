import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountToComponent } from './count-to.component';

describe('CountToComponent', () => {
    let component: CountToComponent;
    let fixture: ComponentFixture<CountToComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CountToComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CountToComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
