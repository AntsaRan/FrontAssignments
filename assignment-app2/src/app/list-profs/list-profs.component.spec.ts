import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfsComponent } from './list-profs.component';

describe('ListProfsComponent', () => {
  let component: ListProfsComponent;
  let fixture: ComponentFixture<ListProfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProfsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
