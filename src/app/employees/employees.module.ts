import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

import { DialogPersonalDetailComponent } from './dialog-personal-detail/dialog-personal-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { NumberDirective } from './number.directive';
import { AddUserMasterComponent } from './add-user-master/add-user-master.component';
import { DialogAddUserMasterComponent } from './dialog-add-user-master/dialog-add-user-master.component';
import { NewApprovalsComponent } from './new-approvals/new-approvals.component';
import { DialogViewProposalFormComponent } from './dialog-view-proposal-form/dialog-view-proposal-form.component';
import { DialogApprovArtistComponent } from './dialog-approv-artist/dialog-approv-artist.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ApprovedListComponent } from './approved-list/approved-list.component';
import { GradeAComponent } from './grade-a/grade-a.component';
import { GradeBComponent } from './grade-b/grade-b.component';
import { GradeCComponent } from './grade-c/grade-c.component';
import { ApprovedListPanchayatComponent } from './approved-list-panchayat/approved-list-panchayat.component';
import { ExistingMemberAlterationComponent } from './existing-member-alteration/existing-member-alteration.component';
import { ListOfRejectedMembersComponent } from './list-of-rejected-members/list-of-rejected-members.component';
import { ReasonForRejectionComponent } from './reason-for-rejection/reason-for-rejection.component';
import { ApprovalsOnHoldComponent } from './approvals-on-hold/approvals-on-hold.component';
import { EditAndHoldDistrictComponent } from './edit-and-hold-district/edit-and-hold-district.component';
import { ReqToPutOnHoldComponent } from './req-to-put-on-hold/req-to-put-on-hold.component';
import { ListOnHoldComponent } from './list-on-hold/list-on-hold.component';
import { ReqToRemoveFromHoldComponent } from './req-to-remove-from-hold/req-to-remove-from-hold.component';
import { StateRoleManagementComponent } from './state-role-management/state-role-management.component';
import { DistrictRoleManagementComponent } from './district-role-management/district-role-management.component';
import { PanchayatRoleManagementComponent } from './panchayat-role-management/panchayat-role-management.component';
import { DialogRoleManagementComponent } from './dialog-role-management/dialog-role-management.component';
import { DialogPersonalDetailsEditComponent } from './dialog-personal-details-edit/dialog-personal-details-edit.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { GradeWiseAdminComponent } from './grade-wise-admin/grade-wise-admin.component';
import { GradeWiseStateComponent } from './grade-wise-state/grade-wise-state.component';
import { GradeWiseDistrictComponent } from './grade-wise-district/grade-wise-district.component';
import { CategoryWisePanchayatReportComponent } from './category-wise-panchayat-report/category-wise-panchayat-report.component';
import { CategoryWiseDistrictReportComponent } from './category-wise-district-report/category-wise-district-report.component';
import { CategoryWiseStateReportComponent } from './category-wise-state-report/category-wise-state-report.component';
import { CategoryWiseAdminReportComponent } from './category-wise-admin-report/category-wise-admin-report.component';
import { ConsolidatedCountWiseReportComponent } from './consolidated-count-wise-report/consolidated-count-wise-report.component';
import { ArtTypeConsolidatedCountWiseReportComponent } from './art-type-consolidated-count-wise-report/art-type-consolidated-count-wise-report.component';

import { CasteWiseConsolidatedReportComponent } from './caste-wise-consolidated-report/caste-wise-consolidated-report.component';
import { ReligionWiseConsolidatedReportComponent } from './religion-wise-consolidated-report/religion-wise-consolidated-report.component';
import { GradeWiseConsolidatedReportComponent } from './grade-wise-consolidated-report/grade-wise-consolidated-report.component';
import { ConsolidatedRejectedReportComponent } from './consolidated-rejected-report/consolidated-rejected-report.component';

@NgModule({
  declarations: [
    PersonalDetailsComponent,
    DialogPersonalDetailComponent,
    NumberDirective,
    AddUserMasterComponent,
    DialogAddUserMasterComponent,
    NewApprovalsComponent,
    DialogViewProposalFormComponent,
    DialogApprovArtistComponent,
    ApprovedListComponent,
    GradeAComponent,
    GradeBComponent,
    GradeCComponent,
    ApprovedListPanchayatComponent,
    ExistingMemberAlterationComponent,
    ListOfRejectedMembersComponent,
    ReasonForRejectionComponent,
    ApprovalsOnHoldComponent,
    EditAndHoldDistrictComponent,
    ReqToPutOnHoldComponent,
    ListOnHoldComponent,
    ReqToRemoveFromHoldComponent,
    StateRoleManagementComponent,
    DistrictRoleManagementComponent,
    PanchayatRoleManagementComponent,
    DialogRoleManagementComponent,
    DialogPersonalDetailsEditComponent,
    UserManagementComponent,
    GradeWiseAdminComponent,
    GradeWiseStateComponent,
    GradeWiseDistrictComponent,
    CategoryWisePanchayatReportComponent,
    CategoryWiseDistrictReportComponent,
    CategoryWiseStateReportComponent,
    CategoryWiseAdminReportComponent,
    ConsolidatedCountWiseReportComponent,
    ArtTypeConsolidatedCountWiseReportComponent,
    CasteWiseConsolidatedReportComponent,
    ReligionWiseConsolidatedReportComponent,
    GradeWiseConsolidatedReportComponent,
    ConsolidatedRejectedReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1200,
      preventDuplicates: true
    }),
  ],
  exports: [PersonalDetailsComponent, AddUserMasterComponent, NewApprovalsComponent, ApprovedListComponent,
    GradeAComponent, GradeBComponent, GradeCComponent, ExistingMemberAlterationComponent, ListOfRejectedMembersComponent,
    ApprovalsOnHoldComponent, EditAndHoldDistrictComponent, ReqToPutOnHoldComponent, ListOnHoldComponent, ReqToRemoveFromHoldComponent,
    StateRoleManagementComponent, DistrictRoleManagementComponent, PanchayatRoleManagementComponent, UserManagementComponent,
    GradeWiseAdminComponent, GradeWiseStateComponent, CategoryWiseDistrictReportComponent,
    GradeWiseDistrictComponent, CategoryWisePanchayatReportComponent, CategoryWiseStateReportComponent, CategoryWiseAdminReportComponent,
    ConsolidatedCountWiseReportComponent, ArtTypeConsolidatedCountWiseReportComponent,
    CasteWiseConsolidatedReportComponent,
    ReligionWiseConsolidatedReportComponent,
    GradeWiseConsolidatedReportComponent, ConsolidatedRejectedReportComponent],

  entryComponents: [DialogPersonalDetailComponent, DialogAddUserMasterComponent, DialogViewProposalFormComponent,
    DialogApprovArtistComponent, ReasonForRejectionComponent, DialogRoleManagementComponent, DialogPersonalDetailsEditComponent]
})
export class EmployeesModule { }
