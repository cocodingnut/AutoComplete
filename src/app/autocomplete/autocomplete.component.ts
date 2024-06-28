import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'autocomplete-input',
  template: `
    <div class="wrapper">
      <div class="control" [ngClass]="{'is-loading': isLoading}">
        <input 
          type="text" 
          class="autocomplete-input" 
          [value]="selectedItem" 
          (input)="onInput($event)" />
      </div>
      <div class="list" *ngIf="items.length > 0">
        <a class="list-item" *ngFor="let item of items" (click)="selectItem(item)">{{item}}</a>
      </div>
    </div>
  `,
  styles: [`
    .wrapper {
      position: relative;
    }
    .control.is-loading::after {
      content: '...';
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    .list {
      border: 1px solid #ccc;
      max-height: 200px;
      overflow-y: auto;
    }
    .list-item {
      display: block;
      padding: 5px 10px;
      cursor: pointer;
    }
    .list-item:hover {
      background-color: #eee;
    }
  `]
})
export class AutocompleteComponent implements OnInit {
  @Output() onSelect = new EventEmitter<string>();
  private searchTerms = new Subject<string>();
  items: string[] = [];
  isLoading = false;
  selectedItem: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.search(term))
    ).subscribe(items => {
      this.isLoading = false;
      this.items = items;
    });
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const term = input.value.trim();
    this.selectedItem = term;
    if (term) {
      this.isLoading = true;
      this.searchTerms.next(term);
    } else {
      this.items = [];
    }
  }

  search(term: string) {
    return this.http.get<any[]>(`/api/complete/search?client=firefox&q=${term}`).pipe(
      map(response => response[1] || [])
    );
  }

  selectItem(item: string): void {
    this.selectedItem = item;
    this.onSelect.emit(item);
    this.items = [];
  }
}