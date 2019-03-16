import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "./training.service";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"]
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.excerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
