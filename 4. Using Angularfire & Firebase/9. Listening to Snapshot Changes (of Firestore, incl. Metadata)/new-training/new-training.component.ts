import { Excercise } from "./../exercise.model";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { TrainingService } from "./../training.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  @Output()
  // trainingStart = new EventEmitter<void>();
  exercises: Observable<Excercise[]>;
  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    //this.exercises = this.trainingService.getAvailableExcercises();
    this.exercises = this.db
      .collection("availableExercises")
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              // ...doc.payload.doc.data()
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
        })
      );
    /*  .subscribe(result => {
        // for (const res of result) {
        //   console.log(res.payload.doc.data());
        // }
        console.log(result);
      });
      */
  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    console.log(form.value);
    this.trainingService.startExcercise(form.value.exercise);
  }
}
