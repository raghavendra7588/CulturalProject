import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { EmployeesService } from '../employees.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-grade-wise-state',
  templateUrl: './grade-wise-state.component.html',
  styleUrls: ['./grade-wise-state.component.css']
})
export class GradeWiseStateComponent implements OnInit {
  currentUserRole: string;
  userMasterData: any = [];


  dataSource: any;
  displayedColumns: string[] = [ 'fullName','grade' ,'place', 'approvalStatus', 'approvedBy', 'approvedAt', 'view'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService
  ) { 

    this.currentUserRole = sessionStorage.getItem('userManagement');
    this.emitterService.isUserMasterSelected.subscribe(val => {
      if (val) {
        this.currentUserRole = sessionStorage.getItem('userManagement');
        if (this.currentUserRole === 'STATE_A') {
          this.getGradeAArtistByState();
        }
        if (this.currentUserRole === 'STATE_B') {
          this.getGradeBArtistByState();
        }
        if (this.currentUserRole === 'STATE_C') {
          this.getGradeCArtistByState();
        }
      }
      else {
        return;
      }
    });


    if (this.currentUserRole === 'STATE_A') {
      this.getGradeAArtistByState();
    }
    if (this.currentUserRole === 'STATE_B') {
      this.getGradeBArtistByState();
    }
    if (this.currentUserRole === 'STATE_C') {
      this.getGradeCArtistByState();
    }
  }

  ngOnInit(): void {
  }


  getGradeAArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getGradeAArtistByState().subscribe(res => {
      this.userMasterData = res;
      uniqueData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getGradeBArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getGradeBArtistByState().subscribe(res => {
      this.userMasterData = res;
      uniqueData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getGradeCArtistByState() {
    let uniqueData: any = [];
    this.employeeService.getGradeCArtistByState().subscribe(res => {
      this.userMasterData = res;
      uniqueData = _.uniqBy(this.userMasterData, 'UserId');
      this.userMasterData = uniqueData;
      this.dataSource = new MatTableDataSource(this.userMasterData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}
