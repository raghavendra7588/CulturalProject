import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/app/shared/emitter.service';
import { BasicuserService } from 'src/app/user/basicuser.service';
import { DialogViewProposalFormComponent } from '../dialog-view-proposal-form/dialog-view-proposal-form.component';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-approvals-on-hold',
  templateUrl: './approvals-on-hold.component.html',
  styleUrls: ['./approvals-on-hold.component.css']
})
export class ApprovalsOnHoldComponent implements OnInit {

  displayedColumns: string[] = ['artistCode', 'firstName', 'lastName', 'view', 'approvalStatus'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  onHoldData: any = [];
  userId: number;
  role: string;

  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeesService,
    public emitterService: EmitterService,
    public basicuserService: BasicuserService,
    public toastr: ToastrService,
    private router: Router
  ) {
    this.userId = Number(sessionStorage.getItem('userId'));
    if ("role" in sessionStorage) {
      this.role = sessionStorage.getItem('role');
    }



  }

  ngOnInit(): void {
    if (this.role === 'DISTRICT') {
      this.getOnHoldMemebersAtDistrict(this.userId);
    }
    if (this.role === 'GRAMPANCHAYAT') {
      this.getOnHoldMemebersByPanchayat(this.userId);

    }
    if (this.role === 'STATE') {

    }

  }


  getOnHoldMemebersByPanchayat(userId) {
    this.employeeService.getListOfOnHolMembersByPanchyat(userId).subscribe(res => {
   
      this.onHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.onHoldData, 'id');
      this.onHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.onHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  getOnHoldMemebersAtDistrict(userId) {
    this.employeeService.getListOfOnHolMembersAtPanchayatData(userId).subscribe(res => {

      this.onHoldData = res;
      let uniquePersonalDetailsData = _.uniqBy(this.onHoldData, 'id');
      this.onHoldData = uniquePersonalDetailsData;
      this.dataSource = new MatTableDataSource(this.onHoldData);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  viewEmployee(res) {
    this.dialog.open(DialogViewProposalFormComponent, {
      height: '600px',
      width: '1200px',
      data: res,
      disableClose: true
    });
  }

}
