import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NoteService } from 'src/app/core/services/note.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _MatDialog: MatDialog,
    private _NoteService: NoteService,
    private _AuthService: AuthService) { }

  notes: any[] = [];
  value = '';

  ngOnInit(): void { this.getNote() }

  addNote(): void {
    const matDialogRef = this._MatDialog.open(NoteDataComponent);
    matDialogRef.afterClosed().subscribe({
      next: responce => {
        if (responce === 'add') {
          this.getNote()
        }
      }
    })
  }

  setData(note: any): void {
    const matDialogRef = this._MatDialog.open(NoteDataComponent, {
      data: { note }
    });

    matDialogRef.afterClosed().subscribe({
      next:responce=>{
        if(responce === "updated"){
          this.getNote();
        }
      }
    })
  }

  getNote(): void {
    const model = {
      token: localStorage.getItem('_notetokem'),
      userID: this._AuthService.user.getValue()._id
    }
    console.log(model);


    this._NoteService.getNote(model).subscribe({
      next: response => {
        if (response.message === 'success') {
          this.notes = response.Notes
        }
        console.log(response);

      }
    })
  }
  deleteNote(id: string, index: number): void {
    const model = {
      NoteID: id,
      token: localStorage.getItem('_notetokem'),
    }
    this._NoteService.deleteNote(model).subscribe({
      next: responce => {
        if (responce.message === "deleted") {
          this.notes.splice(index, 1);
          this.notes = [...this.notes]

        }

      }
    })


  }

  logOut():void{
    this._AuthService.logOut();
  }

}
