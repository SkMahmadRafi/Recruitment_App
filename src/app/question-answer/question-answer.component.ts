import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataFileService } from '../data-file.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit,OnDestroy {

  constructor(private dfs : DataFileService , private http: HttpClient) { }

  canData : any   ;
  date : any ;
  assessmentDetails : any ;

  ngOnInit(): void {
    this.canData   = this.dfs.canInfo ;
    this.getQA();

  }

  ngOnDestroy(): void {
      this.dfs.showFiltered = true;
  }

   assessmentInfo : any ;
  
getQA () : void {
   
    let interviewid = this.canData.interviewid;
  this.http.post<any>('http://20.192.1.163:3000/allqa/allQAC' , {interviewid}
    ).subscribe(
      response => {
        this.assessmentInfo = response.result;
        this.date = response.date;
        this.assessmentDetails = response.details;
      
        
      }
    );
}


}
