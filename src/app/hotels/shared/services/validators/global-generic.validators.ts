import { FormGroup } from "@angular/forms";

export class GlobalGenericValidator {
    constructor(
        private validationMessage: {[key:string]: {[key:string]:string}}
    ) {}
    public createErrorMessage(container: FormGroup, isFormSubmitted?: boolean):{ [key:string]: string } {

        const errorMessage : any = {};
        for ( const controlName in container.controls) {
            if (container.controls.hasOwnProperty(controlName)) {
               const selectedControl = container.controls[controlName]
               if (this.validationMessage[controlName]) {

                errorMessage[controlName] = '';

                if ((selectedControl.dirty || selectedControl.touched || isFormSubmitted) && selectedControl.errors) {
                    Object.keys(selectedControl.errors).map((errorMessageKey: string) => {
                        if (this.validationMessage[controlName][errorMessageKey]) {
                            errorMessage[controlName] += this.validationMessage[controlName][errorMessageKey]
                        }
                    })
                }
               }
            }
        }
        return errorMessage;
    }
}