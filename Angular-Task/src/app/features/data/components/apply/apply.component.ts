import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray, } from '@angular/forms';
// import { getDate } from 'date-fns';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
// import { ProjectsService } from '../projects.service';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/features/services/service.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  projectForm: any = FormGroup;
  submitted = false;

  getPname: any;
  reqBody: any;

  addressForm: any = FormGroup;
  repositoryForm: any = FormGroup;

  // stateInfo: any = [];
  // countryInfo: any = [];
  // cityInfo: any = [];

  stateInfo: any;
  countryInfo: any;
  Vcountry: any;
  // Countryselected: any;
  Countryselected: any = 'India';
  cityInfo: any;
  Vstate: any;
  Vcity: any;
  timesheetDltByid: any;
  country_id: any
  state_id: any
  cities: any;
  states: any;
  countries: any;



  constructor(private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService, private ServiceService: ServiceService,
    private router: Router) { }


  ngOnInit(): void {
    this.allCountries()

    this.projectForm = this.formBuilder.group({

      GSTNo: [''],
      PANNo: [''],
      Code: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Address: [''],
      // project_owner_email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Pincode: [''],
      Country: [''],
      State: [''],
      City: [''],
      MobileNo: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      Email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Latitude: [''],
      Longitude: [''],
      Currency: [''],
      // cliente_email_id: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],


    });





    //....................repository
    this.repositoryForm = new FormGroup({
      repository: new FormArray([
        new FormGroup({
          Name: new FormControl('', [Validators.required]),
          MobileNo: new FormControl('', [Validators.required]),
          Email1: new FormControl(''),
          Department: new FormControl('', [Validators.required]),
          Designation: new FormControl('', [Validators.required]),
          Code: new FormControl(this.getPname),

        }),
      ]),
    });



  }

  
  get f() { return this.projectForm.controls; }

  allCountries() {
    this.ngxService.start();
    this.ServiceService.getallCountries().subscribe((pdata: any) => {
      console.log(pdata);
      console.log(pdata.data);
      this.countries = pdata.data
      this.ngxService.stop();
    });
  }


  changeCountry(e: any) {
    let state = e
    this.country_id = e.target.value
    console.log("state", e.target.value);
    this.ngxService.start();
    this.ServiceService.getallStates(this.country_id).subscribe((pdata: any) => {
      console.log(pdata);
      console.log(pdata.data);
      this.states = pdata.data
      this.ngxService.stop();
    });

  }

  changeStates(e: any) {
    let state = e
    this.state_id = e.target.value
    console.log("state", e.target.value);
    this.ngxService.start();
    this.ServiceService.getallCities(this.state_id).subscribe((pdata: any) => {
      console.log(pdata);
      console.log(pdata.data);
      this.cities = pdata.data
      this.ngxService.stop();
    });

  }




  getprojectname(e: any) {
    console.log("e.target.value", e.target.value);


    this.getPname = e.target.value


    this.repository.patchValue([{ Code: this.getPname }])


  }



  // ...............................repository

  get repository(): FormArray {
    return this.repositoryForm.get('repository') as FormArray;
  }


  get address(): FormArray {
    return this.addressForm.get('address') as FormArray;
  }

  addrepository() {

    this.repository.push(
      new FormGroup({
        Name: new FormControl(''),
        MobileNo: new FormControl(''),
        Email1: new FormControl(''),
        Department: new FormControl(''),
        Designation: new FormControl(''),
        Code: new FormControl(this.getPname),

      })
    );



    // console.log(this.getPname);

    console.log("val..........", this.repository.value);

  }
  removerepository(i: number) {
    this.repository.removeAt(i);
  }



  submitData() {
    this.submitted = true;


    if (this.projectForm.invalid) {
       return alert('Invalid Details');
    }
   

    if (this.projectForm.valid) {
      console.log('form submitted');
    } 


      if (this.submitted) {
        const {valid } =
          this.projectForm;

        if (valid) {
          this.reqBody = {
            ...this.projectForm.value,
            ...this.repositoryForm.value,

          };

        


          this.ServiceService.createprojects(this.reqBody).subscribe(async (result) => {
            // this.ngxService.stop();
            if (result) {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                
                this.router.navigateByUrl('view');
              });
              // this.router.navigateByUrl('view');
              // this.reqBody.reset({});  console.log(this.reqBody);
              alert("Project successfully Added");
              console.log(this.reqBody);
            } else {
              console.log(result);

            }


          });
        }

        else {

          return this.projectForm.reset({});
        }

      }
    
  }

 
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  ValidateAlpha(event: any) {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;
    return true;
  }

}
