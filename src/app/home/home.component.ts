import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  records: any = [];
  isEdit = false;
  user: any;
  recordForm: FormGroup = new FormGroup({
    createdBy: new FormControl("Blessing Mwale"),
    description: new FormControl(""),
    province: new FormControl(""),
    random: new FormControl(""),
    status: new FormControl("lost"),
    updatedBy: new FormControl("Blessing Mwale"),
    id: new FormControl()
  });
  loading = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getRecords()
    this.user = this.authService.getUser();
  }

  save() {
    this.loading = true
    this.authService.getRandomNumber().subscribe((number: any) => {
      this.recordForm.patchValue({
        random: number[0]
      })
      this.authService.saveRecord(this.recordForm.value).subscribe(response => {
        console.log(response);
        document.getElementById('closeBtn')?.click();
        // this.router.navigateByUrl('/login')
        this.getRecords();
      }, error => {
        console.log(error);
        this.loading = false
      })
    })
  }

  getRecords() {
    this.authService.getRecords().subscribe(response => {
      this.records = response;
      this.loading = false
    }, error => {
      console.log(error);
      this.loading = false

    })
  }

  updateRecord(record: any) {
    this.isEdit = true
    this.recordForm.patchValue({
      createdBy: record.createdBy,
      description: record.description,
      province: record.province,
      random: record.random,
      status: record.status,
      updatedBy: record.createdBy,
      id: record.id
    })
  }

  submitUpdate() {

    this.authService.updateRecord(this.recordForm.value).subscribe(response => {
      console.log(response);
      document.getElementById('closeBtn')?.click();
      // this.router.navigateByUrl('/login')
      this.isEdit = false

      this.getRecords();
    }, error => {
      console.log(error);
      this.loading = false
    })
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

  deleteRecord(id: any) {
    if (confirm("Are you sure you wnt to delete this record?")) {
      this.authService.deleteRecord(id).subscribe(response => {
        console.log(response);
        this.getRecords();
      }, error => {
        console.log(error);
        this.loading = false
      })
    }

  }


}
