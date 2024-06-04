import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
import {UserEntity} from "../../interfaces/user.interface";
import {UserFormFieldsEnum} from "../../enums/user-form-fields.enum";
import {UserFormGroup} from "../new-user-dialog/interfaces/user-control.interface";
import {MatInputModule} from "@angular/material/input";
import {DataRow} from "../../interfaces/data-row.interface";

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss'],
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
        NgIf,
        MatInputModule
    ]
})
export class EditUserDialogComponent implements OnInit {
    @Input() user: DataRow;

    @Output() readonly close = new EventEmitter<UserEntity>();

    protected readonly dialogWidth = DialogWidth;
    protected readonly roles = [
        {title: 'User', value: 'user'},
        {title: 'Developer', value: 'developer'},
        {title: 'Admin', value: 'admin'},
    ];
    protected readonly editUserDialogEnum = UserFormFieldsEnum;
    protected editForm: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    public ngOnInit(): void {
        const names = this.user.name.split(' ');

        this.editForm = this.fb.group({
            [this.editUserDialogEnum.FirstName]: [names[0], Validators.required],
            [this.editUserDialogEnum.LastName]: [names[1], Validators.required],
            [this.editUserDialogEnum.Email]: [this.user.email, [Validators.required, Validators.email]],
            [this.editUserDialogEnum.Role]: [this.user.role, Validators.required],
        });
    }

    protected onCancel(): void {
        this.close.emit();
    }

    protected onSend(): void {
        this.close.emit({...this.editForm.value, id: this.user.id});
    }

    protected readonly newUserDialogEnum = UserFormFieldsEnum;
}

