import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Autocomplete</h1>
    <autocomplete-input (onSelect)="handleSelect($event)"></autocomplete-input>
  `,
  styles: [``]
})
export class AppComponent {
  handleSelect(selectedItem: string) {
    alert(`Selected: ${selectedItem}`);
  }
}