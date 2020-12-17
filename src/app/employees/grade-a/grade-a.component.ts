import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/app/shared/emitter.service';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-grade-a',
  templateUrl: './grade-a.component.html',
  styleUrls: ['./grade-a.component.css']
})
export class GradeAComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['artistCode', 'firstName', 'lastName', 'view', 'approvalStatus'];
  gradeAData: any = [];
  districtId: number;
  userId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService
  ) {
    this.districtId = parseInt(sessionStorage.getItem('DistrictId'));
    this.userId = parseInt(sessionStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.getGradeAData(this.userId);
  }

  getGradeAData(userId) {
    this.employeeService.getGradeWiseData(userId).subscribe(res => {

      this.gradeAData = res;
      this.dataSource = new MatTableDataSource(this.gradeAData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
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
}
