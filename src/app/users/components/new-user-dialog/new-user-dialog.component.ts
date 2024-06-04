import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

import {
    DialogWidth,
    FwButtonModule,
    FwDialogsModule,
    FwIconModule,
    FwSelectMenuModule,
    FwTextInputModule
} from '@flywheel-io/vision';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserFormFieldsEnum} from "../../enums/user-form-fields.enum";
import {UserFormGroup} from "./interfaces/user-control.interface";
import {UserEntity} from "../../interfaces/user.interface";

@Component({
    selector: 'app-new-user-dialog',
    templateUrl: './new-user-dialog.component.html',
    styleUrls: ['./new-user-dialog.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FwDialogsModule,
        FwIconModule,
        FwTextInputModule,
        FwSelectMenuModule,
        FwButtonModule,
        MatIconModule,
        MatButtonModule,
        NgForOf,
        ReactiveFormsModule,
        NgIf
    ]
})
export class NewUserDialogComponent implements OnInit {
    @Output() readonly close = new EventEmitter<UserEntity[]>();

    protected readonly dialogWidth = DialogWidth;
    protected readonly headerTitles = ['First Name', 'Last Name', 'Email', 'Role', ''];
    protected readonly roles = [
        {title: 'User', value: 'user'},
        {title: 'Developer', value: 'developer'},
        {title: 'Admin', value: 'admin'},
    ];
    protected readonly newUserDialogEnum = UserFormFieldsEnum;

    protected usersForm: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    public ngOnInit(): void {
        this.usersForm = this.fb.group({
            users: this.fb.array<UserFormGroup>([])
        });

        this.addUser();
    }

    get usersForms(): FormArray<FormGroup<UserFormGroup>> {
        return this.usersForm.controls['users'] as FormArray;
    }

    get userFormControls(): FormGroup<UserFormGroup>[] {
        const formArray = this.usersForm.get('users') as FormArray<FormGroup<UserFormGroup>>;
        return formArray.controls as FormGroup[];
    }

    protected onCancel(): void {
        this.close.emit();
    }

    protected onSend(): void {
        this.close.emit(this.usersForm.value.users);
    }

    protected addUser(): void {
        const userForm = this.fb.group({
            [this.newUserDialogEnum.FirstName]: ['', Validators.required],
            [this.newUserDialogEnum.LastName]: ['', Validators.required],
            [this.newUserDialogEnum.Email]: ['', [Validators.required, Validators.email]],
            [this.newUserDialogEnum.Role]: ['', Validators.required],
        });

        this.usersForms.push(userForm);
    }

    protected removeUser(index: number): void {
        this.usersForms.removeAt(index);
    }
}

