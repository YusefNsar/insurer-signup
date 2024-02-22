import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {

  isUploadPopupVisible = false;
  uploadedFiles: { name: string, base64: string }[] = [];
  companyLicenseFiles: Array<any> = [];
  signatoryProfileFiles: Array<any> = [];
  otherFiles: Array<any> = [];
  table:string='';
  isChecked:boolean=false;
  checkboxState: boolean = false;
  showFileTypeAlert: boolean = false;
  myform: FormGroup;
  signatoryform:FormGroup;

  constructor(
    private builder: FormBuilder,
    private formDataService: FormDataService,
    private sharedService: SharedService,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.myform = this.builder.group({
      cname: ['', Validators.required],
      Number:['', Validators.pattern('^[0-9]*$')],
      wNumber:['', Validators.pattern('^[0-9]*$')],
      Email: ['', [Validators.email, Validators.required]],
      cbuae: ['', Validators.required],
      cbuaeExpiry: ['', Validators.required],
      commercialLicense: ['', Validators.required],
      commercialLicenseExpiry: ['', Validators.required],
      agree: [false, Validators.requiredTrue],
      website:'',
      address:'',
      representative:'',
    });

    this.signatoryform = this.builder.group({
      companyname: ['', Validators.required],
      mNumber:['', Validators.pattern('^[0-9]*$')],
      agree: [false, Validators.requiredTrue],
      address:'',
      Location:'',
      Number:'',
      representativename:'',
    });
  }

  ngOnInit(): void {
    const savedMyFormData = this.formDataService.getFormData('myform');
    const savedSignatoryFormData = this.formDataService.getFormData('signatoryform');
    if (savedMyFormData && savedSignatoryFormData) {
      this.myform.patchValue(savedMyFormData.value);
      this.signatoryform.patchValue(savedSignatoryFormData.value);
    }
    else if(savedMyFormData)
    {
      this.myform.patchValue(savedMyFormData.value);
    }
    else if(savedSignatoryFormData)
    {
      this.signatoryform.patchValue(savedSignatoryFormData.value);
    }
    this.sharedService.agreeChanged$.subscribe((state) => {
      this.checkboxState = state;
      this.signatoryform.get('agree')?.setValue(state);
      this.myform.get('agree')?.setValue(state);
      this.isChecked=state;
    });
    console.log('Form Data:', { cname: this.myform.get(['cname'])?.value });
  }
  

  saveFormData() {
    this.formDataService.setFormData('myform', this.myform);
    this.formDataService.setFormData('signatoryform', this.signatoryform); 
  }

  showUploadPopup() {
    this.isUploadPopupVisible = true;
  }

  closeUploadPopup() {
    this.isUploadPopupVisible = false;
  }

  handleFileInput(event: any) {
    event.preventDefault();
    const files: FileList = event.target.files;
    this.processFiles(files);
  }

  tablePicker(currenttable: string): void {
    this.table=currenttable;
    this.showUploadPopup();
  }


  private processFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      if (file.type === 'application/pdf') {
        // Process PDF file
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result?.toString() || '';
          this.uploadedFiles.push({ name: file.name, base64: base64String });
  
          if (this.table === 'companyLicense') {
            this.companyLicenseFiles.push({ name: file.name, base64: base64String });
          } else if (this.table === 'signatoryProfile') {
            this.signatoryProfileFiles.push({ name: file.name, base64: base64String });
          } else if (this.table === 'others') {
            this.otherFiles.push({ name: file.name, base64: base64String });
          }
        };
  
        reader.readAsDataURL(file);
      } else {
        this.showFileTypeAlert = true;
  
        this.toastr.error( 'Please add your files in PDF format','Invalid file format', {
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-center',
          timeOut: 3500,
          easeTime:350,
        });

        console.log(`${file.name} is not a PDF. Ignoring.`);
      }
    }
  }

  clearFiles(list: string) {
    if (list==='all')
    {
      this.uploadedFiles = [];
      this.signatoryProfileFiles=[];
      this.companyLicenseFiles=[];
      this.otherFiles=[];
    }
    else if(list === 'signatoryProfile')
    {
      this.removeFilesFromList(this.signatoryProfileFiles);
      this.signatoryProfileFiles=[];
    }
    else if(list=== 'companyLicense')
    {
      this.removeFilesFromList(this.companyLicenseFiles);
      this.companyLicenseFiles=[];
    }
    else if(list=== 'others')
    {
      this.removeFilesFromList(this.otherFiles);
      this.otherFiles=[];
    }
  }

  removeFilesFromList(targetList: any[]) {
    this.uploadedFiles = this.uploadedFiles.filter(
      uploadedFile => !targetList.some(targetFile => targetFile.name === uploadedFile.name)
    );
  }

  
  removeFile(file: any ) {
    const fileName:string=file.name;
    const index = this.uploadedFiles.indexOf(file);
    
    if (index !== -1) {
        this.uploadedFiles.splice(index, 1);
    }
    if (this.table==='signatoryProfile')
    {
      this.signatoryProfileFiles = this.signatoryProfileFiles.filter(file => file.name !== fileName);
    }
    else if(this.table === 'companyLicense')
    {
      this.companyLicenseFiles = this.companyLicenseFiles.filter(file => file.name !== fileName);
    }
    else if(this.table === 'others')
    {
      this.otherFiles = this.otherFiles.filter(file => file.name !== fileName);
    }
    
}
getTableArray(): any[] {
  if (this.table === 'companyLicense') {
    return this.companyLicenseFiles;
  } else if (this.table === 'signatoryProfile') {
    return this.signatoryProfileFiles;
  } else if (this.table === 'others') {
    return this.otherFiles;
  } else {
    return this.uploadedFiles;
  }
}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  changeCheck(){
    this.sharedService.setAgreeState(!this.checkboxState);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFiles(files);
    }
  }
  private mapToApiRequestBody(formData: any, signatoryFormData: any, uploadedFiles: any[]): any {
    const cbuaeExpiryValue = new Date(this.myform.get('cbuaeExpiry')?.value);
    const comercialExpiryValue = new Date(this.myform.get('commercialLicenseExpiry')?.value);



    const cbuaeUTCDate = cbuaeExpiryValue.toISOString();
    const comercialUTCDate = comercialExpiryValue.toISOString();
    
    return {
      companyName: formData.cname,
      name: signatoryFormData.representativename,
      email: formData.Email,
      phoneNumber: formData.Number,
      workNumber: formData.wNumber,
      registeredAddress: formData.address,
      companyWebsite: formData.website,
      cbuaeLicense: formData.cbuae,
      cbuaeLicenseExpiry: cbuaeUTCDate,
      commercialLicense: formData.commercialLicense,
      commercialLicenseExpiry: comercialUTCDate,
      documentsbase64: uploadedFiles,
    };
  }
  submit() {
    const formData = this.myform.value;
    const signatoryFormData = this.signatoryform.value;
    const uploadedFiles = this.uploadedFiles.map(file => file.base64.split(',')[1]);
  
    // Transform form data to match the API payload
    const apiRequestBody = this.mapToApiRequestBody(formData, signatoryFormData, uploadedFiles);
    this.apiService.submitFormData(apiRequestBody)
      .subscribe(response => {
        // Handle the API response here
        console.log('API Response:', response);
      });
  }
  
  
}
