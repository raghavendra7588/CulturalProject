import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { DialogPersonalDetailComponent } from '../dialog-personal-detail/dialog-personal-detail.component';


@Component({
  selector: 'app-existing-member-alteration',
  templateUrl: './existing-member-alteration.component.html',
  styleUrls: ['./existing-member-alteration.component.css']
})
export class ExistingMemberAlterationComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['artistCode', 'firstName', 'lastName', 'approvalStatus', 'view', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  personalDetailsData: any = [];

  preferredLanguage: string = 'true';
  role: string;

  isDistrict: boolean;
  userId: number;
  userObj: any;

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService
  ) {

    this.userId = Number(sessionStorage.getItem('userId'));

    this.emitterService.isPersonalDataCreated.subscribe(value => {
      if (value) {
        console.log('personal data created');
        this.getExistingMemberAlterationData(this.userId);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngOnInit(): void {
    this.getExistingMemberAlterationData(this.userId);
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  getExistingMemberAlterationData(userId) {
    this.employeeService.existingMemberAltertion(userId).subscribe(res => {
      this.personalDetailsData = res;
      let uniqueData = _.uniqBy(this.personalDetailsData, 'id');
      this.personalDetailsData = uniqueData;
      this.dataSource = new MatTableDataSource(this.personalDetailsData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  viewEmployee(response) {

    let res: any = [];
    res = response;
    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: res,
      disableClose: false
    });
  }

  editUser(res: any) {
    this.userObj = res;
    this.dialog.open(DialogPersonalDetailComponent, {
      height: '700px',
      width: '1200px',
      data: res,
      disableClose: false
    });

  }
}
