import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  files: any;
  private fileList: any = [];

  constructor() {}

  ngOnInit() {}

  FileImageUpload(event: any) {
    this.files = event.target.file;
  }

  onFilesChange(fileList: FileList) {
    this.fileList = fileList;
  }
  saveTips() {}
}
