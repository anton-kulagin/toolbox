import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class LinkGeneratorService {
  API_URL = environment.apiUrl;
  constructor() { }
  getReportImageURL(path: string): string {
    return path ? this.API_URL + path.slice(2).replace(/\\/g, '/') : this.API_URL + 'images/no-image.jpg';
  }
}
