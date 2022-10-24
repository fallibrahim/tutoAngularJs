import { Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({

   selector : 'app-start-rating',

   templateUrl : './start-rating.component.html',

   styleUrls : ['./start-rating.component.css'] 
})

export class StartRatingComponent implements OnChanges {

    public startWidth : number = 0;

    @Input()

    public rating : number = 2;
    
    @Output()
    public startRatingClicked : EventEmitter<string> = new EventEmitter<string>();
    ngOnChanges () {
      this.startWidth = this.rating * 125 / 5;
    }
  
    public sendRating () : void {
       this.startRatingClicked.emit(`La note est ${this.rating}`);
    }
}