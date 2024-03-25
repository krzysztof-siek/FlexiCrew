import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CompanyInterface} from "../interfaces/company.interface";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private firestore: AngularFirestore) {
  }

  getCompanies(): Observable<CompanyInterface[]> {
    return this.firestore.collection('companies').valueChanges().pipe(
      map((data: unknown[]) => data as CompanyInterface[])
    );
  }

  getCompanyById(companyId: string): Observable<CompanyInterface> {
    return this.firestore.collection('companies').doc(companyId).valueChanges() as Observable<CompanyInterface>;
  }


  addCompany(company: CompanyInterface): Promise<void> {
    const companyId = this.firestore.createId();
    company.id = companyId;
    return this.firestore.collection('companies').doc(companyId).set(company);
  }

  deleteCompany(companyId: string): Promise<void> {
    return this.firestore.collection('companies').doc(companyId).delete();
  }

}
