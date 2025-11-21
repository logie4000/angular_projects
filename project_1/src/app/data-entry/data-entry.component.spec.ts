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

  it('should calculate zero for empty strings', () => {
    component.testString.set('');
    component.targetString.set('ABCBABC');

    expect(component.result()).toEqual(0);

    component.testString.set('ABC');
    component.targetString.set('');

    expect(component.result()).toEqual(0);
  })

  it('should calculate the correct answer', () => {
    component.testString.set('ABC');
    component.targetString.set('ABCBABC');

    expect(component.result()).toEqual(5);

    component.testString.set('A');
    component.targetString.set('ABCBABC');

    expect(component.result()).toEqual(2);

    component.testString.set('ABC');
    component.targetString.set('CABBAB');

    expect(component.result()).toEqual(0);
  })
});
