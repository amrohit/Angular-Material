import { UIService } from "./../../shared/ui.service";
import { Exercise } from "./../exercise.model";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { TrainingService } from "./../training.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output()
  // trainingStart = new EventEmitter<void>();
  exercises: Exercise[];
  isLoading = true;
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;
  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => (this.isLoading = isLoading)
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
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
  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
