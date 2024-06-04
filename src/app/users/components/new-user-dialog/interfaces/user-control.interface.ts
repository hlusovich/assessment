import {FormControl} from "@angular/forms";

export interface UserFormGroup {
    firstName: FormControl<string>,
    lastName: FormControl<string>,
    email: FormControl<string>,
    role: FormControl<string>,
}