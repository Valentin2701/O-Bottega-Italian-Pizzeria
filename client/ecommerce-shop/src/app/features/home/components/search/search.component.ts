import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';

  @Output() dataEmitter = new EventEmitter<string>();

  search() {
    this.dataEmitter.emit(this.query);
  }
}
