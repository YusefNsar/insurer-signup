import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../../shared/layout/layout.component';


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
  loading:boolean = false;
  myform: FormGroup;
  signatoryform:FormGroup;

  constructor(
    private builder: FormBuilder,
    private formDataService: FormDataService,
    private sharedService: SharedService,
    private apiService: ApiService,
    private toastr: ToastrService,
    private el: ElementRef,
    private router: Router,
    private layoutComponent:LayoutComponent
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
      website:['',this.isValidUrl],
      address:'',
      representative:'',
      uploadedFiles:[],
    });
    this.layoutComponent.showBackgroundEffects = false;
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
    const uploadedFilesData = this.formDataService.getFileData('uploadedFiles');
    const companyLicenseFilesData = this.formDataService.getFileData('companyLicenseFiles');
    const signatoryProfileFilesData = this.formDataService.getFileData('signatoryProfileFiles');
    const otherFilesData = this.formDataService.getFileData('otherFiles');
    if (uploadedFilesData) {
      this.uploadedFiles = uploadedFilesData;
    }
    
    if (companyLicenseFilesData) {
      this.companyLicenseFiles = companyLicenseFilesData;
    }
    
    if (signatoryProfileFilesData) {
      this.signatoryProfileFiles = signatoryProfileFilesData;
    }
    
    if (otherFilesData) {
      this.otherFiles = otherFilesData;
    }
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
  }


  saveFormData() {
    this.formDataService.setFormData('myform', this.myform);
    this.formDataService.setFormData('signatoryform', this.signatoryform);
    this.formDataService.setFileData('uploadedFiles', this.uploadedFiles);
    this.formDataService.setFileData('companyLicenseFiles', this.companyLicenseFiles);
    this.formDataService.setFileData('signatoryProfileFiles', this.signatoryProfileFiles);
    this.formDataService.setFileData('otherFiles', this.otherFiles);

  }

  isValidUrl(control: any) {
    if (!control.value) return null; // if no value, don't validate
    if (/^(ftp|http|https):\/\/[^ "]+$/.test(control.value)) {
      return null; // valid URL
    } else {
      return { 'invalidUrl': true }; // invalid URL
    }
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
    const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg'];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
  
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      // Check file type
      if (allowedFileTypes.includes(file.type)) {
        // Check file size
        if (file.size <= maxFileSize) {
          const reader = new FileReader();
  
          reader.onload = () => {
            const base64String = reader.result?.toString() || '';
            console.log(base64String)
  
            // Process the file based on the table
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
          this.onFailure("File Too Large", "Please ensure your file is less than 5 MB");
          console.log(`${file.name} is too large. Ignoring.`);
        }
      } else {
        this.onFailure("Invalid File Format", "Please submit your files in PDF, Word, or JPEG format");
        console.log(`${file.name} is not a supported file format. Ignoring.`);
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
      companyPhoneNumber: formData.Number,
      companyWorkNumber: formData.wNumber,
      companyRegisteredAddress: formData.address,
      companyWebsite: formData.website,
      cbuaeLicense: formData.cbuae,
      cbuaeLicenseExpiry: cbuaeUTCDate,
      commercialLicense: formData.commercialLicense,
      commercialLicenseExpiry: comercialUTCDate,
      registeredAddress:signatoryFormData.address,
      phoneNumber:signatoryFormData.mNumber,
      workNumber:signatoryFormData.Number,
      documentsbase64: uploadedFiles,
    };
  }

  submit() {
    const formData = this.myform.value;
    const signatoryFormData = this.signatoryform.value;
    const uploadedFiles = this.uploadedFiles.map(file => file.base64.split(',')[1]);
    this.loading = true;
    // Transform form data to match the API payload
    const apiRequestBody = this.mapToApiRequestBody(formData, signatoryFormData, uploadedFiles);
    const submitButton = this.el.nativeElement.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
        }
    this.apiService.submitFormData(apiRequestBody)
    .subscribe(
      () => {
        // If you're here, it means there was a successful response with an empty body
        this.onSuccess('Success', 'Form submitted successfully!');
        this.router.navigate(['/insurer/success']);
        this.loading = false;
      },
      error => {
        if (error.status) {
          // If status is present, it's an HTTP error response
          if (error.status >= 200 && error.status < 300) {
            // Treat as success if status is in the success range
            this.onSuccess('Success', 'Form submitted successfully!');
            this.router.navigate(['/insurer/success']);
          } else {
            // Treat as failure
            this.onFailure('Error', this.getErrorMessage(error.status));
          }
        } else {
        this.onFailure('Failed to submit form.', ' User already exists.');
        }
        this.loading = false;
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    );
  }

  onSuccess(title: string, body: string) {
    this.toastr.success(body, title, {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 3500,
      easeTime: 350,
    });
  }

  onFailure(title: string, body: string) {
    this.toastr.error(body, title, {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 3500,
      easeTime: 350,
    });
  }

  getErrorMessage(status: number): string {
    switch (status) {
      case 404:
        return 'File upload failed';
      case 409:
        return 'User already exists';
      case 400:
        return 'Bad request';
      case 500:
        return 'Something went wrong';
      default:
        return 'Unknown error';
    }
  }


}
