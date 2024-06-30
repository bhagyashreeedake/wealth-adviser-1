import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvesstmentDialogComponent } from './invesstment-dialog.component';

describe('InvesstmentDialogComponent', () => {
  let component: InvesstmentDialogComponent;
  let fixture: ComponentFixture<InvesstmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvesstmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvesstmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
