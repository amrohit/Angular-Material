import { UIService } from "./../shared/ui.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  excerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}
  fetchAvailableExcercises() {
    this.fbSubs.push(
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
        .subscribe(
          (exercises: Exercise[]) => {
            console.log(exercises);
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
            this.uiService.loadingStateChanged.next(false);
          },
          error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(
              "Fetching Exercise failed, please try again later",
              null,
              3000
            );
            this.excerciseChanged.next(null);
          }
        )
    );
  }

  startExcercise(selectedId: string) {
    console.log(selectedId);
    this.db
      .doc("availableExercises/" + selectedId)
      .update({ lastSelected: new Date() });
    this.runningExercise = this.availableExercises.find(
      ex => ex.id == selectedId
    );
    this.excerciseChanged.next({ ...this.runningExercise });
  }
  completeExercise() {
    console.log(this.runningExercise);
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    });
    this.runningExercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number) {
    this.addDataToDatabase({
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

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection("finishedExercises")
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
  private addDataToDatabase(exercise: Exercise) {
    this.db
      .collection("finishedExercises")
      .add(exercise)
      .then()
      .catch();
  }
}
