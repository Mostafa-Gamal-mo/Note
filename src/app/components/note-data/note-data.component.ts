import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note.service';
import jwtDecode from 'jwt-decode';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.scss']
})
export class NoteDataComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder,
    private _NoteService: NoteService,
    private _ToastrService: ToastrService,
    private _MatDialogRef: MatDialogRef<NoteDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  dataForm!: FormGroup;
  userData: any;
  hide = true;


  ngOnInit(): void {
    this.createForm();
    this.userData = jwtDecode(localStorage.getItem('_notetokem')!);
    console.log(this.data);
    
  }

  createForm(): void {
    this.dataForm = this._FormBuilder.group({
      title: [this.data? this.data.note.title : '', [Validators.required]],
      desc: [this.data? this.data.note.desc : '', [Validators.required]],
      token: localStorage.getItem('_notetokem'),
    })
  }

  sendData(): void {
    if (this.dataForm.valid) {
      console.log(this.dataForm.value);
      if(this.data === null){
        this.addNote();
      }else{
        this.updateNote()
      }

    }

  }

  addNote(): void {
    const data = {
      ...this.dataForm.value,
      citizenID: this.userData._id
    }
    console.log(data);

    this._NoteService.addNote(data).subscribe({
      next: response => {
        if (response.message === 'success') {
          this._MatDialogRef.close('add');
          // this._ToastrService.success(response.message)
        }
        // console.log(response);

      }
    })
  }


updateNote(): void {
  const model = {
    ...this.dataForm.value,
    NoteID:this.data.note._id,
    token:localStorage.getItem('_notetokem')
  }
    this._NoteService.updateNote(model).subscribe({
      next:responce =>{
        if(responce.message === "updated"){
          this._MatDialogRef.close("updated")
        }
        
      }
    })
  }









}
