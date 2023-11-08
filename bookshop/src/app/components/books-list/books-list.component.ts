import { Component } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent {

  Books: any = [];
  constructor(private crudAPi: CrudService) { }

  ngOnInit(): void {
    console.log("Inside ts of display")
    this.crudAPi.getBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    })
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm("Are you sure to delete?")) {
      this.crudAPi.deleteBook(id).subscribe(res => {
        this.Books.splice(i, 1);
      })
    }
  }

}
