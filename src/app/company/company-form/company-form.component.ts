import {Component, OnInit} from '@angular/core';
import {CompaniesService} from "../../services/companies.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  constructor(private companiesService: CompaniesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const companyId = params.get('id');
      if (companyId) {
        this.getCompanyDetails(companyId)
      }
    })
  }

  getCompanyDetails(companyId: string): void {
    this.companiesService.getCompanyById(companyId).subscribe((res) => {
      console.log(res)
    })
  }

}
