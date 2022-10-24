import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce,debounceTime, EMPTY, fromEvent, merge, Observable, timer } from 'rxjs';



import { Ihotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';
import { GlobalGenericValidator } from '../shared/services/validators/global-generic.validators';
import { NumberValidators } from '../shared/services/validators/numbers.validators';

@Component({
  selector: 'app-hotel-editer',
  templateUrl: './hotel-editer.component.html',
  styleUrls: ['./hotel-editer.component.css']
})
export class HotelEditerComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read : ElementRef}) inputElements! : ElementRef[];
  public pageTitle !: string;
  public hotelForms !: FormGroup;
  public hotel!: Ihotel;
  public errorMessage!: string;
  public formErrors: { [ key : string ]: string } = {};
  private validationMessage: { [ key: string ]: { [key:string]: string } } = {
   nomHotels : {
    required: 'le nom de l\'hotel est obligatoire.',
    minlength: 'le nom de l\'hotel doit comporter au moins 4 caractères.'
   },
   prix : {
    required : 'le prix de l\'hotel est obligatoire.',
     pattern: 'le prix de l\'hotel doit etre un nombre.'
   },
   rating : {
    range: 'la note doit etre comprise entre 1 et 5.'
   }
  };
  private globalGenericValidator !: GlobalGenericValidator;
  private isFormSubmitted !: boolean;
  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private hotelService :  HotelListService,

    ) { }
 

  ngOnInit(): void {
    this.globalGenericValidator = new GlobalGenericValidator(this.validationMessage);
    this.hotelForms = new FormGroup({
      nomHotels: new FormControl('', 
      [Validators.required, Validators.minLength(4)]),
      prix: new FormControl('', 
      [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      rating: new FormControl('', NumberValidators.range(1, 5)),
      description: new FormControl(''),  
      tags: new FormArray([])
    })
    this.route.paramMap.subscribe(params =>{
      const id = +params.get('id')!;
      this.getSelectedHotel(id)
      
    });
  }
  ngAfterViewInit() {
    const formControlBlurs : Observable<unknown>[] = this.inputElements
    .map((formControlElemRef :ElementRef) => fromEvent(formControlElemRef.nativeElement,
    'blur'));
    merge(this.hotelForms.valueChanges, ...formControlBlurs)
    .pipe(
      debounceTime(800)
      // debounce(() => this.isFormSubmitted ? EMPTY : timer(800))
    )
   .subscribe(() => {
    this.formErrors = this.globalGenericValidator.createErrorMessage(this.hotelForms, this.isFormSubmitted);
    console.log('errors : ', this.formErrors)
  });
}
  public hideError() : void {
    this.errorMessage = null!;
  }
    public get tags(): FormArray {
      return this.hotelForms.get('tags') as FormArray;
    }
    public addTags(): void {
      this.tags.push(new FormControl());
    }
    public deleteTags(index:number): void {
      this.tags.removeAt(index)
      this.tags.markAsDirty()
    }
    public getSelectedHotel(id: number): void {
      this.hotelService.getHotelById(id).subscribe((hotel) => {
          this.displayHotel(hotel);
      });
    }
     public displayHotel(hotel: Ihotel | null | undefined): void {
        this.hotel = hotel!;
        if(this.hotel.id == 0) {
          this.pageTitle = "Créer un hotel";
        }
        else{
          this.pageTitle = `Modifier l\'hotel ${this.hotel.nomHotels}`;
        } 
        
         this.hotelForms.patchValue({
         nomHotels: this.hotel.nomHotels,
         prix: this.hotel.prix,
         rating: this.hotel.rating,
         description: this.hotel.description,
          
      });
       this.hotelForms.setControl("tags", new FormArray(this.hotel.tags || <any>[]));       
     }
   public saveHotel(): void {
    this.isFormSubmitted = true;
    this.hotelForms.updateValueAndValidity({
      onlySelf:true,

      emitEvent:true
    })
    if (this.hotelForms.valid) {
      if (this.hotelForms.dirty) {
         const hotel : Ihotel = {
            ...this.hotel,
            ...this.hotelForms.value
         };

         if (hotel.id == 0) {
            this.hotelService.createHotel(hotel).subscribe({
              next : () => this.saveCompleted(),
              error : (err)  => this.errorMessage = err
            }) 
         } else {
            this.hotelService.updateHotel(hotel).subscribe({
              next : () => this.saveCompleted(),
              error : (err)  => this.errorMessage = err
            });
         }
      }
    }
    else {
      this.errorMessage = 'Corrigez les erreurs svp.'
    }
    console.log(this.hotelForms.value)
   }
   public saveCompleted() : void {
    this.hotelForms.reset();
    this.router.navigate(['/hotels']);
   }
   public deleteHotel() {
    if (confirm(`Voulez-vous vraiment supprimer ${this.hotel.nomHotels} ?`)) {
      this.hotelService.deleteHotel(this.hotel.id).subscribe({
        next : ()  => this.saveCompleted()
      })
    }
   }
}