import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CompanyInterface} from "../../interfaces/company.interface";
import {CompaniesService} from "../../services/companies.service";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies$!: Observable<CompanyInterface[]>

  constructor(private companiesService: CompaniesService) {
  }

  ngOnInit(): void {
    this.companies$ = this.companiesService.getCompanies();
  }

  addCompany(): void {
    this.companiesService.addCompany({email: 'ccc', name: 'ccc', isActive: true});
  }

  deleteCompany(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.companiesService.deleteCompany(id);
  }

}
