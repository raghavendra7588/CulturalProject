import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  // public BASE_API = 'http://localhost:54372';
  public BASE_API = 'https://3intellects.co.in/uat_culturalApi/';

  private SAVE_PERSONAL_DETAILS_FORM = environment.BASE_URL + 'api/ProposalForm';
  private SAVE_PROPOSAL_FORM = environment.BASE_URL + 'api/ProposalFormModified';
  private GET_PROPOSAL_FROM_PENDING_USERS = environment.BASE_URL + 'api/ProposalFormModified';
  private GET_ALL_PERSONAL_DETAILS = environment.BASE_URL + 'api/ProposalForm';
  private GET_ROLE_MASTER_DATA = environment.BASE_URL + 'api/RoleMaster';
  private GET_DISTRICT_MASTER_DATA = environment.BASE_URL + 'api/DistrictMaster';
  private SAVE_USER_MASTER = environment.BASE_URL + 'api/UserMaster';
  private GET_USER_MASTER_DATA = environment.BASE_URL + 'api/UserMaster';
  private GET_NEW_APPROVALS_DATA = environment.BASE_URL + 'api/district/newApprovals';
  private UPDATE_NEW_APPROVALS_DATA = environment.BASE_URL + 'api/NewProposalDistrict';
  private GET_APPROVED_LIST_BY_STATE = environment.BASE_URL + 'api/ApprovedList';
  private GET_APPROVED_LIST_BY_DISTRICT = environment.BASE_URL + 'api/ApprovedList/district';
  private GET_GRADE_A_DATA = environment.BASE_URL + 'api/GradeWiseData';
  private GET_GRADE_B_DATA = environment.BASE_URL + 'api/GradeWiseData/gradeB';
  private GET_GRADE_C_DATA = environment.BASE_URL + 'api/GradeWiseData/gradeC';
  private GET_APPROVED_LIST_PANCHAYAT = environment.BASE_URL + 'api/ApprovedList/Panchayat';
  private GET_DISTRICT_MASTER_DATA_BY_DISTRICT_ID = environment.BASE_URL + 'api/districtById';
  private GET_EXISTING_MEMBER_ALTERATION_DATA = environment.BASE_URL + 'api/ExisitingMemberAlteration';
  private GET_LIST_OF_REJECTED_MEMBERS_BY_DISTRICT = environment.BASE_URL + 'api/RejectedMembers/RejectedMembersByDistrict';
  private GET_LIST_OF_REJECTED_MEMBERS_BY_STATE = environment.BASE_URL + 'api/RejectedMembers/GetAllRejectedMembersByState';
  private POST_DYNAMIC_STATE_APPROVED_LIST = environment.BASE_URL + 'api/DynamicStateApprovedList';
  private POST_DYNAMIC_STATE_REJECTED_LIST = environment.BASE_URL + 'api/DynamicStateRejectedList';
  private GET_LIST_OF_REJECTED_MEMBERS_BY_PANCHAYAT_NAME = environment.BASE_URL + 'api/RejectedMembersByPanchyat';
  private GET_STATUS_MASTER = environment.BASE_URL + 'api/StatusMaster';
  private POST_ONHOLD_BY_PANCHAYAT = environment.BASE_URL + 'api/OnHoldArtistByPanchayat';
  private GET_ONHOLD_BY_PANCHAYAT = environment.BASE_URL + 'api/OnHoldArtistByPanchayat';
  private GET_ONHOLD_AT_DISTRICT = environment.BASE_URL + 'api/OnHoldMembersAtDistrict';
  private GET_STATE_USER_MASTER_DATA = environment.BASE_URL + 'api/GetStateUserMaster';
  private GET_EDIT_OR_DISTRICT_DATA = environment.BASE_URL + 'api/EditOrHoldDistrict';
  private GET_REQ_TO_HOLD_AT_DISTRICT = environment.BASE_URL + 'api/ReqToPutOnHoldByDistrict';
  private GET_REQ_TO_HOLD_AT_PANCHAYAT = environment.BASE_URL + 'api/ReqToPutOnHoldByPanchayat';
  private POST_ARTIST_TO_HOLD_BY_DISTRICT = environment.BASE_URL + 'api/OnHoldArtist';
  private GET_ARTIST_ON_HOLD_BY_DISTRICT = environment.BASE_URL + 'api/ListOnHoldByDistrict';
  private GET_ARTIST_ON_HOLD_BY_PANCHAYAT = environment.BASE_URL + 'api/ListOnHoldByPanchayat';
  private POST_ARTIST_TO_APPROVED_BY_DISTRICT = environment.BASE_URL + 'api/PostOnApprovedArtistByDistrict';

  private POST_REQ_TO_PUT_ON_HOLD_BY_PANCHAYAT = environment.BASE_URL + 'api/PostReqToRemoveFromHoldByPanchayat';
  private GET_REQ_TO_HOLD_BY_DISTRICT = environment.BASE_URL + 'api/RequestToRemoveHoldAtDistrict';
  private GET_REQ_TO_HOLD_BY_PANCHAYAT = environment.BASE_URL + 'api/RequestToRemoveHoldAtPanchayat';

  private POST_REQ_HOLD_TO_APPROV_BY_DISTRICT = environment.BASE_URL + 'api/PostReqToRemoveFromHoldToApprovedByDistrict';
  private POST_REQ_HOLD_TO_HOLD_BY_DISTRICT = environment.BASE_URL + 'api/PostReqToRemoveFromHoldToHoldByDistrict';

  private POST_ON_HOLD_ARTIST_BY_STATE = environment.BASE_URL + 'api/DynamicStateOnHoldList';
  private GET_ARTIST_ON_HOLD_BY_STATE = environment.BASE_URL + 'api/ListOnHoldByState';
  private GET_PANCHAYAT_NAMES_BASED_ON_DISTRICT = environment.BASE_URL + 'api/getPanchayatNameBasedOnDistrict';

  private POST_DYNAMIC_STATE_HOLD_LIST = environment.BASE_URL + 'api/DynamicStateHoldList';
  private POST_REJECT_ARTIST_BY_DISTRICT = environment.BASE_URL + 'api/PostRejectArtistByDistrict';
  private POST_APPROV_TO_EDIT_BY_DISTRICT = environment.BASE_URL + 'api/ApprovedForEditByDistrict';
  private POST_GET_REQ_TO_HOLD_TO_HOLD_BY_DISTRICT = environment.BASE_URL + 'api/ReqToPutOnHoldToHoldByDistrict';

  private GET_USER_MASTER_DATA_FOR_STATE = environment.BASE_URL + 'api/RoleManegement/UserMasterDataForState';
  private GET_USER_MASTER_DATA_FOR_DISTRICT = environment.BASE_URL + 'api/RoleManegement/UserMasterDataForDistrict';
  private GET_USER_MASTER_DATA_FOR_PANCHAYAT = environment.BASE_URL + 'api/RoleManegement/UserMasterDataForPanchayat';

  private POST_ACTIVE_STATUS_USER_MASTER = environment.BASE_URL + 'api/RoleManagement';
  private GET_REQ_TO_PUT_ON_HOLD_AT_STATE = environment.BASE_URL + 'api/ReqToPutOnHoldByState';
  private GET_NEW_APPROVALS_AT_STATE = environment.BASE_URL + 'api/state/newApprovals';

  private POST_DYNAMIC_NEW_PROPOSAL_BY_STATE = environment.BASE_URL + 'api/DynamicActionByState/DynamicStateNewProposalByState';
  private POST_DYNAMIC_REQ_TO_PUT_ON_HOLD_BY_STATE = environment.BASE_URL + 'api/DynamicActionByState/DynamicStateReqToPutOnHoldByState';

  private POST_DYNAMIC_ROLE_DISTRICT = environment.BASE_URL + 'api/DynamicActionByState/DynamicStateRoleDistrictData';
  private POST_DYNAMIC_ROLE_PANCHAYAT = environment.BASE_URL + 'api/DynamicActionByState/DynamicStateRolePanchayatData';

  private POST_DOCUMENTS = environment.BASE_URL + 'api/uploadDocuments';

  private POST_PROPOSAL_FORM_IS_DRAFT = environment.BASE_URL + 'api/postDraft';
  private GET_UPLOADED_DOCUMENTS_DATA = environment.BASE_URL + 'api/panchayat/uploadedDocuments';
  private DELETE_UPLOADED_DOCUMENT = environment.BASE_URL + 'api/proposalFormModified/deleteFile';
  private EDIT_DOCUMENTS = environment.BASE_URL + 'api/editDocuments';

  private GET_NEW_APPROVALS_BY_ADMIN = environment.BASE_URL + 'api/proposalForm/admin/newApprovals';
  private GET_REQ_TO_PUT_ON_HOLD_BY_ADMIN = environment.BASE_URL + 'api/ReqToPutOnHold/ReqToPutOnHoldByAdmin';
  private GET_APPROVED_LIST_BY_ADMIN = environment.BASE_URL + 'api/ApprovedList/Admin';
  private GET_LIST_ON_HOLD_BY_ADMIN = environment.BASE_URL + 'api/ListOnHold/Admin';
  private GET_LIST_OF_REJECTED_ADMIN = environment.BASE_URL + 'api/RejectedMembers/GetAllRejectedMembersByAdmin';

  private GET_ADMIN_USER_BY_ADMIN = environment.BASE_URL + 'api/userMaster/adminUser';
  private GET_STATE_USER_BY_ADMIN = environment.BASE_URL + 'api/userMaster/stateUser';
  private GET_DISTRICT_USER_BY_ADMIN = environment.BASE_URL + 'api/userMaster/districteUser';
  private GET_PANCHAYAT_USER_BY_ADMIN = environment.BASE_URL + 'api/userMaster/panchayatUser';

  private GET_GRADE_A_ARTIST_BY_ADMIN = environment.BASE_URL + 'api/GradeWiseData/admin/gradeA';
  private GET_GRADE_B_ARTIST_BY_ADMIN = environment.BASE_URL + 'api/GradeWiseData/admin/gradeB';
  private GET_GRADE_C_ARTIST_BY_ADMIN = environment.BASE_URL + 'api/GradeWiseData/admin/gradeC';

  private GET_GRADE_A_ARTIST_BY_STATE = environment.BASE_URL + 'api/GradeWiseData/state/gradeA';
  private GET_GRADE_B_ARTIST_BY_STATE = environment.BASE_URL + 'api/GradeWiseData/state/gradeB';
  private GET_GRADE_C_ARTIST_BY_STATE = environment.BASE_URL + 'api/GradeWiseData/state/gradeC';

  private GET_GRADE_A_ARTIST_BY_DISTRICT = environment.BASE_URL + 'api/GradeWiseData/gradeA_ByDistrict';
  private GET_GRADE_B_ARTIST_BY_DISTRICT = environment.BASE_URL + 'api/GradeWiseData/gradeB_ByDistrict';
  private GET_GRADE_C_ARTIST_BY_DISTRICT = environment.BASE_URL + 'api/GradeWiseData/gradeC_ByDistrict';

  private POST_DYNAMIC_GRADE_A_ARTIST_BY_ADMIN = environment.BASE_URL + 'api/DynamicStateApprovedList/DyanmicGradeAByAdmin';
  private POST_DYNAMIC_GRADE_B_ARTIST_BY_ADMIN = environment.BASE_URL + 'api/DynamicStateApprovedList/DyanmicGradeBByAdmin';
  private POST_DYNAMIC_GRADE_C_ARTIST_BY_ADMIN = environment.BASE_URL + 'api/DynamicStateApprovedList/DyanmicGradeCByAdmin';

  private POST_DYNAMIC_GRADE_A_ARTIST_BY_STATE = environment.BASE_URL + 'api/DynamicStateApprovedList/DyanmicGradeAByState';
  private POST_DYNAMIC_GRADE_B_ARTIST_BY_STATE = environment.BASE_URL + 'api/DynamicStateApprovedList/DyanmicGradeBByState';
  private POST_DYNAMIC_GRADE_C_ARTIST_BY_STATE = environment.BASE_URL + 'api/DynamicStateApprovedList/DyanmicGradeCByState';

  private POST_DYNAMIC_GRADE_A_ARTIST_BY_DISTRICT = environment.BASE_URL + 'api/DynamicStateApprovedList/DyanmicGradeAByDistrict';
  private POST_DYNAMIC_GRADE_B_ARTIST_BY_DISTRICT = environment.BASE_URL + 'api/DynamicStateApprovedList/DyanmicGradeBByDistrict';
  private POST_DYNAMIC_GRADE_C_ARTIST_BY_DISTRICT = environment.BASE_URL + 'api/DynamicStateApprovedList/DyanmicGradeCByDistrict';


  private POST_DYNAMIC_NEW_PROPOSAL_BY_ADMIN = environment.BASE_URL + 'api/DynamicActionByState/DynamicStateNewProposalByAdmin';
  private POST_DYNAMIC_APPROVED_LIST_BY_ADMIN = environment.BASE_URL + 'api/DynamicStateApprovedList/DynamicStateApprovedListByAdmin';
  private POST_DYNAMIC_REQ_TO_PUT_ON_HOLD_BY_ADMIN = environment.BASE_URL + 'api/DynamicActionByState/DynamicStateReqToPutOnHoldByAdmin';
  private POST_DYNAMIC_HOLD_LIST_BY_ADMIN = environment.BASE_URL + 'api/DynamicStateApprovedList/DynamicStateHoldListByAdmin';
  private POST_DYNAMIC_REJECTED_LIST_BY_ADMIN = environment.BASE_URL + 'api/DynamicStateApprovedList/DynamicStateRejectedListByAdmin';

  private POST_DYNAMIC_DISTRICT_USERS_BY_ADMIN = environment.BASE_URL + 'api/DynamicActionByState/DynamicDistrictUsersByAdmin';
  private POST_DYNAMIC_PANCHAYAT_USERS_BY_ADMIN = environment.BASE_URL + 'api/DynamicActionByState/DynamicPanchayatDataByAdmin';

  private POST_DYNAMIC_USER_CREATION_DATA_AT_ADMIN = environment.BASE_URL + 'api/DynamicActionByState/DynamicUserCreatedDataByAdmin';
  private POST_DYNAMIC_USER_CREATION_DATA_AT_STATE = environment.BASE_URL + 'api/DynamicActionByState/DynamicUserCreatedDataByState';


  private GET_ALL_GRADE_WISE_DATA_AT_PANCHAYAT = environment.BASE_URL + 'api/GradeWiseData/gradeAll';
  private GET_ALL_GRADE_WISE_DATA_AT_DISTRICT = environment.BASE_URL + 'api/GradeWiseData/gradeAllDistrict';
  private GET_ALL_HOLDED_GRADE_WISE_DATA_AT_PANCHAYAT = environment.BASE_URL + 'api/GradeWiseData/holdedGradeAll';
  private GET_ALL_HOLDED_GRADE_WISE_DATA_AT_DISTRICT = environment.BASE_URL + 'api/GradeWiseData/holdedGradeAllDistrict';

  private GET_HOLDED_GRADE_WISE_A_DATA_AT_PANCHAYAT = environment.BASE_URL + 'api/GradeWiseData/holdedGradeA';
  private GET_HOLDED_GRADE_WISE_B_DATA_AT_PANCHAYAT = environment.BASE_URL + 'api/GradeWiseData/holdedGradeB';
  private GET_HOLDED_GRADE_WISE_C_DATA_AT_PANCHAYAT = environment.BASE_URL + 'api/GradeWiseData/holdedGradeC';


  private GET_HOLDED_GRADE_WISE_A_DATA_AT_DISTRICT = environment.BASE_URL + 'api/GradeWiseData/holdedGradeADistrict';
  private GET_HOLDED_GRADE_WISE_B_DATA_AT_DISTRICT = environment.BASE_URL + 'api/GradeWiseData/holdedGradeBDistrict';
  private GET_HOLDED_GRADE_WISE_C_DATA_AT_DISTRICT = environment.BASE_URL + 'api/GradeWiseData/holdedGradeCDistrict';

  constructor(
    public http: HttpClient
  ) { }


  getAllPersonalDetailsData(userId: number) {
    return this.http.get(this.GET_PROPOSAL_FROM_PENDING_USERS + '/' + userId);
  }

  savePersonalDetailsForm(personalDetails) {
    return this.http.post(this.SAVE_PERSONAL_DETAILS_FORM, personalDetails);
  }

  getRoleMasterData(roleId) {
    return this.http.get(this.GET_ROLE_MASTER_DATA + '/' + roleId);
  }

  getDistrictMasterData() {
    return this.http.get(this.GET_DISTRICT_MASTER_DATA);
  }

  getStatusMasterData() {
    return this.http.get(this.GET_STATUS_MASTER);
  }

  saveUserMasterData(userMaster) {
    return this.http.post(this.SAVE_USER_MASTER, userMaster);
  }

  getUserMasterData(roleId) {
    return this.http.get(this.GET_USER_MASTER_DATA + '/' + roleId);
  }

  saveProposalFormData(personalDetails) {
    return this.http.post(this.SAVE_PROPOSAL_FORM, personalDetails);
  }

  getNewProposalFormData(userId) {
    return this.http.get(this.GET_NEW_APPROVALS_DATA + '/' + userId);
  }

  updateNewProposalFormData(proposalFormData) {
    return this.http.post(this.UPDATE_NEW_APPROVALS_DATA, proposalFormData);
  }

  getApprovedList() {
    return this.http.get(this.GET_APPROVED_LIST_BY_STATE);
  }

  getApprovedListByDistrict(userId: number) {
    return this.http.get(this.GET_APPROVED_LIST_BY_DISTRICT + '/' + userId);
  }

  getGradeWiseData(userId: number) {
    return this.http.get(this.GET_GRADE_A_DATA + '/' + userId);
  }

  getGradeBWiseData(userId: number) {
    return this.http.get(this.GET_GRADE_B_DATA + '/' + userId);
  }

  getGradeCWiseData(userId: number) {
    return this.http.get(this.GET_GRADE_C_DATA + '/' + userId);
  }

  getApprovedListPanchayat(districtId: number) {
    return this.http.get(this.GET_APPROVED_LIST_PANCHAYAT + '/' + districtId);
  }

  getDistrictById(districtId: number) {
    return this.http.get(this.GET_DISTRICT_MASTER_DATA_BY_DISTRICT_ID + '/' + districtId);
  }

  existingMemberAltertion(userId: number) {
    return this.http.get(this.GET_EXISTING_MEMBER_ALTERATION_DATA + '/' + userId);
  }

  getListOfRejectedMembersByDistrict(userId: number) {
    return this.http.get(this.GET_LIST_OF_REJECTED_MEMBERS_BY_DISTRICT + '/' + userId);
  }

  getListOfRejectedMembersByState() {
    return this.http.get(this.GET_LIST_OF_REJECTED_MEMBERS_BY_STATE);
  }

  postDynamicStateApprovedList(approvedListData) {
    return this.http.post(this.POST_DYNAMIC_STATE_APPROVED_LIST, approvedListData);
  }

  postDynamicStateRejectedList(approvedListData) {
    return this.http.post(this.POST_DYNAMIC_STATE_REJECTED_LIST, approvedListData);
  }

  getListOfRejectedMembersByPanchyat(userId: any) {
    return this.http.get(this.GET_LIST_OF_REJECTED_MEMBERS_BY_PANCHAYAT_NAME + '/' + userId);
  }

  postOnHoldByPanchayat(onHoldByPanchayat) {
    return this.http.post(this.POST_ONHOLD_BY_PANCHAYAT, onHoldByPanchayat);
  }

  getListOfOnHolMembersByPanchyat(userId: any) {
    return this.http.get(this.GET_ONHOLD_BY_PANCHAYAT + '/' + userId);
  }

  getListOfOnHolMembersAtPanchayatData(userId: any) {
    return this.http.get(this.GET_ONHOLD_AT_DISTRICT + '/' + userId);
  }

  getStateUserMaster() {
    return this.http.get(this.GET_STATE_USER_MASTER_DATA);
  }

  getEditOrHoldMaster(userId: number) {
    return this.http.get(this.GET_EDIT_OR_DISTRICT_DATA + '/' + userId);
  }

  getReqToPutOnHoldAtDistrict(userId: number) {
    return this.http.get(this.GET_REQ_TO_HOLD_AT_DISTRICT + '/' + userId);
  }

  getReqToPutOnHoldAtPanchayat(userId: number) {
    return this.http.get(this.GET_REQ_TO_HOLD_AT_PANCHAYAT + '/' + userId);
  }

  postArtistToHoldByDistrict(holdArtist) {
    return this.http.post(this.POST_ARTIST_TO_HOLD_BY_DISTRICT, holdArtist);
  }

  getOnHoldAtDistrict(userId: number) {
    return this.http.get(this.GET_ARTIST_ON_HOLD_BY_DISTRICT + '/' + userId);
  }

  getOnHoldAtPanchayat(userId: number) {
    return this.http.get(this.GET_ARTIST_ON_HOLD_BY_PANCHAYAT + '/' + userId);
  }


  postArtistToApprovByDistrict(approvArtist) {
    return this.http.post(this.POST_ARTIST_TO_APPROVED_BY_DISTRICT, approvArtist);
  }


  postReqToPutOnHoldByPanchayat(ReqToHold) {
    return this.http.post(this.POST_REQ_TO_PUT_ON_HOLD_BY_PANCHAYAT, ReqToHold);
  }

  getReqToHoldAtDistrict(userId: number) {
    return this.http.get(this.GET_REQ_TO_HOLD_BY_DISTRICT + '/' + userId);
  }

  getReqToHoldAtPanchayat(userId: number) {
    return this.http.get(this.GET_REQ_TO_HOLD_BY_PANCHAYAT + '/' + userId);
  }

  postArtistToReqToHoldToApprovByDistrict(approvArtist) {
    return this.http.post(this.POST_REQ_HOLD_TO_APPROV_BY_DISTRICT, approvArtist);
  }

  postArtistToReqToHoldToHoldByDistrict(holdArtist) {
    return this.http.post(this.POST_REQ_HOLD_TO_HOLD_BY_DISTRICT, holdArtist);
  }

  postArtistToOnHoldByState(holdArtist) {
    return this.http.post(this.POST_ON_HOLD_ARTIST_BY_STATE, holdArtist);
  }

  getReqToHoldAtState() {
    return this.http.get(this.GET_ARTIST_ON_HOLD_BY_STATE);
  }


  getPanchayatBasedOnDistrictId(districtId) {
    return this.http.get(this.GET_PANCHAYAT_NAMES_BASED_ON_DISTRICT + '/' + districtId);
  }

  postDynamicHoldListByState(holdList) {
    return this.http.post(this.POST_DYNAMIC_STATE_HOLD_LIST, holdList);
  }

  postRejectArtistByDistrict(rejectArtist) {
    return this.http.post(this.POST_REJECT_ARTIST_BY_DISTRICT, rejectArtist);
  }

  postApprovToEditByDistrict(approvToEdit) {
    return this.http.post(this.POST_APPROV_TO_EDIT_BY_DISTRICT, approvToEdit);
  }


  postApprovToHoldToHoldByDistrict(holdArtist) {
    return this.http.post(this.POST_GET_REQ_TO_HOLD_TO_HOLD_BY_DISTRICT, holdArtist);
  }

  getUserMasterDataForState() {
    return this.http.get(this.GET_USER_MASTER_DATA_FOR_STATE);
  }

  getUserMasterDataForDistrict() {
    return this.http.get(this.GET_USER_MASTER_DATA_FOR_DISTRICT);
  }

  getUserMasterDataForPanchayat() {
    return this.http.get(this.GET_USER_MASTER_DATA_FOR_PANCHAYAT);
  }

  postActiveStatus(activeStatus) {
    return this.http.post(this.POST_ACTIVE_STATUS_USER_MASTER, activeStatus);
  }

  getRequestToPutOnHoldByState() {
    return this.http.get(this.GET_REQ_TO_PUT_ON_HOLD_AT_STATE);
  }

  getNewApprovalsByState() {
    return this.http.get(this.GET_NEW_APPROVALS_AT_STATE);
  }

  postDynamicNewProposalByState(newProposal) {
    return this.http.post(this.POST_DYNAMIC_NEW_PROPOSAL_BY_STATE, newProposal);
  }

  postDynamicReqToPutOnHoldByState(reqToPutOnHold) {
    return this.http.post(this.POST_DYNAMIC_REQ_TO_PUT_ON_HOLD_BY_STATE, reqToPutOnHold);
  }

  postDynamicDistrictDataByState(district) {
    return this.http.post(this.POST_DYNAMIC_ROLE_DISTRICT, district);
  }

  postDynamicDistrictDataByPanchayat(panchayat) {
    return this.http.post(this.POST_DYNAMIC_ROLE_PANCHAYAT, panchayat);
  }

  postDocuments(uploadDocuments) {
    return this.http.post(this.POST_DOCUMENTS, uploadDocuments);
  }

  postIsDraft(isDraft) {
    return this.http.post(this.POST_PROPOSAL_FORM_IS_DRAFT, isDraft);
  }

  getUploadedDocumentsByProposalId(proposalId) {
    return this.http.get(this.GET_UPLOADED_DOCUMENTS_DATA + '/' + proposalId);
  }

  deleteUploadedFiles(deleteFiles) {
    return this.http.post(this.DELETE_UPLOADED_DOCUMENT, deleteFiles);
  }

  editUploadedFile(editedFiles) {
    return this.http.post(this.EDIT_DOCUMENTS, editedFiles);
  }

  getNewApprovalsDataByAdminUser() {
    return this.http.get(this.GET_NEW_APPROVALS_BY_ADMIN);
  }


  getRequestToPutOnHoldDataByAdminUser() {
    return this.http.get(this.GET_REQ_TO_PUT_ON_HOLD_BY_ADMIN);
  }

  getApprovedListByAdminUser() {
    return this.http.get(this.GET_APPROVED_LIST_BY_ADMIN);
  }

  getListOnHoldByAdminUser() {
    return this.http.get(this.GET_LIST_ON_HOLD_BY_ADMIN);
  }

  getListRejectedByAdminUser() {
    return this.http.get(this.GET_LIST_OF_REJECTED_ADMIN);
  }
  getAdminUserByAdmin() {
    return this.http.get(this.GET_ADMIN_USER_BY_ADMIN);
  }
  getStatedByAdmin() {
    return this.http.get(this.GET_STATE_USER_BY_ADMIN);
  }
  getDistrictAdmin() {
    return this.http.get(this.GET_DISTRICT_USER_BY_ADMIN);
  }
  getPanchayatByAdmin() {
    return this.http.get(this.GET_PANCHAYAT_USER_BY_ADMIN);
  }

  getGradeAArtistByAdmin() {
    return this.http.get(this.GET_GRADE_A_ARTIST_BY_ADMIN);
  }


  getGradeBArtistByAdmin() {
    return this.http.get(this.GET_GRADE_B_ARTIST_BY_ADMIN);
  }

  getGradeCArtistByAdmin() {
    return this.http.get(this.GET_GRADE_C_ARTIST_BY_ADMIN);
  }


  getGradeAArtistByState() {
    return this.http.get(this.GET_GRADE_A_ARTIST_BY_STATE);
  }


  getGradeBArtistByState() {
    return this.http.get(this.GET_GRADE_B_ARTIST_BY_STATE);
  }

  getGradeCArtistByState() {
    return this.http.get(this.GET_GRADE_C_ARTIST_BY_STATE);
  }


  getArtistCategoryADataByAdmin(artistCategoryA) {
    return this.http.post(this.POST_DYNAMIC_GRADE_A_ARTIST_BY_ADMIN, artistCategoryA);
  }
  getArtistCategoryBDataByAdmin(artistCategoryB) {
    return this.http.post(this.POST_DYNAMIC_GRADE_B_ARTIST_BY_ADMIN, artistCategoryB);
  }
  getArtistCategoryCDataByAdmin(artistCategoryC) {
    return this.http.post(this.POST_DYNAMIC_GRADE_C_ARTIST_BY_ADMIN, artistCategoryC);
  }



  getArtistCategoryADataByState(artistCategoryA) {
    return this.http.post(this.POST_DYNAMIC_GRADE_A_ARTIST_BY_STATE, artistCategoryA);
  }
  getArtistCategoryBDataByState(artistCategoryB) {
    return this.http.post(this.POST_DYNAMIC_GRADE_B_ARTIST_BY_STATE, artistCategoryB);
  }
  getArtistCategoryCDataByState(artistCategoryC) {
    return this.http.post(this.POST_DYNAMIC_GRADE_C_ARTIST_BY_STATE, artistCategoryC);
  }

  postDynamicNewApprovalsByAdmin(newApprovals) {
    return this.http.post(this.POST_DYNAMIC_NEW_PROPOSAL_BY_ADMIN, newApprovals);
  }

  postDynamicApprovedListByAdmin(approvedList) {
    return this.http.post(this.POST_DYNAMIC_APPROVED_LIST_BY_ADMIN, approvedList);
  }

  postDynamicReqToPutOnHoldListByAdmin(reqToPutOnHold) {
    return this.http.post(this.POST_DYNAMIC_REQ_TO_PUT_ON_HOLD_BY_ADMIN, reqToPutOnHold);
  }

  postDynamicHoldListByAdmin(holdList) {
    return this.http.post(this.POST_DYNAMIC_HOLD_LIST_BY_ADMIN, holdList);
  }

  postDynamicRejectedListByAdmin(rejectedList) {
    return this.http.post(this.POST_DYNAMIC_REJECTED_LIST_BY_ADMIN, rejectedList);
  }

  postDynamicDistrictUsersByAdmin(districtUsers) {
    return this.http.post(this.POST_DYNAMIC_DISTRICT_USERS_BY_ADMIN, districtUsers);
  }

  postDynamicPanchayatUsersByAdmin(pacnhayatUsers) {
    return this.http.post(this.POST_DYNAMIC_PANCHAYAT_USERS_BY_ADMIN, pacnhayatUsers);
  }

  postDynamicUserCreationDataAtAdmin(userCreation) {
    return this.http.post(this.POST_DYNAMIC_USER_CREATION_DATA_AT_ADMIN, userCreation);
  }

  postDynamicUserCreationDataAtState(userCreation) {
    return this.http.post(this.POST_DYNAMIC_USER_CREATION_DATA_AT_STATE, userCreation);
  }

  getGradeAArtistDataByDistrict(userId) {
    return this.http.get(this.GET_GRADE_A_ARTIST_BY_DISTRICT + '/' + userId);
  }

  getGradeBArtistDataByDistrict(userId) {
    return this.http.get(this.GET_GRADE_B_ARTIST_BY_DISTRICT + '/' + userId);
  }

  getGradeCArtistDataByDistrict(userId) {
    return this.http.get(this.GET_GRADE_C_ARTIST_BY_DISTRICT + '/' + userId);
  }


  postDynamicGradeAArtistByDistrict(gradeA) {
    return this.http.post(this.POST_DYNAMIC_GRADE_A_ARTIST_BY_DISTRICT, gradeA);
  }
  postDynamicGradeBArtistByDistrict(gradeB) {
    return this.http.post(this.POST_DYNAMIC_GRADE_B_ARTIST_BY_DISTRICT, gradeB);
  }
  postDynamicGradeCArtistByDistrict(gradeC) {
    return this.http.post(this.POST_DYNAMIC_GRADE_C_ARTIST_BY_DISTRICT, gradeC);
  }


  getAllGradeWiseDataAtPanchayat(userId) {
    return this.http.get(this.GET_ALL_GRADE_WISE_DATA_AT_PANCHAYAT + '/' + userId);
  }

  getHoldedAllGradeWiseDataAtPanchayat(userId) {
    return this.http.get(this.GET_ALL_HOLDED_GRADE_WISE_DATA_AT_PANCHAYAT + '/' + userId);
  }

  getHoldedGradeAArtistData(userId) {
    return this.http.get(this.GET_HOLDED_GRADE_WISE_A_DATA_AT_PANCHAYAT + '/' + userId);
  }

  getHoldedGradeBArtistData(userId) {
    return this.http.get(this.GET_HOLDED_GRADE_WISE_B_DATA_AT_PANCHAYAT + '/' + userId);
  }

  getHoldedGradeCArtistData(userId) {
    return this.http.get(this.GET_HOLDED_GRADE_WISE_C_DATA_AT_PANCHAYAT + '/' + userId);
  }

  getALLArtistDataByDistrict(userId) {
    return this.http.get(this.GET_ALL_GRADE_WISE_DATA_AT_DISTRICT + '/' + userId);
  }



  
  getHoldedGradeAArtistDataByDistrict(userId) {
    return this.http.get(this.GET_HOLDED_GRADE_WISE_A_DATA_AT_DISTRICT + '/' + userId);
  }

  getHoldedGradeBArtistDataByDistrict(userId) {
    return this.http.get(this.GET_HOLDED_GRADE_WISE_B_DATA_AT_DISTRICT + '/' + userId);
  }

  getHoldedGradeCArtistDataByDistrict(userId) {
    return this.http.get(this.GET_HOLDED_GRADE_WISE_C_DATA_AT_DISTRICT + '/' + userId);
  }

  getHoldedGradeAllArtistDataByDistrict(userId) {
    return this.http.get(this.GET_ALL_HOLDED_GRADE_WISE_DATA_AT_DISTRICT + '/' + userId);
  }
}
