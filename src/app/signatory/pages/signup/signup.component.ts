import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isUploadPopupVisible = false;
  uploadedFiles: { name: string, base64: string }[] = [];

  myform: FormGroup;
  signatoryform:FormGroup;

  constructor(private builder: FormBuilder, private formDataService: FormDataService) {
    this.myform = this.builder.group({
      cname: ['', Validators.required],
      Number:['', Validators.pattern('^[0-9]*$')],
      wNumber:['', Validators.pattern('^[0-9]*$')],
      Email: ['', [Validators.email, Validators.required]],
      cbuae: ['', Validators.required],
      commercialLicense: ['', Validators.required],
    });
    
    this.signatoryform = this.builder.group({
      companyname: ['', Validators.required],
      mNumber:['', Validators.pattern('^[0-9]*$')],
    });
  }

  ngOnInit(): void {
    const savedFormData = this.formDataService.getFormData();
    if (savedFormData) {
      this.myform.patchValue(savedFormData.value);
      this.signatoryform.patchValue(savedFormData.value);
    }
  }

  saveFormData() {
    this.formDataService.setFormData(this.myform);
    this.formDataService.setFormData(this.signatoryform);
    console.log('Form Data:', { cname: this.myform.get(['cname'])?.value });
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
    console.log("dropped");
  }


  private processFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString() || '';
        this.uploadedFiles.push({ name: file.name, base64: base64String });
      };
      reader.readAsDataURL(file);
    }
  }

  clearFiles() {
    this.uploadedFiles = [];
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Add visual indication that the area can accept the drop (e.g., change background color)
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Remove visual indication when leaving the drop area
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      // Handle dropped files, you can initiate the upload here
      this.processFiles(files);
    }
    // Remove visual indication after the drop
  }
}
