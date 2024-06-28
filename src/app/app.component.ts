import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './shared/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchForm: FormGroup;
  results: any[] = [];
  filteredResults: any[] = [];
  displayFilteredResults: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.searchForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
      filter: ['']
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const username = this.searchForm.value.username;
      this.userService.searchUsers(username).subscribe(results => {
        this.results = results.items;
      });
    } else {
      console.error('Invalid username');
    }
  }
  onFilter() {
    this.displayFilteredResults = true;
    const filterValue = this.searchForm.value.filter.toLowerCase();
    // this.filteredResults = this.results.filter(user =>
    //   Object.values(user).some(val => typeof val === 'string' && val.toLowerCase().includes(filterValue))
    // );
    this.filteredResults = this.results.filter(user =>
      ['id', 'login', 'html_url'].some(key =>
        user[key].toString().toLowerCase().includes(filterValue)
      )
    );

    console.log(this.filteredResults)
  }


}