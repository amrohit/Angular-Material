import { AngularFirestore } from "@angular/fire/firestore";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  excerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  exercisesChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore) {}
  fetchAvailableExcercises() {
    this.db
      .collection("availableExercises")
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExcercise(selectedId: string) {
    console.log(selectedId);
    this.runningExercise = this.availableExercises.find(
      ex => ex.id == selectedId
    );
    this.excerciseChanged.next({ ...this.runningExercise });
  }
  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    });
    this.runningExercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled"
    });
    this.runningExercise = null;
    this.excerciseChanged.next(null);
  }

  getRunningExercise() {
    return {
      ...this.runningExercise
    };
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
