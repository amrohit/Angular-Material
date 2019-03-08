import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Excercise } from "./exercise.model";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  excerciseChanged = new Subject<Excercise>();
  private availableExercises: Excercise[] = [
    { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
    { id: "touch-toes", name: "Touch Toes", duration: 180, calories: 15 },
    { id: "side-lunges", name: "Side Lunges", duration: 120, calories: 18 },
    { id: "burpees", name: "Burpees", duration: 60, calories: 8 }
  ];
  private runningExercise: Excercise;
  private exercises: Excercise[] = [];

  constructor() {}
  getAvailableExcercises() {
    return this.availableExercises.slice();
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
