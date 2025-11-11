import { Injectable } from '@angular/core';
import { serviceCatalog, ServicePackage } from '@config';

@Injectable({
  providedIn: 'root'
})
export class ServicePackagesService {
  private readonly catalog = serviceCatalog.services ?? [];

  getAll(): ServicePackage[] {
    return this.catalog;
  }

  getFeatured(count = 3): ServicePackage[] {
    return this.catalog.slice(0, count);
  }
}
