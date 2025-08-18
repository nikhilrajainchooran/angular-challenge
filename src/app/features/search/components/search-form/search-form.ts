import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { SearchFormValue } from '../../../../core/types/search.types';
import { SEARCH_MATERIAL_MODULES } from '../../../../shared/modules/material.modules';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    ...SEARCH_MATERIAL_MODULES,
  ],
  selector: 'app-search-form',
  styleUrl: './search-form.scss',
  templateUrl: './search-form.html',
})
export class SearchForm {
  searchSubmitted = output<SearchFormValue>();
  isLoading = input<boolean>(false);

  searchForm: FormGroup;
  private formBuilder = inject(FormBuilder);

  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  values: string[] = [];

  constructor() {
    this.searchForm = this.formBuilder.group({
      type: ['aircraft', Validators.required],
      values: [[]],
    });
  }

  addSearchValue(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.values.push(value.toUpperCase());
    }
    event.chipInput?.clear();
  }

  removeSearchValue(value: string): void {
    const index = this.values.indexOf(value);
    if (index >= 0) {
      this.values.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.values.length === 0) {
      return;
    }

    this.searchForm.patchValue({ values: this.values });

    if (this.searchForm.valid) {
      const { type, values } = this.searchForm.value as SearchFormValue;
      this.searchSubmitted.emit({ type, values });
    }
  }
}
