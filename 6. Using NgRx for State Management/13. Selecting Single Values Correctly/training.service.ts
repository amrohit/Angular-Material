import { Store } from "@ngrx/store";
import { UIService } from "./../shared/ui.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { map, take } from "rxjs/operators";
import * as UI from "../shared/ui.actions";
import * as fromTraining from "./training.reducer";
import * as Training from "./training.actions";
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

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}
  fetchAvailableExcercises() {
    this.store.dispatch(new UI.StartLoading());
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
            this.store.dispatch(new UI.StopLoading());
            // this.availableExercises = exercises;
            // this.exercisesChanged.next([...this.availableExercises]);
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
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
    /* this.db
      .doc("availableExercises/" + selectedId)
      .update({ lastSelected: new Date() });
    this.runningExercise = this.availableExercises.find(
      ex => ex.id == selectedId
    );
    */

    //this.excerciseChanged.next({ ...this.runningExercise });
    this.store.dispatch(new Training.StartTraining(selectedId)); //payload should be string
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: "completed"
        });
      });

    // this.runningExercise = null;
    // this.excerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExcercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          date: new Date(),
          state: "cancelled"
        });
      });
    // this.runningExercise = null;
    // this.excerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection("finishedExercises")
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          // this.finishedExercisesChanged.next(exercises);
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
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
