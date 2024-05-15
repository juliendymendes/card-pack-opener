import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsSearchResultsComponent } from './sets-search-results.component';

describe('SetsSearchResultsComponent', () => {
  let component: SetsSearchResultsComponent;
  let fixture: ComponentFixture<SetsSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetsSearchResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetsSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
