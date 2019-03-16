import { Store, select } from "@ngrx/store";
import { UIService } from "./../../shared/ui.service";
import { Exercise } from "./../exercise.model";
import { Component, OnInit } from "@angular/core";
import { TrainingService } from "./../training.service";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import * as fromRoot from "../../app.reducer";
import * as fromTraining from "../training.reducer";
@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  private exerciseSubscription: Subscription;
  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    this.exercises$ = this.store.pipe(
      select(fromTraining.getAvailableExercises)
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExcercises();
  }
  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    console.log(form.value);
    this.trainingService.startExcercise(form.value.exercise);
  }
}
