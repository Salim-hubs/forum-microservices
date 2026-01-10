import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlinePage } from './online.page';

describe('OnlinePage', () => {
  let component: OnlinePage;
  let fixture: ComponentFixture<OnlinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
