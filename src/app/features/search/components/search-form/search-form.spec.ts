import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatChipInputEvent } from '@angular/material/chips';
import { signal } from '@angular/core';

import { SearchForm } from './search-form';

describe('SearchForm', () => {
  let component: SearchForm;
  let fixture: ComponentFixture<SearchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchForm],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchForm);
    component = fixture.componentInstance;
    (component as any).isLoading = signal(false);
    fixture.detectChanges();
  });

  it('should start with default type and no values', () => {
    expect(component.searchForm.get('type')?.value).toBe('aircraft');
    expect(component.values).toEqual([]);
  });

  it('should add and remove search values (normalized)', () => {
    const mockEvent = {
      value: ' n123ab ',
      chipInput: { clear: jasmine.createSpy() },
    } as unknown as MatChipInputEvent;

    component.addSearchValue(mockEvent);
    expect(component.values).toEqual(['N123AB']);

    component.removeSearchValue('N123AB');
    expect(component.values).toEqual([]);
  });

  it('should emit searchSubmitted when form has values', () => {
    spyOn(component.searchSubmitted, 'emit');
    component.values = ['N123AB'];

    component.onSubmit();

    expect(component.searchSubmitted.emit).toHaveBeenCalledWith({
      type: 'aircraft',
      values: ['N123AB'],
    });
  });
});
