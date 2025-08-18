import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatChipInputEvent } from '@angular/material/chips';
import { SearchForm } from './search-form';
import { signal } from '@angular/core';

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

  it('should create with default values', () => {
    expect(component).toBeTruthy();
    expect(component.searchForm.get('type')?.value).toBe('aircraft');
    expect(component.values.length).toBe(0);
  });

  it('should add and remove chip values', () => {
    const mockEvent = {
      value: ' N123ab ',
      chipInput: { clear: jasmine.createSpy() },
    } as unknown as MatChipInputEvent;

    component.addSearchValue(mockEvent);
    expect(component.values).toEqual(['N123AB']);
    expect(mockEvent.chipInput.clear).toHaveBeenCalled();

    component.removeSearchValue('N123AB');
    expect(component.values).toEqual([]);
  });

  it('should emit searchSubmitted when form is valid', () => {
    spyOn(component.searchSubmitted, 'emit');
    component.values = ['N123AB'];
    component.onSubmit();
    expect(component.searchSubmitted.emit).toHaveBeenCalledWith({
      type: 'aircraft',
      values: ['N123AB'],
    });
  });

  it('should disable submit button when loading or no values, enable otherwise', () => {
    const button = () => fixture.nativeElement.querySelector('button');

    component.values = [];
    fixture.detectChanges();
    expect(button().disabled).toBeTrue();

    component.values = ['N123AB'];
    fixture.detectChanges();
    expect(button().disabled).toBeFalse();

    (component as any).isLoading.set(true);
    fixture.detectChanges();
    expect(button().disabled).toBeTrue();
  });
});
