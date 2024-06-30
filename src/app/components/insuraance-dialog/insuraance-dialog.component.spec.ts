import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuraanceDialogComponent } from './insuraance-dialog.component';

describe('InsuraanceDialogComponent', () => {
  let component: InsuraanceDialogComponent;
  let fixture: ComponentFixture<InsuraanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuraanceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuraanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
