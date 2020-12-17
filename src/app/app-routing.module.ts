import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserMasterComponent } from './employees/add-user-master/add-user-master.component';
import { ApprovalsOnHoldComponent } from './employees/approvals-on-hold/approvals-on-hold.component';
import { ApprovedListPanchayatComponent } from './employees/approved-list-panchayat/approved-list-panchayat.component';
import { ApprovedListComponent } from './employees/approved-list/approved-list.component';
import { DistrictRoleManagementComponent } from './employees/district-role-management/district-role-management.component';
import { EditAndHoldDistrictComponent } from './employees/edit-and-hold-district/edit-and-hold-district.component';
import { ExistingMemberAlterationComponent } from './employees/existing-member-alteration/existing-member-alteration.component';
import { GradeAComponent } from './employees/grade-a/grade-a.component';
import { GradeBComponent } from './employees/grade-b/grade-b.component';
import { GradeCComponent } from './employees/grade-c/grade-c.component';
import { ListOfRejectedMembersComponent } from './employees/list-of-rejected-members/list-of-rejected-members.component';
import { ListOnHoldComponent } from './employees/list-on-hold/list-on-hold.component';
import { NewApprovalsComponent } from './employees/new-approvals/new-approvals.component';
import { PanchayatRoleManagementComponent } from './employees/panchayat-role-management/panchayat-role-management.component';
import { PersonalDetailsComponent } from './employees/personal-details/personal-details.component';
import { ReqToPutOnHoldComponent } from './employees/req-to-put-on-hold/req-to-put-on-hold.component';
import { ReqToRemoveFromHoldComponent } from './employees/req-to-remove-from-hold/req-to-remove-from-hold.component';
import { StateRoleManagementComponent } from './employees/state-role-management/state-role-management.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'details/personalDetails', component: PersonalDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add/user', component: AddUserMasterComponent },
  { path: 'district/newApprovals', component: NewApprovalsComponent },
  { path: 'district/approvedList', component: ApprovedListComponent },
  { path: 'panchayat/gradeA', component: GradeAComponent },
  { path: 'panchayat/gradeB', component: GradeBComponent },
  { path: 'panchayat/gradeC', component: GradeCComponent },
  { path: 'panchayat/approvedList', component: ApprovedListPanchayatComponent },
  { path: 'panchayat/existingMemberAlteration', component: ExistingMemberAlterationComponent },
  { path: 'listOfRejectedMembers', component: ListOfRejectedMembersComponent },
  { path: 'approvalsOnHold', component: ApprovalsOnHoldComponent },
  { path: 'editOrHoldDistrict', component: EditAndHoldDistrictComponent },
  { path: 'requestToPutOnHold', component: ReqToPutOnHoldComponent },
  { path: 'onHold', component: ListOnHoldComponent },
  { path: 'requestToRemoveFromHold', component: ReqToRemoveFromHoldComponent },
  { path: 'role/State', component: StateRoleManagementComponent },
  { path: 'role/District', component: DistrictRoleManagementComponent },
  { path: 'role/Panchayat', component: PanchayatRoleManagementComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
