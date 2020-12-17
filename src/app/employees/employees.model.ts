export class PersonalDetails {
    id?: string;
    artistSystemCode?: string;
    firstName?: string;
    middleName?: string;
    fullname?: string;
    lastName?: string;
    dob?: any;
    annualIncome?: string;

    artType?: string;
    periodOfWork?: string;
    grade?: string;
    address?: string;
    taluka?: string;
    district?: number;
    contactNo1?: string;
    contactNo2?: string;
    aadharNo?: string;
    panNo?: string;
    spouseName?: string;
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    BankIFSCCode?: string;
    city?: string;
    gender?: string;
    currentAge?: string;
    familyMemberCount?: string;
    dependentFamilyMemberCount?: string;
    religion?: string;
    caste?: string;
    workDetails?: string;
    artLocations?: string;
    place?: string;
    applicationDate?: any;
    dobProof?: any;
    maharashtraResidentProof?: any;
    annualIncomeProof?: any;
    illHandicapedCheck?: string;
    illHandicapedProof?: any;
    publicationsGovtRecognistionProof?: any;
    culturalMinsitryCertificationProof?: any;
    sponseredDocumentsProof?: any;
    collectorNominatedParticipationProof?: any;
    institutionandIndividualRecomendationProof?: any;
    beneficiaryBenefitPlanCheck?: string;
    beneficiaryBenefitPlanProof?: any;
    notarisedCertificateOfConfirmationProof?: any;
    manualFormProof?: any;
    artistPhotographProof?: any;
    nomineePhotographProof?: any;
    bankAccountConfirmationProof?: any;
    otherDocuments?: any;
    documentUpload?: any;
    fileUpload?: any;
    financialBenefitCheck?: any;
    financialBenefitReceived?: any;
    pensionAmountMonthlyBasis?: any;
    pensionAmountYearlyBasis?: any;
    pinCode?: number;
    userId?: number;
    status?: string;
    createdBy?: string;
    updatedBy?: string;
    reasonForEdit?: string;
    reasonForRequestToPutOnHold?: string;
    reasonForApprovedToEditByDistrict?: string;
    reasonToRemoveFromHoldByDistrict?: string;
    reasonToHoldByDistrict?: string;
    reasonForRequestToRemoveFromHoldByPanchayat?: string;
}

export class UserMaster {
    userId?: number;
    name?: string;
    userName?: string;
    password?: string;
    mobileNumber?: number;
    emailId?: string;
    isActive?: string;
    roleId?: number;
    districtId?: number;
    PanchyatName?: string;
    createdBy?: number;
    updatedBy?: number;
    pinCode?: string;
    holdByDistrict?: number;
}

// export class SaveUserMaster {
//     userId?: number;
//     name?: string;
//     userName?: string;
//     password?: string;
//     mobileNumber?: number;
//     emailId?: string;
//     isActive?: string;
//     role?: string;
//     district?: string;
// }

export class NewProposal {
    id?: string;
    artistSystemCode?: string;
    firstName?: string;
    middleName?: string;
    fullname?: string;
    lastName?: string;
    dob?: string;
    annualIncome?: string;
    artType?: string;
    periodOfWork?: string;
    grade?: string;
    address?: string;
    taluka?: string;
    district?: string;
    contactNo1?: string;
    contactNo2?: string;
    aadharNo?: string;
    panNo?: string;
    spouseName?: string;
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    BankIFSCCode?: string;
    city?: string;
    gender?: string;
    currentAge?: string;
    familyMemberCount?: string;
    dependentFamilyMemberCount?: string;
    religion?: string;
    caste?: string;
    workDetails?: string;
    artLocations?: string;
    place?: string;
    applicationDate?: string;
    pinCode?: number;
    userId?: number;
    status?: string;
    monthlyPension?: string;
    yearlyPension?: string;
}

export class NewProposalBL {
    id?: string;
    artistSystemCode?: string;
    firstName?: string;
    middleName?: string;
    fullname?: string;
    lastName?: string;
    dob?: string;
    annualIncome?: string;
    artType?: string;
    periodOfWork?: string;
    grade?: string;
    address?: string;
    taluka?: string;
    district?: string;
    contactNo1?: string;
    contactNo2?: string;
    aadharNo?: string;
    panNo?: string;
    spouseName?: string;
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    BankIFSCCode?: string;
    city?: string;
    gender?: string;
    currentAge?: string;
    familyMemberCount?: string;
    dependentFamilyMemberCount?: string;
    religion?: string;
    caste?: string;
    workDetails?: string;
    artLocations?: string;
    place?: string;
    applicationDate?: string;
    pinCode?: number;
    userId?: number;
    status?: string;
    monthlyPension?: string;
    yearlyPension?: string;
    reasonForRejection?: string;
    statusCode?: number;
    updatedBy?: number;
    approvedByDistrict?: number;
    RejectedByDistrict?: number;
    StatusId?: number;
}

export class DynamicStateApproved {
    districtId?: number;
    roleName?: string;
    panchayatName?: string;
}

export class DynamicStateReject {
    districtId?: number;
    roleName?: string;
    panchayatName?: string;
}


export class DynamicPanchayatName {
    panchayatName?: string;
}

export class ProposalFormRejection {
    id?: string;
    artistSystemCode?: string;
    firstName?: string;
    middleName?: string;
    fullname?: string;
    lastName?: string;
    dob?: string;
    annualIncome?: string;
    artType?: string;
    periodOfWork?: string;
    grade?: string;
    address?: string;
    taluka?: string;
    district?: string;
    contactNo1?: string;
    contactNo2?: string;
    aadharNo?: string;
    panNo?: string;
    spouseName?: string;
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    BankIFSCCode?: string;
    city?: string;
    gender?: string;
    currentAge?: string;
    familyMemberCount?: string;
    dependentFamilyMemberCount?: string;
    religion?: string;
    caste?: string;
    workDetails?: string;
    artLocations?: string;
    place?: string;
    applicationDate?: string;
    pinCode?: number;
    userId?: number;
    status?: string;
    monthlyPension?: string;
    yearlyPension?: string;
    reasonForRejection?: string;
}


export class OnHoldProposalForm {
    id?: number;
    userId?: number;
    statusId?: number;
    updatedBy?: number;
    ReasonForRequestToPutOnHold?: string;
}

export class OnHoldArtistByDistrict {
    id?: number;
    userId?: number;
    statusId?: number;
}

export class OnApprovArtistByDistrict {
    id?: number;
    userId?: number;
    statusId?: number;
}


export class ReqToPutOnHoldByPanchayat {
    id?: number;
    userId?: number;
    statusId?: number;
    ReasonForReqToPutOnHoldByPanchayat?: string;
}

export class ReqToRemoveFromHoldToApproved {
    id?: number;
    userId?: number;
    statusId?: number;
    ReasonForApprovedForGetReqToReleaseActionByDistrict?: string;
}

export class ReqToRemoveFromHoldToholdByDistrict {
    id?: number;
    userId?: number;
    statusId?: number;
}

export class DynamicOnHoldArtistByState {
    DistrictId?: number;
    RoleName?: string;
    panchayatName?: string;
}

export class ApprovalForEditByDistrict {
    id?: number;
    userId?: number;
    statusId?: number;
    ReasonForApprovedForEditByDistrict?: string;
}

export class ReqToHoldArtistToHold {
    id?: number;
    userId?: number;
    StatusId?: number;
    ReasonForApprovedForGetReqToHoldActionByDistrict?: string;
}

export class UpdateActiveStatusByState {
    IsActive?: string;
    userId?: number;
}