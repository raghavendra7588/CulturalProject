import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserMasterComponent } from './employees/add-user-master/add-user-master.component';
import { ApprovalsOnHoldComponent } from './employees/approvals-on-hold/approvals-on-hold.component';
import { ApprovedListPanchayatComponent } from './employees/approved-list-panchayat/approved-list-panchayat.component';
import { ApprovedListComponent } from './employees/approved-list/approved-list.component';
import { CategoryWiseAdminReportComponent } from './employees/category-wise-admin-report/category-wise-admin-report.component';
import { CategoryWiseDistrictReportComponent } from './employees/category-wise-district-report/category-wise-district-report.component';
import { CategoryWisePanchayatReportComponent } from './employees/category-wise-panchayat-report/category-wise-panchayat-report.component';
import { CategoryWiseStateReportComponent } from './employees/category-wise-state-report/category-wise-state-report.component';
import { ConsolidatedCountWiseReportComponent } from './employees/consolidated-count-wise-report/consolidated-count-wise-report.component';
import { DistrictRoleManagementComponent } from './employees/district-role-management/district-role-management.component';
import { EditAndHoldDistrictComponent } from './employees/edit-and-hold-district/edit-and-hold-district.component';
import { ExistingMemberAlterationComponent } from './employees/existing-member-alteration/existing-member-alteration.component';
import { GradeAComponent } from './employees/grade-a/grade-a.component';
import { GradeBComponent } from './employees/grade-b/grade-b.component';
import { GradeCComponent } from './employees/grade-c/grade-c.component';
import { GradeWiseAdminComponent } from './employees/grade-wise-admin/grade-wise-admin.component';
import { GradeWiseDistrictComponent } from './employees/grade-wise-district/grade-wise-district.component';
import { GradeWiseStateComponent } from './employees/grade-wise-state/grade-wise-state.component';
import { ListOfRejectedMembersComponent } from './employees/list-of-rejected-members/list-of-rejected-members.component';
import { ListOnHoldComponent } from './employees/list-on-hold/list-on-hold.component';
import { NewApprovalsComponent } from './employees/new-approvals/new-approvals.component';
import { PanchayatRoleManagementComponent } from './employees/panchayat-role-management/panchayat-role-management.component';
import { PersonalDetailsComponent } from './employees/personal-details/personal-details.component';
import { ReqToPutOnHoldComponent } from './employees/req-to-put-on-hold/req-to-put-on-hold.component';
import { ReqToRemoveFromHoldComponent } from './employees/req-to-remove-from-hold/req-to-remove-from-hold.component';
import { StateRoleManagementComponent } from './employees/state-role-management/state-role-management.component';
import { UserManagementComponent } from './employees/user-management/user-management.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { LoginComponent } from './user/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'details/personalDetails', component: PersonalDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add/user', component: AddUserMasterComponent },
  { path: 'newApprovals', component: NewApprovalsComponent },
  { path: 'approvedList', component: ApprovedListComponent },
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
  { path: 'userManagement', component: UserManagementComponent },
  { path: 'gradeWiseData/admin', component: GradeWiseAdminComponent },
  { path: 'gradeWiseData/state', component: GradeWiseStateComponent },
  { path: 'gradeWiseData/district', component: GradeWiseDistrictComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'panchayat/categoryWise/report', component: CategoryWisePanchayatReportComponent },
  { path: 'district/categoryWise/report', component: CategoryWiseDistrictReportComponent },
  { path: 'state/categoryWise/report', component: CategoryWiseStateReportComponent },
  { path: 'admin/categoryWise/report', component: CategoryWiseAdminReportComponent },
  { path: 'consolidatedCount/report', component: ConsolidatedCountWiseReportComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
