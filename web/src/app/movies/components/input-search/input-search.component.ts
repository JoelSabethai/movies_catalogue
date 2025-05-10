import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
})
export class InputSearchComponent implements OnDestroy {
  @Output() search = new EventEmitter<string>();

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300),          // Wait 300ms after the user stop typing
        distinctUntilChanged(),     // Emit only if the value change
        takeUntil(this.destroy$)    // Clear automatically
      )
      .subscribe(value => {
        this.search.emit(value);   // Emit to host component
      });
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.searchSubject.next(value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}