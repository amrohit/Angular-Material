import { Injectable } from "@angular/core";
import { Excercise } from "./exercise.model";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  private availableExercises: Excercise[] = [
    { id: "crunches", name: "Crunches", duration: 30, calories: 8 },
    { id: "touch-toes", name: "Touch Toes", duration: 180, calories: 15 },
    { id: "side-lunges", name: "Side Lunges", duration: 120, calories: 18 },
    { id: "burpees", name: "Burpees", duration: 60, calories: 8 }
  ];
  private runningExercise: Excercise;
  constructor() {}
  getAvailableExcercises() {
    return this.availableExercises.slice();
  }

  startExcercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id == selectedId
    );
  }
}
