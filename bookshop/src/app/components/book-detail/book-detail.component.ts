import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{

  getId: any;
  updateForm!: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute:ActivatedRoute,
    private crudAPi: CrudService) { 
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.crudAPi.getBook(this.getId).subscribe(res => {
          this.updateForm.setValue({
          name:res[0].name,
          price:res[0].price,
          desc:res[0].desc
        })
      });
    this.updateForm = this.formBuilder.group({
  name:[''],
  price:[''],
  desc:['']
})
}

ngOnInit(): void {
  }

  onUpdate(){
    this.crudAPi.updateBook(this.getId, this.updateForm.value).subscribe(res => {
      console.log("Done Updated Successfully");
      this.ngZone.run(()=> {this.router.navigateByUrl('/book-list')})
    }, (err: any)=>{
      console.log(err)
    }
    )}
  }

