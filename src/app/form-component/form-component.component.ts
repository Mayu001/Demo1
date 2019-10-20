import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadServiceService } from '../upload-service.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {

  uploadForm: FormGroup;
  urls = [];

  constructor(private formBuilder: FormBuilder, private uploadService: UploadServiceService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      url: ["", Validators.required],
      urls: ["", Validators.required]
    });
  }

 
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);

                   this.urls.push(event.target.result); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
 
  submitData() {
    console.log("submitted");
    this.uploadService.submitData(this.uploadForm.value.url, this.urls);
  }

}
