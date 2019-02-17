import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() isLoading = false;

  constructor(public sharedService: SharedService) {
    console.log('loader component ::', this.sharedService.showLoader);
  }

  ngOnInit() {
  
  }
}
