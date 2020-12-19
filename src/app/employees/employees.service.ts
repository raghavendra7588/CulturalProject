import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private SAVE_PERSONAL_DETAILS_FORM = environment.BASE_URL + 'api/ProposalForm';
  private SAVE_PROPOSAL_FORM = environment.BASE_URL + 'api/ProposalFormModified';
  private GET_PROPOSAL_FROM_PENDING_USERS = environment.BASE_URL + 'api/ProposalFormModified';
  private GET_ALL_PERSONAL_DETAILS = environment.BASE_URL + 'api/ProposalForm';
  private GET_TEST_DATA = environment.BASE_URL + 'api/test';
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

  constructor(
    public http: HttpClient
  ) { }

  getAllPersonalDetailsData(userId: number) {
    return this.http.get(this.GET_PROPOSAL_FROM_PENDING_USERS + '/' + userId);
  }

  savePersonalDetailsForm(personalDetails) {
    return this.http.post(this.SAVE_PERSONAL_DETAILS_FORM, personalDetails);
  }

  getAllData() {
    return this.http.get(this.GET_TEST_DATA);
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
    return this.http.post(this.POST_ARTIST_TO_HOLD_BY_DISTRICT, approvArtist);
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

}
