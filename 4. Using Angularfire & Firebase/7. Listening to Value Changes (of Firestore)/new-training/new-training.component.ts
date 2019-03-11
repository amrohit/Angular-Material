import { Excercise } from "./../exercise.model";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { TrainingService } from "./../training.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit {
  @Output()
  // trainingStart = new EventEmitter<void>();
  exercises: Observable<any>;
  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    //this.exercises = this.trainingService.getAvailableExcercises();
    this.exercises = this.db.collection("availableExercises").valueChanges();
  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    console.log(form.value);
    this.trainingService.startExcercise(form.value.exercise);
  }
}
