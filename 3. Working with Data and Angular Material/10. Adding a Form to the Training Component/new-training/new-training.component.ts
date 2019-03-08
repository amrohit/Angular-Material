import { Excercise } from "./../exercise.model";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { TrainingService } from "./../training.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  @Output()
  // trainingStart = new EventEmitter<void>();
  exercises: Excercise[] = [];
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExcercises();
  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    console.log(form.value.exercise);
    this.trainingService.startExcercise(form.value.exercise);
  }
}
