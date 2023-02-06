import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  ngOnInit(): void {
    this.makeDropDownList();
  }

  response: any = false;
  popUp: any = false;
  selectedMstId: any;
  selectedMstCode: any;
  selectedMstDescr: any;
  serviceData: any;
  dropDownList: any;
  name: any;
  PopUpData: any = [];
  editingListDataDetail: any = [];
  delListDtlId: any;
  addListDataDetail: any;
  list1: any;
  deleteMst: boolean = true;
  edData1: any;
  edData2: any;
  edData3: any;
  edData4: any;
  addMstId: any;
  addMstCode: any;
  addMstDes: any;
  editMstDesc: any;
  addMstData: any;
  addMstResponse: any;
  editMstData: any;
  editMstResponse: any;
  deleteMstResponse: any;
  addListData: any;
  addListResponse: any;
  editListDetail : any ;
  editListResponse : any ;
  deleteListResponse : any ;
  bool : boolean = false;

  constructor(private http: HttpClient , private formBuilder: FormBuilder) {
  }

  addListFormGroup = this.formBuilder.group({
    LIstDtlValue: ['', Validators.required],
    ListDtlDesc: ['', Validators.required],
    Comment: ['']
  });

  addMstFormGroup = this.formBuilder.group({
    LIstCode: ['', Validators.required],
    RcrtStatus: ['', Validators.required]

  });

  editMstFormGroup = this.formBuilder.group({
    mstId: [{value :'' , disabled : true }],
    listMstCode: [{value :'' , disabled : true }],
    mstDescr: ['', Validators.required]
  });

  myFormGroup = this.formBuilder.group({
    LIstCode: ['', Validators.required],
    LIstDtlValue: ['', Validators.required],
    ListDtlDesc: ['', Validators.required],
    Comment: ['', Validators.required]
  })

  makeDropDownList(): void {
  
    this.http.get<any>(environment.fetchAllMst_api
    ).subscribe(
      response => {
        this.dropDownList = response.result;
      
      }
    );

  }

  getListDtlByMstId(ddResponse: any): void {

    this.selectedMstId = ddResponse.listmstid;
    this.selectedMstCode = ddResponse.listcode;
    this.selectedMstDescr = ddResponse.listdesc;
    console.log("mstId:", this.selectedMstId);
  this.http.get<any>(environment.getListDtlByMstId_api + this.selectedMstId
    ).subscribe(
      response => {
        this.serviceData = response.result;
        console.log(this.serviceData);
      }
    );

    this.deleteMst = false;
  }

  addMst(): void {
  
  }

  addMstInDB(): void {

    this.addMstCode = this.addMstFormGroup.controls['LIstCode'].value;
    this.addMstDes = this.addMstFormGroup.controls['RcrtStatus'].value;

    this.addMstData = { listcode: this.addMstCode, listdesc: this.addMstDes }
  
    this.http.post<any>(environment.addMst_api , this.addMstData
    ).subscribe(
      response => {
        this.addMstResponse = response;
        console.log("addMstResponse", this.addMstResponse);
      }
    );


  }

  editMst(): void {
    this.editMstFormGroup.controls.mstId.setValue(this.selectedMstId);
    this.editMstFormGroup.controls.listMstCode.setValue(this.selectedMstCode);
    this.editMstFormGroup.controls.mstDescr.setValue(this.selectedMstDescr);
  }

  editMstDB() {
    //mst id and list code in local 
    console.log("editMstDB")
    this.editMstDesc = this.editMstFormGroup.controls['mstDescr'].value;
    
    this.editMstData = { masterid:this.selectedMstId , listcode: this.selectedMstCode ,  listdesc: this.editMstDesc };
    
    this.http.put<any>(environment.editMst_api,  this.editMstData
    ).subscribe(
      response => {
        this.editMstResponse = response;
        console.log("editResponse", this.editMstResponse);
      }
    );
  }

  deleteMstDb(): void {
    // call api and send the drop down response and make the listdtll variabl to empty
    this.deleteMst = true;
     debugger;
    this.http.delete<any>( environment.deleteMst_api+ this.selectedMstId
    ).subscribe(
      response => {
        this.deleteMstResponse = response;
      }
    );

  }

  addListDtl(): void {
    //  console.log("clicked on addListDtl");
    //  this.addListDataDetail = data ;
    //  this.list1 = data.ListDtlID;

  }

  addListDB() {
    this.addListData = { listMstId: this.selectedMstId ,
      listDtlValue: this.addListFormGroup.controls['LIstDtlValue'].value ,
      listDtlDesc: this.addListFormGroup.controls['ListDtlDesc'].value,
      listDtlComment: this.addListFormGroup.controls['Comment'].value };

     this.http.post<any>(environment.addList_api , this.addListData
    ).subscribe(
      response => {
        this.addListResponse = response;
        console.log("addlistResponse", this.addListResponse);
      }
    );
  }

  editListDtl(data: any): void {
    
    this.editingListDataDetail = data.listdtlid;
    console.log("listID" , this.editingListDataDetail);
    this.myFormGroup.controls.LIstCode.setValue(this.selectedMstId);
    this.myFormGroup.controls.LIstDtlValue.setValue(data.listdtlvalue);
    this.myFormGroup.controls.ListDtlDesc.setValue(data.listdtldesc);
    this.myFormGroup.controls.Comment.setValue(data.listdtlcomment);
  }

  getDelListDtlId(SelectedListDtlId: any): void {
    this.delListDtlId = SelectedListDtlId;
  }


  editListDtlDB(): void {
    console.log("editListDtlDB");
    console.log(this.editingListDataDetail);

    this.edData1 = this.myFormGroup.controls['LIstCode'].value;
    this.edData2 = this.myFormGroup.controls['LIstDtlValue'].value;
    this.edData3 = this.myFormGroup.controls['ListDtlDesc'].value;
    this.edData4 = this.myFormGroup.controls['Comment'].value;
    
    this.editListDetail = { listDtlId : this.editingListDataDetail ,
      listDtlValue :this.edData2 ,
      listDtlDesc : this.edData3 ,
      listDtlComment : this.edData4}
debugger;
    this.http.put<any>(environment.editList_api, this.editListDetail
    ).subscribe(
      response => {
        this.editListResponse = response;
        console.log("addlistResponse", this.addListResponse);
      }
    );

  }

  deleteListDetailDB(): void {
    console.log("btn click after");
    console.log(this.delListDtlId);
    this.http.delete<any>(environment.deleteList_api + this.delListDtlId
    ).subscribe(
      response => {
        this.deleteListResponse = response;
      }
    );


  }


  getvaule(data: any) {
    // console.log(data.value.Amount)
    console.log(data.value);
  }










  resetForm(): void {

    this.PopUpData = [];
    this.editingListDataDetail = [];
    this.PopUpData.LIstDtlValue = "";

  }

}
