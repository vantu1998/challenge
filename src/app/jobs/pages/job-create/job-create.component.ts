import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-job-create",
  templateUrl: "./job-create.component.html",
  styleUrls: ["./job-create.component.scss"],
})
export class JobCreateComponent implements OnInit {
  formData!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formData = this.fb.group({
      title: ["", Validators.required],
      logo: ["", Validators.required],
      company: ["", Validators.required],
      link: ["", Validators.required],
      date: ["", Validators.required],
      type: ["", Validators.required],
    });
  }
}
