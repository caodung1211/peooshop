import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventSourceService {
  private eventSource: EventSource;

  connect(name:string,type:string): Observable<any> {
    if(type === 'products'){
      this.eventSource = new EventSource(`${environment.BASE_URL_BE}/products/search?name=${name}`);
    }else{
      this.eventSource = new EventSource(`${environment.BASE_URL_BE}/users/search?name=${name}`);
    }

    return new Observable(observer => {
      this.eventSource.onmessage = event => {
        observer.next(JSON.parse(event.data));
      };

      this.eventSource.onerror = error => {
        observer.error(error);
      };
    });
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}