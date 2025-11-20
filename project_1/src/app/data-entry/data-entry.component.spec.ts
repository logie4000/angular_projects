import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryComponent } from './data-entry.component';

describe('DataEntryComponent', () => {
  let component: DataEntryComponent;
  let fixture: ComponentFixture<DataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the correct answer', () => {
    component.testString.set('ABC');
    component.targetString.set('ABCBABC');

    var root = component.buildTree();
    var result = component.calculateResult(root);

    expect(result).toEqual(5);
  })
});
