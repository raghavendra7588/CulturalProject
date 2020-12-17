USE [cultural]
GO
/****** Object:  Table [dbo].[Mst_DistrictMaster]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_DistrictMaster](
	[DistrictId] [int] IDENTITY(1,1) NOT NULL,
	[DistrictName] [varchar](255) NULL,
	[IsActive] [char](1) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedBy] [int] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_Gov_PersonalDetails]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_Gov_PersonalDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ArtistSystemCode] [varchar](255) NULL,
	[FirstName] [varchar](255) NULL,
	[MiddleName] [varchar](255) NULL,
	[LastName] [varchar](255) NULL,
	[DOB] [varchar](255) NULL,
	[AnnualIncome] [varchar](255) NULL,
	[ArtType] [varchar](255) NULL,
	[PeriodOfWork] [varchar](255) NULL,
	[Grade] [varchar](255) NULL,
	[Address] [varchar](255) NULL,
	[Taluka] [varchar](255) NULL,
	[District] [varchar](255) NULL,
	[ContactNo1] [varchar](255) NULL,
	[ContactNo2] [varchar](255) NULL,
	[AadharNo] [varchar](255) NULL,
	[PanNo] [varchar](255) NULL,
	[SpouseName] [varchar](255) NULL,
	[AccountName] [varchar](255) NULL,
	[AccountNumber] [varchar](255) NULL,
	[BankName] [varchar](255) NULL,
	[BankIFSCCode] [varchar](255) NULL,
	[City] [varchar](255) NULL,
	[FilePathDob] [varchar](255) NULL,
	[FilePathMaharashtraResidence] [varchar](255) NULL,
	[FilePathAnnualIncome] [varchar](255) NULL,
	[FileIllHandicaped] [varchar](255) NULL,
	[FilePathGovtRecognisition] [varchar](255) NULL,
	[FilePathCulturalMinistryCertification] [varchar](255) NULL,
	[FilePathSponseredPrograms] [varchar](255) NULL,
	[FilePathCollectorNominatedProgram] [varchar](255) NULL,
	[FilePathIndividualInstitution] [varchar](255) NULL,
	[FilePathGovtBeneficiaryBenefit] [varchar](255) NULL,
	[FilePathmanualForm] [varchar](255) NULL,
	[FilePathNotarisedCertificateOfConfirmation] [varchar](255) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_ProposalForm]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_ProposalForm](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ArtistSystemCode] [varchar](255) NULL,
	[FirstName] [varchar](255) NULL,
	[MiddleName] [varchar](255) NULL,
	[LastName] [varchar](255) NULL,
	[DOB] [varchar](255) NULL,
	[AnnualIncome] [varchar](255) NULL,
	[ArtType] [varchar](255) NULL,
	[PeriodOfWork] [varchar](255) NULL,
	[Address] [varchar](255) NULL,
	[Taluka] [varchar](255) NULL,
	[ContactNo1] [varchar](255) NULL,
	[ContactNo2] [varchar](255) NULL,
	[AadharNo] [varchar](255) NULL,
	[PanNo] [varchar](255) NULL,
	[SpouseName] [varchar](255) NULL,
	[AccountName] [varchar](255) NULL,
	[AccountNumber] [varchar](255) NULL,
	[BankName] [varchar](255) NULL,
	[BankIFSCCode] [varchar](255) NULL,
	[City] [varchar](255) NULL,
	[FullName] [varchar](255) NULL,
	[PinCode] [varchar](255) NULL,
	[Religion] [varchar](255) NULL,
	[Caste] [varchar](255) NULL,
	[FamilyMemberCount] [varchar](255) NULL,
	[DependentFamilyMemberCount] [varchar](255) NULL,
	[Gender] [varchar](255) NULL,
	[WorkDetails] [varchar](255) NULL,
	[ArtLocations] [varchar](255) NULL,
	[Place] [varchar](255) NULL,
	[ApplicationDate] [varchar](255) NULL,
	[createdAt] [datetime] NULL,
	[UserId] [int] NULL,
	[Status] [varchar](255) NULL DEFAULT ('Pending'),
	[Grade] [varchar](255) NULL,
	[CurrentAge] [varchar](255) NULL,
	[ReasonForRejection] [varchar](255) NULL,
	[District] [int] NULL,
	[StatusId] [int] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedAt] [datetime] NULL,
	[ApprovedByDistrict] [int] NULL,
	[ApprovedByDistrictAt] [datetime] NULL,
	[HoldByDistrict] [int] NULL,
	[HoldByDistrictAt] [datetime] NULL,
	[ReqForHoldByPanchayat] [int] NULL,
	[ReqForHoldByPanchayatAt] [datetime] NULL,
	[ReasonForEdit] [varchar](255) NULL DEFAULT (''),
	[ReqToRemoveFromHoldByPanchayat] [int] NOT NULL DEFAULT ((0)),
	[ReqToRemoveFromHoldByPanchayatAt] [datetime] NULL DEFAULT (NULL),
	[ReqForEditByPanchayat] [int] NOT NULL DEFAULT ((0)),
	[ReqForEditByPanchayatAt] [datetime] NULL DEFAULT (NULL),
	[ReasonForReqForHoldByPanchayat] [varchar](255) NULL DEFAULT (''),
	[RejectedByDistrict] [int] NOT NULL DEFAULT ((0)),
	[RejectedByDistrictAT] [datetime] NULL DEFAULT (NULL),
	[ReasonForApprovedForEditByDistrict] [varchar](255) NOT NULL DEFAULT (''),
	[ReasonForApprovedForEditByDistrictBy] [int] NOT NULL DEFAULT ((0)),
	[ReasonForApprovedForEditByDistrictAt] [datetime] NULL DEFAULT (NULL),
	[ReasonForApprovedForGetReqToHoldActionByDistrict] [varchar](255) NOT NULL DEFAULT (''),
	[ReasonForApprovedForGetReqToReleaseActionByDistrict] [varchar](255) NOT NULL DEFAULT (''),
	[ReasonForGetReqToRemoveFromHoldToApprovedByDistrictAt] [datetime] NULL DEFAULT (NULL),
	[ReasonForGetReqToRemoveFromHoldToApprovedByDistrictBy] [int] NOT NULL DEFAULT ((0)),
	[ReasonForApprovedForGetReqToHoldActionByDistrictBy] [int] NOT NULL DEFAULT ((0)),
	[ReasonForApprovedForGetReqToHoldActionByDistrictByAt] [datetime] NULL DEFAULT (NULL),
	[ReasonForReqToPutOnHoldByPanchayat] [varchar](255) NOT NULL DEFAULT ('')
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_RoleMaster]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_RoleMaster](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [varchar](255) NULL,
	[IsActive] [char](1) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[UpdatedBy] [int] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_StatusMaster]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_StatusMaster](
	[StatusId] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [varchar](255) NULL,
	[StatusCode] [varchar](255) NULL,
	[IsActive] [char](1) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_UserMaster]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_UserMaster](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[UserName] [varchar](255) NULL,
	[Password] [varchar](255) NULL DEFAULT ((123456)),
	[MobileNumber] [varchar](255) NULL,
	[EmailId] [varchar](255) NULL,
	[RoleId] [int] NULL,
	[DistrictId] [int] NULL,
	[PanchyatId] [varchar](255) NULL,
	[IsActive] [char](1) NULL DEFAULT ('Y'),
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[CreatedBy] [int] NULL,
	[PinCode] [varchar](255) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[test]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[test](
	[id] [int] NULL,
	[name] [varchar](255) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  StoredProcedure [dbo].[getTest]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getTest]   
AS  
BEGIN  
    Select * From test;      
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_Get_Gov_Personal_Detail]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_Get_Gov_Personal_Detail] AS
BEGIN
	SELECT * 
 	FROM Mst_Gov_PersonalDetails;
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetApprovedList]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetApprovedList] as
BEGIN

	DECLARE @StatusId int;
	SET @StatusId=6;
	DECLARE @StatusName varchar(255);
	SET @StatusName='APPROVED BY DISTRICT';

	SELECT Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName'
 	FROM Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster,Mst_UserMaster  
	where Mst_ProposalForm.StatusId=@StatusId
	and Mst_StatusMaster.StatusName=@StatusName
	and Mst_StatusMaster.StatusId=@StatusId
	and Mst_ProposalForm.StatusId=Mst_StatusMaster.StatusId
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetApprovedListByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetApprovedListByDistrict] (@UserId int) as
BEGIN
DECLARE @StatusId int;
	SET @StatusId=6;
	DECLARE @StatusName varchar(255);
	SET @StatusName='APPROVED BY DISTRICT';

	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	print @DistrictId

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where Mst_DistrictMaster.DistrictId=@DistrictId 
and Mst_ProposalForm.StatusId=@StatusId
 and Mst_StatusMaster.StatusName=@StatusName;
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetApprovedListPanchyat]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetApprovedListPanchyat](@UserId int) as
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=6;
	DECLARE @StatusName varchar(255);
	SET @StatusName='APPROVED BY DISTRICT';

	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	print @DistrictId

	SELECT  Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
 	FROM Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster,Mst_UserMaster
	 where  Mst_ProposalForm.StatusId=@StatusId
	and Mst_StatusMaster.StatusName=@StatusName
	and Mst_DistrictMaster.DistrictId=@DistrictId
	and Mst_UserMaster.UserId=@UserId
	and Mst_ProposalForm.District=@DistrictId;
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetDistrictMasterData]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetDistrictMasterData]
AS
BEGIN

SELECT Mst_DistrictMaster.CreatedBy, Mst_DistrictMaster.UpdatedBy,Mst_DistrictMaster.IsActive, Mst_DistrictMaster.DistrictId ,Mst_DistrictMaster.DistrictName FROM Mst_DistrictMaster 
order by Mst_DistrictMaster.DistrictName;

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetDistrictMasterDataByDistrictId]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetDistrictMasterDataByDistrictId](@DistrictId int)
AS
BEGIN

SELECT Mst_DistrictMaster.CreatedBy, Mst_DistrictMaster.UpdatedBy,Mst_DistrictMaster.IsActive, Mst_DistrictMaster.DistrictId ,Mst_DistrictMaster.DistrictName FROM Mst_DistrictMaster 
where Mst_DistrictMaster.DistrictId=@DistrictId
order by Mst_DistrictMaster.DistrictName;

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetDynamicApprovedListByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetDynamicApprovedListByDistrict] 
(@DistrictId int,
@RoleName varchar(255),
@PanchyatId varchar(255))
AS  
BEGIN  
	
	DECLARE @DistrictName varchar(255);
	SET @DistrictName = (select Mst_DistrictMaster.DistrictName from Mst_DistrictMaster where Mst_DistrictMaster.DistrictId=@DistrictId);
	
	DECLARE @StatusId int;
	SET @StatusId=6;
	DECLARE @StatusName varchar(255);
	SET @StatusName='APPROVED BY DISTRICT';


	
	DECLARE @sqql nvarchar(max);
	
	

	SET @sqql='select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,
	Mst_ProposalForm.DOB,Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,
	Mst_ProposalForm.District,Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,
	Mst_ProposalForm.AccountName,Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,
	Mst_ProposalForm.PinCode,Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,
	Mst_ProposalForm.Gender,Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,
	Mst_ProposalForm.Status,Mst_ProposalForm.Grade,Mst_StatusMaster.StatusName as ''StatusName''
	from Mst_ProposalForm,Mst_DistrictMaster,Mst_RoleMaster,Mst_StatusMaster
	where Mst_RoleMaster.RoleName=''' + @RoleName + '''
	and Mst_StatusMaster.StatusName='''+@StatusName+''' '
	



	IF(@DistrictName != 'ALL' or @DistrictId != 0)
	BEGIN
	SET @sqql=@sqql + 'and Mst_DistrictMaster.DistrictName='''+ @DistrictName + ''' '
	END

	
	IF(@PanchyatId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_ProposalForm.Place='''+ @PanchyatId + ''' '
	END

	IF(@StatusId != 0)
	BEGIN
	SET @sqql=@sqql + 'and Mst_ProposalForm.StatusId='''+ CAST(@StatusId AS NVARCHAR(10)) + ''' '
	END

	IF(@DistrictName != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_ProposalForm.District='''+CAST(@DistrictId AS NVARCHAR(10)) + ''' '
	END

	Execute SP_EXECUTESQL @sqql
END  

GO
/****** Object:  StoredProcedure [dbo].[Mst_GetDynamicHoldListByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetDynamicHoldListByDistrict]
(@DistrictId int,
@RoleName varchar(255),
@PanchyatId varchar(255))
AS  
BEGIN  
	DECLARE @DistrictName varchar(255);
	SET @DistrictName = (select Mst_DistrictMaster.DistrictName from Mst_DistrictMaster where Mst_DistrictMaster.DistrictId=@DistrictId);

	DECLARE @StatusId int;
	SET @StatusId=8	
	DECLARE @StatusName varchar(255);
	SET @StatusName='HOLD BY DISTRICT';


	DECLARE @Rejected varchar(255);
	DECLARE @sqql nvarchar(max);
	SET @Rejected='REJECTED';

	SET @sqql='select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,
	Mst_ProposalForm.DOB,Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,
	Mst_ProposalForm.District,Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,
	Mst_ProposalForm.AccountName,Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,
	Mst_ProposalForm.PinCode,Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,
	Mst_ProposalForm.Gender,Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,
	Mst_ProposalForm.Status,Mst_ProposalForm.Grade,Mst_StatusMaster.StatusName as ''StatusName''
	from Mst_ProposalForm,Mst_DistrictMaster,Mst_RoleMaster,Mst_StatusMaster
	where Mst_RoleMaster.RoleName=''' + @RoleName + '''
	and Mst_StatusMaster.StatusName='''+@StatusName+'''  '
	



	IF(@DistrictName != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_DistrictMaster.DistrictName='''+ @DistrictName + ''' '
	END

	IF(@PanchyatId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_ProposalForm.Place='''+ @PanchyatId + ''' '
	END

	IF(@StatusId != 0)
	BEGIN
	SET @sqql=@sqql + 'and Mst_ProposalForm.StatusId='''+ CAST(@StatusId AS NVARCHAR(10)) + ''' '
	END

	IF(@DistrictName != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_ProposalForm.District='''+CAST(@DistrictId AS NVARCHAR(10)) + ''' '
	END

	Execute SP_EXECUTESQL @sqql
END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetDynamicRejectedListByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetDynamicRejectedListByDistrict] 
(@DistrictId int,
@RoleName varchar(255),
@PanchyatId varchar(255))
AS  
BEGIN  
	DECLARE @DistrictName varchar(255);
	SET @DistrictName = (select Mst_DistrictMaster.DistrictName from Mst_DistrictMaster where Mst_DistrictMaster.DistrictId=@DistrictId);

	DECLARE @StatusId int;
	SET @StatusId=7	
	DECLARE @StatusName varchar(255);
	SET @StatusName='REJECTED BY DISTRICT';


	DECLARE @Rejected varchar(255);
	DECLARE @sqql nvarchar(max);
	SET @Rejected='REJECTED';

	SET @sqql='select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,
	Mst_ProposalForm.DOB,Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,
	Mst_ProposalForm.District,Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,
	Mst_ProposalForm.AccountName,Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,
	Mst_ProposalForm.PinCode,Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,
	Mst_ProposalForm.Gender,Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,
	Mst_ProposalForm.Status,Mst_ProposalForm.Grade,Mst_StatusMaster.StatusName as ''StatusName''
	from Mst_ProposalForm,Mst_DistrictMaster,Mst_RoleMaster,Mst_StatusMaster
	where Mst_RoleMaster.RoleName=''' + @RoleName + ''' 
	and Mst_StatusMaster.StatusName='''+@StatusName+'''  '
	



	IF(@DistrictName != 'ALL' or @DistrictId != 0)
	BEGIN
	SET @sqql=@sqql + 'and Mst_DistrictMaster.DistrictName='''+ @DistrictName + ''' '
	END

	IF(@PanchyatId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_ProposalForm.Place='''+ @PanchyatId + ''' '
	END

	IF(@StatusId != 0)
	BEGIN
	SET @sqql=@sqql + 'and Mst_ProposalForm.StatusId='''+ CAST(@StatusId AS NVARCHAR(10)) + ''' '
	END

	IF(@DistrictName != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_ProposalForm.District='''+CAST(@DistrictId AS NVARCHAR(10)) + ''' '
	END

	Execute SP_EXECUTESQL @sqql
END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetExisitingMemberAlteration]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE  [dbo].[Mst_GetExisitingMemberAlteration](@UserId int)AS
BEGIN
	
	DECLARE @StatusId int;
	SET @StatusId=6;
	DECLARE @StatusName varchar(255);
	SET @StatusName='APPROVED BY DISTRICT';

	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);


	SELECT  Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
 	FROM Mst_ProposalForm,Mst_UserMaster,Mst_StatusMaster,Mst_DistrictMaster
	where Mst_ProposalForm.UserId=@UserId 
	and Mst_UserMaster.DistrictId=@DistrictId
	and Mst_ProposalForm.StatusId=@StatusId
	and Mst_StatusMaster.StatusName=@StatusName
	and Mst_UserMaster.UserId=@UserId;
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetGrade_A_Wise_Data]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetGrade_A_Wise_Data](@UserId int)
AS
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=6;
	DECLARE @StatusName varchar(255);
	SET @StatusName='APPROVED BY DISTRICT';

	
	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	print @DistrictId


select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_ProposalForm.StatusId,Mst_StatusMaster.StatusName as 'StatusName'
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster,Mst_UserMaster 
where Grade='A'
and Mst_ProposalForm.StatusId=@StatusId
and Mst_StatusMaster.StatusName=@StatusName
and Mst_DistrictMaster.DistrictId=@DistrictId
and Mst_UserMaster.UserId=@UserId
and Mst_ProposalForm.District=@DistrictId;

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetGrade_B_Wise_Data]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetGrade_B_Wise_Data](@UserId int)
AS
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=6;
	DECLARE @StatusName varchar(255);
	SET @StatusName='APPROVED BY DISTRICT';

	
	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	print @DistrictId

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_ProposalForm.StatusId,Mst_StatusMaster.StatusName as 'StatusName'
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster,Mst_UserMaster 
where Grade='B'
and Mst_ProposalForm.StatusId=@StatusId
and Mst_StatusMaster.StatusName=@StatusName
and Mst_DistrictMaster.DistrictId=@DistrictId
and Mst_UserMaster.UserId=@UserId
and Mst_ProposalForm.District=@DistrictId;

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetGrade_C_Wise_Data]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetGrade_C_Wise_Data](@UserId int)
AS
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=6;
	DECLARE @StatusName varchar(255);
	SET @StatusName='APPROVED BY DISTRICT';

	
	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	print @DistrictId

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_ProposalForm.StatusId,Mst_StatusMaster.StatusName as 'StatusName'
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster,Mst_UserMaster 
where Grade='C'
and Mst_ProposalForm.StatusId=@StatusId
and Mst_StatusMaster.StatusName=@StatusName
and Mst_DistrictMaster.DistrictId=@DistrictId
and Mst_UserMaster.UserId=@UserId
and Mst_ProposalForm.District=@DistrictId;

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfEditOrHoldByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfEditOrHoldByDistrict](@UserId int)
AS
BEGIN

	DECLARE @StatusId int;
	SET @StatusId=8;
	DECLARE @StatusName varchar(255);
	SET @StatusName='HOLD BY DISTRICT';
	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where Mst_StatusMaster.StatusName=@StatusName
and Mst_ProposalForm.StatusId=@StatusId
and Mst_DistrictMaster.DistrictId=@DistrictId

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfOnHoldMembersAtDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfOnHoldMembersAtDistrict](@UserId int)
AS
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=4;
	DECLARE @StatusName varchar(255);
	SET @StatusName='HOLD BY PANCHAYAT';

	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	print @DistrictId


select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster,Mst_UserMaster
where Mst_ProposalForm.StatusId=@StatusId
and Mst_StatusMaster.StatusName=@StatusName
and Mst_UserMaster.UserId=@UserId
and Mst_DistrictMaster.DistrictId=@DistrictId
and Mst_ProposalForm.District=@DistrictId
and Mst_ProposalForm.District=@DistrictId
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfOnHoldMembersByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfOnHoldMembersByDistrict](@UserId int)
AS
BEGIN

	DECLARE @StatusId int;
	SET @StatusId=8;
	DECLARE @StatusName varchar(255);
	SET @StatusName='HOLD BY DISTRICT';
	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where Mst_StatusMaster.StatusName=@StatusName
and Mst_ProposalForm.StatusId=@StatusId
and Mst_DistrictMaster.DistrictId=@DistrictId

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfOnHoldMembersByPanchayat]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfOnHoldMembersByPanchayat](@UserId int)
AS
BEGIN

	DECLARE @StatusId int;
	SET @StatusId=8;
	DECLARE @StatusName varchar(255);
	SET @StatusName='HOLD BY DISTRICT';
	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where Mst_StatusMaster.StatusName=@StatusName
and Mst_ProposalForm.StatusId=@StatusId
and Mst_DistrictMaster.DistrictId=@DistrictId
and Mst_ProposalForm.UserId=@UserId

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfOnHoldMembersByPanchyat]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfOnHoldMembersByPanchyat](@UserId int)
AS
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=4;
	DECLARE @StatusName varchar(255);
	SET @StatusName='HOLD BY PANCHAYAT';

	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	print @DistrictId


select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster,Mst_UserMaster
where Mst_ProposalForm.StatusId=@StatusId
and Mst_StatusMaster.StatusName=@StatusName
and Mst_UserMaster.UserId=@UserId
and Mst_DistrictMaster.DistrictId=@DistrictId
and Mst_ProposalForm.District=@DistrictId
and Mst_ProposalForm.UserId=@UserId

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfOnHoldMembersByState]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfOnHoldMembersByState]
AS
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=8;
	DECLARE @StatusName varchar(255);
	SET @StatusName='HOLD BY DISTRICT';

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_ProposalForm.StatusId,Mst_StatusMaster.StatusName as 'StatusName'
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where Mst_StatusMaster.StatusName=@StatusName
and Mst_StatusMaster.StatusId=@StatusId
and Mst_ProposalForm.StatusId=@StatusId
and Mst_ProposalForm.StatusId=Mst_StatusMaster.StatusId


END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfRejectedMembersByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfRejectedMembersByDistrict](@UserId int)
AS
BEGIN

	DECLARE @StatusId int;
	SET @StatusId=7;
	DECLARE @StatusName varchar(255);
	SET @StatusName='REJECTED BY DISTRICT';
	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where Mst_StatusMaster.StatusName=@StatusName
and Mst_ProposalForm.StatusId=@StatusId
and Mst_DistrictMaster.DistrictId=@DistrictId

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfRejectedMembersByPanchyat]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfRejectedMembersByPanchyat](@UserId int)
AS
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=7;
	DECLARE @StatusName varchar(255);
	SET @StatusName='REJECTED BY DISTRICT';

	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	print @DistrictId


select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster,Mst_UserMaster
where Mst_ProposalForm.StatusId=@StatusId
and Mst_StatusMaster.StatusName=@StatusName
and Mst_UserMaster.UserId=@UserId
and Mst_DistrictMaster.DistrictId=@DistrictId
and Mst_ProposalForm.District=@DistrictId

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfRejectedMembersByState]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfRejectedMembersByState]
AS
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=7;
	DECLARE @StatusName varchar(255);
	SET @StatusName='REJECTED BY DISTRICT';

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_ProposalForm.StatusId,Mst_StatusMaster.StatusName as 'StatusName'
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where  Mst_StatusMaster.StatusName=@StatusName
and Mst_StatusMaster.StatusId=@StatusId
and Mst_ProposalForm.StatusId=@StatusId 


END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfRequestToPutOnHoldMembersByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfRequestToPutOnHoldMembersByDistrict](@UserId int)
AS
BEGIN

	DECLARE @StatusId int;
	SET @StatusId=14;
	DECLARE @StatusName varchar(255);
	SET @StatusName='REQ TO REMOVE FROM HOLD BY PANCHAYAT';
	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where Mst_StatusMaster.StatusName=@StatusName
and Mst_ProposalForm.StatusId=@StatusId
and Mst_DistrictMaster.DistrictId=@DistrictId

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetListOfRequestToPutOnHoldMembersByPanchayat]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetListOfRequestToPutOnHoldMembersByPanchayat](@UserId int)
AS
BEGIN

	DECLARE @StatusId int;
	SET @StatusId=14;
	DECLARE @StatusName varchar(255);
	SET @StatusName='REQ TO REMOVE FROM HOLD BY PANCHAYAT';
	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where Mst_StatusMaster.StatusName=@StatusName
and Mst_ProposalForm.StatusId=@StatusId
and Mst_DistrictMaster.DistrictId=@DistrictId
and Mst_ProposalForm.UserId=@UserId
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetNewProposalFormDetails]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetNewProposalFormDetails](@UserId int) as
BEGIN
	DECLARE @StatusId int;
	SET @StatusId=5;
	DECLARE @StatusName varchar(255);
	SET @StatusName='PENDING TO DISTRICT';
    DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);

	SELECT Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusName'
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster,Mst_UserMaster 
where Mst_UserMaster.DistrictId=@DistrictId
and Mst_ProposalForm.StatusId=@StatusId
and Mst_StatusMaster.StatusName=@StatusName
and Mst_UserMaster.UserId=@UserId
and Mst_DistrictMaster.DistrictId=@DistrictId;
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetPanchayatListBasedOnDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetPanchayatListBasedOnDistrict]
(@DistrictId int)
AS  
BEGIN   

 select * from Mst_UserMaster as a 
inner join  
(select PanchyatId, min(DistrictId) as id,min(UserId) as UserId from Mst_UserMaster 
group by PanchyatId ) as b 
on a.PanchyatId = b.PanchyatId 
and a.DistrictId=@DistrictId
and a.UserId=b.UserId
and a.UserId !=2
and a.PanchyatId != ''


END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetProposalFormDetails]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE  [dbo].[Mst_GetProposalFormDetails](@UserId int)AS
BEGIN
	DECLARE @DistrictId int;
	DECLARE @StatusId int;
	DECLARE @StatusName varchar(255);
	SET @StatusId=5;
	SET @StatusName='PENDING TO DISTRICT';

	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	
	SELECT  Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_StatusMaster.StatusName as 'StatusName'
 	FROM Mst_ProposalForm,Mst_UserMaster,Mst_StatusMaster
	where Mst_ProposalForm.UserId=@UserId 
	and Mst_ProposalForm.StatusId=@StatusId
	and Mst_StatusMaster.StatusName=@StatusName
	and Mst_UserMaster.DistrictId=@DistrictId;
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetRequestToPutOnHoldListByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetRequestToPutOnHoldListByDistrict] (@UserId int) as
BEGIN
	DECLARE @StatusId int;
	DECLARE @StatusIdEdit int;
	DECLARE @StatusReqToRemoveFromHoldId int; 

	SET @StatusId=13;
	SET @StatusIdEdit=15;
	SET @StatusReqToRemoveFromHoldId=14;


	DECLARE @DistrictId int;
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);
	print @DistrictId

select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusNamee',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_StatusMaster,Mst_DistrictMaster
where Mst_ProposalForm.StatusId=Mst_StatusMaster.StatusId 
and Mst_ProposalForm.StatusId IN (@StatusId,@StatusReqToRemoveFromHoldId,@StatusIdEdit)
and Mst_ProposalForm.District=@DistrictId
and Mst_DistrictMaster.DistrictId=@DistrictId;
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetRequestToPutOnHoldListByPanchayat]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetRequestToPutOnHoldListByPanchayat] (@UserId int) as
BEGIN
	DECLARE @StatusId int;
	DECLARE @StatusIdEdit int;
	DECLARE @StatusReqToRemoveFromHoldId int;
	DECLARE @DistrictId int;

	SET @StatusId=13;
	SET @StatusReqToRemoveFromHoldId=14;
	SET @StatusIdEdit=15;
	
	SET @DistrictId = (select Mst_UserMaster.DistrictId from Mst_UserMaster where Mst_UserMaster.UserId=@UserId);


select Mst_ProposalForm.id,Mst_ProposalForm.ArtistSystemCode,Mst_ProposalForm.FirstName,Mst_ProposalForm.MiddleName,Mst_ProposalForm.LastName,Mst_ProposalForm.DOB,
Mst_ProposalForm.AnnualIncome,Mst_ProposalForm.ArtType,Mst_ProposalForm.PeriodOfWork,Mst_ProposalForm.Address,Mst_ProposalForm.Taluka,Mst_ProposalForm.District,
Mst_ProposalForm.ContactNo1,Mst_ProposalForm.ContactNo2,Mst_ProposalForm.AadharNo,Mst_ProposalForm.PanNo,Mst_ProposalForm.SpouseName,Mst_ProposalForm.AccountName,
Mst_ProposalForm.AccountNumber,Mst_ProposalForm.BankName,Mst_ProposalForm.BankIFSCCode,Mst_ProposalForm.City,Mst_ProposalForm.FullName,Mst_ProposalForm.PinCode,
Mst_ProposalForm.Religion,Mst_ProposalForm.Caste,Mst_ProposalForm.FamilyMemberCount,Mst_ProposalForm.DependentFamilyMemberCount,Mst_ProposalForm.Gender,
Mst_ProposalForm.WorkDetails,Mst_ProposalForm.ArtLocations,Mst_ProposalForm.Place,Mst_ProposalForm.ApplicationDate,Mst_ProposalForm.UserId,Mst_ProposalForm.Status,
Mst_ProposalForm.Grade,Mst_DistrictMaster.DistrictId,Mst_StatusMaster.StatusName as 'StatusNamee',Mst_ProposalForm.StatusId
from Mst_ProposalForm,Mst_DistrictMaster,Mst_StatusMaster
where Mst_ProposalForm.StatusId=Mst_StatusMaster.StatusId 
and Mst_ProposalForm.StatusId IN (@StatusId,@StatusReqToRemoveFromHoldId,@StatusIdEdit)
and Mst_ProposalForm.District=@DistrictId
and Mst_DistrictMaster.DistrictId=@DistrictId
and Mst_ProposalForm.UserId=@UserId;
END 

GO
/****** Object:  StoredProcedure [dbo].[Mst_GetRoleMasterData]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetRoleMasterData](@RoleId int)
AS
BEGIN
DECLARE @RoleName varchar(255);
DECLARE @STATE varchar(255);
DECLARE @ADMIN varchar(255);
DECLARE @DISTRICT varchar(255);
DECLARE @GRAMPANCHAYAT varchar(255);
DECLARE @ADMINID int;
DECLARE @STATEID int;

DECLARE @sqql nvarchar(max);

SET @STATE='STATE';
SET @ADMIN='ADMIN';
SET @DISTRICT='DISTRICT';
SET @GRAMPANCHAYAT='GRAMPANCHAYAT';

SET @ADMINID=1;
SET @STATEID=2;

SET @RoleName=(select RoleName from Mst_RoleMaster where RoleId=@RoleId); 
PRINT @RoleName;
	if(@RoleName ='ADMIN')
	 BEGIN
		SET @sqql='SELECT Mst_RoleMaster.CreatedBy, Mst_RoleMaster.UpdatedBy, Mst_RoleMaster.RoleId ,Mst_RoleMaster.RoleName
		 FROM Mst_RoleMaster where Mst_RoleMaster.RoleName = '''+@STATE+''' '
	 END
	if(@RoleName ='STATE')
	 BEGIN
		SET @sqql='SELECT  Mst_RoleMaster.CreatedBy, Mst_RoleMaster.UpdatedBy, Mst_RoleMaster.RoleId ,Mst_RoleMaster.RoleName FROM Mst_RoleMaster where 
		Mst_RoleMaster.RoleName = '''+@DISTRICT+''' 
		OR Mst_RoleMaster.RoleName = '''+@GRAMPANCHAYAT+''' '
	 END
	 Execute SP_EXECUTESQL @sqql
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetStateUserMasterDataByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetStateUserMasterDataByDistrict]
AS
BEGIN


DECLARE @DistrictName varchar(255);
DECLARE @DistrictRoleId int;


SET @DistrictName='DISTRICT'
SET @DistrictRoleId=3


select  Mst_UserMaster.UserId,Mst_UserMaster.UserName,Mst_UserMaster.Name,Mst_UserMaster.EmailId,Mst_UserMaster.RoleId,Mst_UserMaster.DistrictId,Mst_UserMaster.MobileNumber,
Mst_UserMaster.PanchyatId as 'PanchayatName',Mst_UserMaster.IsActive as 'IsActive',Mst_UserMaster.CreatedDate,Mst_UserMaster.UpdatedDate,Mst_UserMaster.UpdatedBy,Mst_UserMaster.CreatedBy,Mst_RoleMaster.RoleName as 'RoleName',
Mst_UserMaster.PinCode,Mst_DistrictMaster.DistrictName as 'DistrictName'
from Mst_UserMaster,Mst_RoleMaster,Mst_DistrictMaster
where Mst_RoleMaster.RoleId=@DistrictRoleId
and Mst_UserMaster.RoleId=Mst_RoleMaster.RoleId
and Mst_RoleMaster.RoleName=@DistrictName
and  Mst_DistrictMaster.DistrictId=Mst_UserMaster.DistrictId
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetStateUserMasterDataByPanchayat]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetStateUserMasterDataByPanchayat]
AS
BEGIN


DECLARE @PanchayatRoleName varchar(255);
DECLARE @PanchayatRoleId int;


SET @PanchayatRoleName='GRAMPANCHAYAT'
SET @PanchayatRoleId=4

select  Mst_UserMaster.UserId,Mst_UserMaster.UserName,Mst_UserMaster.Name,Mst_UserMaster.EmailId,Mst_UserMaster.RoleId,Mst_UserMaster.DistrictId,Mst_UserMaster.MobileNumber,
Mst_UserMaster.PanchyatId as 'PanchayatName',Mst_UserMaster.IsActive as 'IsActive',Mst_UserMaster.CreatedDate,Mst_UserMaster.UpdatedDate,Mst_UserMaster.UpdatedBy,Mst_UserMaster.CreatedBy,Mst_RoleMaster.RoleName as 'RoleName',
Mst_UserMaster.PinCode,Mst_DistrictMaster.DistrictName as 'DsitrictName'
from Mst_UserMaster,Mst_RoleMaster,Mst_DistrictMaster
where Mst_RoleMaster.RoleId=@PanchayatRoleId
and Mst_UserMaster.RoleId=Mst_RoleMaster.RoleId
and Mst_RoleMaster.RoleName=@PanchayatRoleName
and Mst_DistrictMaster.DistrictId=Mst_UserMaster.DistrictId
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetStateUserMasterDataByState]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetStateUserMasterDataByState]
AS
BEGIN

DECLARE @StateRole int;
DECLARE @StateName varchar(255);
SET @StateRole=2;
SET @StateName='STATE'


select  Mst_UserMaster.UserId,Mst_UserMaster.UserName,Mst_UserMaster.Name,Mst_UserMaster.EmailId,Mst_UserMaster.RoleId,Mst_UserMaster.DistrictId,Mst_UserMaster.MobileNumber,
Mst_UserMaster.PanchyatId,Mst_UserMaster.IsActive as 'IsActive',Mst_UserMaster.CreatedDate,Mst_UserMaster.UpdatedDate,Mst_UserMaster.UpdatedBy,Mst_UserMaster.CreatedBy,Mst_RoleMaster.RoleName as 'RoleName',
Mst_UserMaster.PinCode
from Mst_UserMaster,Mst_RoleMaster
where  Mst_RoleMaster.RoleId=2
and Mst_UserMaster.RoleId=Mst_RoleMaster.RoleId
and Mst_RoleMaster.RoleId=@StateRole
and Mst_RoleMaster.RoleName=@StateName

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetStatusMasterData]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetStatusMasterData]
AS
BEGIN

SELECT * from Mst_StatusMaster

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetUserMasterData]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetUserMasterData](
@RoleId int)
AS
BEGIN
select  Mst_UserMaster.UserId,Mst_UserMaster.UserName,Mst_UserMaster.Name,Mst_UserMaster.EmailId,Mst_UserMaster.RoleId,Mst_UserMaster.DistrictId,Mst_UserMaster.MobileNumber,
Mst_UserMaster.PanchyatId,Mst_UserMaster.IsActive,Mst_UserMaster.CreatedDate,Mst_UserMaster.UpdatedDate,Mst_UserMaster.UpdatedBy,Mst_UserMaster.CreatedBy,Mst_RoleMaster.RoleName as 'RoleName',
Mst_UserMaster.PinCode
from Mst_UserMaster,Mst_RoleMaster
where Mst_UserMaster.RoleId!=1
and Mst_UserMaster.RoleId!=2
and Mst_RoleMaster.RoleId!=2
and Mst_RoleMaster.RoleId!=1
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetUserMasterDataByAdmin]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetUserMasterDataByAdmin]
AS
BEGIN
select  Mst_UserMaster.UserId,Mst_UserMaster.UserName,Mst_UserMaster.Name,Mst_UserMaster.EmailId,Mst_UserMaster.RoleId,Mst_UserMaster.DistrictId,Mst_UserMaster.MobileNumber,
Mst_UserMaster.PanchyatId,Mst_UserMaster.IsActive,Mst_UserMaster.CreatedDate,Mst_UserMaster.UpdatedDate,Mst_UserMaster.UpdatedBy,Mst_UserMaster.CreatedBy,Mst_RoleMaster.RoleName as 'RoleName',
Mst_UserMaster.PinCode
from Mst_UserMaster,Mst_RoleMaster
where Mst_UserMaster.RoleId=2
and Mst_UserMaster.IsActive='Y'
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetUserMasterDataByState]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetUserMasterDataByState](
@RoleId int)
AS
BEGIN
select  Mst_UserMaster.UserId,Mst_UserMaster.UserName,Mst_UserMaster.Name,Mst_UserMaster.EmailId,Mst_UserMaster.RoleId,Mst_UserMaster.DistrictId,Mst_UserMaster.MobileNumber,
Mst_UserMaster.PanchyatId,Mst_UserMaster.IsActive as 'IsActive',Mst_UserMaster.CreatedDate,Mst_UserMaster.UpdatedDate,Mst_UserMaster.UpdatedBy,Mst_UserMaster.CreatedBy,Mst_RoleMaster.RoleName as 'RoleName',
Mst_UserMaster.PinCode
from Mst_UserMaster,Mst_RoleMaster
where Mst_UserMaster.RoleId!=1
and Mst_UserMaster.RoleId!=2
and Mst_RoleMaster.RoleId!=2
and Mst_RoleMaster.RoleId!=1
and Mst_UserMaster.IsActive='Y'
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_InsertGovPersonalDetails]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_InsertGovPersonalDetails](
@ArtistSystemCode varchar(255),
@FirstName varchar(255),
@MiddleName varchar(255),
@LastName varchar(255),
@DOB varchar(255),

@AnnualIncome varchar(255),
@ArtType varchar(255),
@PeriodOfWork varchar(255),
@Grade varchar(255),
@Address varchar(255),

@Taluka varchar(255),
@District varchar(255),
@ContactNo1 varchar(255),
@ContactNo2 varchar(255),
@AadharNo varchar(255),

@PanNo varchar(255),
@SpouseName varchar(255),
@AccountName varchar(255),
@AccountNumber varchar(255),
@BankName varchar(255),
@BankIFSCCode varchar(255),
@City varchar(255)) AS
BEGIN
INSERT INTO Mst_Gov_PersonalDetails(
ArtistSystemCode,FirstName,MiddleName,LastName,DOB,
AnnualIncome,ArtType,PeriodOfWork,Grade,Address,
Taluka,District,ContactNo1,ContactNo2,AadharNo,PanNo,
SpouseName,AccountName,AccountNumber,BankName,BankIFSCCode,City)
VALUES(@ArtistSystemCode,@FirstName,@MiddleName,@LastName,@DOB,
@AnnualIncome,@ArtType,@PeriodOfWork,@Grade,@Address,@Taluka,
@District,@ContactNo1,@ContactNo2,@AadharNo,@PanNo,@SpouseName,
@AccountName,@AccountNumber,@BankName,@BankIFSCCode,@City);
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_InsertProposalForm]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_InsertProposalForm](
@ArtistSystemCode varchar(255),
@FirstName varchar(255),
@MiddleName varchar(255),
@LastName varchar(255),
@DOB varchar(255),

@AnnualIncome varchar(255),
@ArtType varchar(255),
@PeriodOfWork varchar(255),
@Address varchar(255),

@Taluka varchar(255),
@District int,
@ContactNo1 varchar(255),
@ContactNo2 varchar(255),
@AadharNo varchar(255),

@PanNo varchar(255),
@SpouseName varchar(255),
@AccountName varchar(255),
@AccountNumber varchar(255),
@BankName varchar(255),
@BankIFSCCode varchar(255),
@City varchar(255),

@FullName varchar(255),
@PinCode varchar(255),
@Religion varchar(255),
@Caste varchar(255),
@FamilyMemberCount varchar(255),
@DependentFamilyMemberCount varchar(255),
@Gender varchar(255),
@WorkDetails varchar(255),
@ArtLocations varchar(255),
@Place varchar(255),
@ApplicationDate varchar(255),
@UserId int,
@Status varchar(255),
@Grade varchar(255),
@CurrentAge varchar(255),
@ReasonForRejection varchar(255),
@StatusId int,
@CreatedBy int,
@UpdatedBy int,
@ApprovedByDistrict int,
@HoldByDistrict int,
@ReqForHoldByPanchayat int) AS
BEGIN

DECLARE @ApprovedByDistrictAt datetime;
DECLARE @HoldByDistrictAt datetime;
DECLARE @HoldByPanchayatAt datetime;
DECLARE @UpdatedByDate datetime;

SET @ApprovedByDistrictAt=NULL;
SET @HoldByDistrictAt=NULL;
SET @HoldByPanchayatAt=NULL;
SET @UpdatedByDate=NULL;

INSERT INTO Mst_ProposalForm(
ArtistSystemCode,FirstName,MiddleName,LastName,DOB,
AnnualIncome,ArtType,PeriodOfWork,Address,
Taluka,District,ContactNo1,ContactNo2,AadharNo,PanNo,
SpouseName,AccountName,AccountNumber,BankName,BankIFSCCode,City,FullName,PinCode,Religion,Caste,FamilyMemberCount,DependentFamilyMemberCount,Gender,WorkDetails,
ArtLocations,Place,ApplicationDate,createdAt,UserId,Status,Grade,CurrentAge,ReasonForRejection,StatusId,CreatedBy,UpdatedBy,UpdatedAt,
ApprovedByDistrict,HoldByDistrict,ReqForHoldByPanchayat,ApprovedByDistrictAt,HoldByDistrictAt,ReqForHoldByPanchayatAt)
VALUES(@ArtistSystemCode,@FirstName,@MiddleName,@LastName,@DOB,
@AnnualIncome,@ArtType,@PeriodOfWork,@Address,@Taluka,
@District,@ContactNo1,@ContactNo2,@AadharNo,@PanNo,@SpouseName,
@AccountName,@AccountNumber,@BankName,@BankIFSCCode,@City,@FullName,@PinCode,@Religion,@Caste,@FamilyMemberCount,@DependentFamilyMemberCount,
@Gender,@WorkDetails,@ArtLocations,UPPER(@Place),@ApplicationDate,GETDATE(),@UserId,@Status,@Grade,@CurrentAge,@ReasonForRejection,@StatusId,@CreatedBy,
@UpdatedBy,@UpdatedByDate,@ApprovedByDistrict,@HoldByDistrict,@ReqForHoldByPanchayat,@ApprovedByDistrictAt,@HoldByDistrictAt,@HoldByPanchayatAt);
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_InsertUserMaster]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_InsertUserMaster](
@Name VARCHAR(255),
@UserName VARCHAR(255),
@Password VARCHAR(255),

@MobileNumber VARCHAR(255),
@EmailId VARCHAR(255),
@RoleId int,
@DistrictId int,
@PanchyatId VARCHAR(255),
@CreatedBy int,
@UpdatedBy int,
@PinCode varchar(255))

AS
BEGIN
	DECLARE @UpdatedAt datetime;
	SET @UpdatedAt = NULL;

	IF (@RoleId = 2)
	BEGIN

	insert into Mst_UserMaster(Name,UserName,Password,MobileNumber,EmailId,RoleId,DistrictId,PanchyatId,UpdatedBy,CreatedBy,CreatedDate,UpdatedDate,PinCode) VALUES(@Name,@UserName,@Password,@MobileNumber,@EmailId,@RoleId,@DistrictId,@PanchyatId,
	@UpdatedBy,@CreatedBy,GETDATE(),@UpdatedAt,@PinCode);
	END

	ELSE
	BEGIN
	insert into Mst_UserMaster(Name,UserName,Password,MobileNumber,EmailId,RoleId,DistrictId,PanchyatId,
	UpdatedBy,CreatedBy,CreatedDate,UpdatedDate,PinCode) VALUES(@Name,@UserName,@Password,@MobileNumber,@EmailId,@RoleId,@DistrictId,@PanchyatId,@UpdatedBy,@CreatedBy,GETDATE(),@UpdatedAt,@PinCode);
	END

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_Login]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_Login](
@UserName varchar(255),
@Password varchar(255)) AS
BEGIN
	DECLARE @uname varchar(255);
	DECLARE @pswrd varchar(255);
	DECLARE @sqql nvarchar(max);


	SET @uname=@UserName;
	SET @pswrd=@Password;

	if EXISTS(select Mst_UserMaster.RoleId from Mst_UserMaster where Mst_UserMaster.UserName=@uname and Mst_UserMaster.Password=@pswrd)
	BEGIN
			SET @sqql='select top 1 Mst_RoleMaster.RoleName,Mst_UserMaster.UserId, Mst_RoleMaster.RoleId,Mst_UserMaster.IsActive,Mst_UserMaster.Name,Mst_UserMaster.UserName,
			Mst_UserMaster.MobileNumber,Mst_UserMaster.EmailId,Mst_UserMaster.DistrictId,Mst_UserMaster.PanchyatId
						from Mst_UserMaster,Mst_RoleMaster 
						where Mst_RoleMaster.RoleId = Mst_UserMaster.RoleId
						and Mst_UserMaster.UserName= '''+@uname+ '''
						and Mst_UserMaster.Password= '''+@pswrd+''' '
	END
	ELSE
	BEGIN
	SET @sqql='Incorrect Login Credentials'
	END
	Execute SP_EXECUTESQL @sqql
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_OnHoldAtByPanchayat]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_OnHoldAtByPanchayat](
@id int,
@StatusId int,
@ReqForHoldByPanchayat int,
@ReasonForReqForHoldByPanchayat varchar(255)) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[StatusId]=@StatusId,
	[ReqForHoldByPanchayat]=@ReqForHoldByPanchayat,
	[ReqForHoldByPanchayatAt]=GETDATE(),
	[ReasonForReqForHoldByPanchayat]=@ReasonForReqForHoldByPanchayat
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_PostActiveStatusToUserMaster]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_PostActiveStatusToUserMaster](
@UserId int,
@IsActive char(1)) AS
BEGIN
UPDATE Mst_UserMaster
   SET 
	[IsActive]=@IsActive
 WHERE UserId=@UserId;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_PostApprovedToEditByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_PostApprovedToEditByDistrict](
@id int,
@StatusId int,
@ReasonForApprovedForEditByDistrict varchar(255),
@ReasonForApprovedForEditByDistrictBy int) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[StatusId]=@StatusId,
	[ReasonForApprovedForEditByDistrict]=@ReasonForApprovedForEditByDistrict,
	[ReasonForApprovedForEditByDistrictBy]=@ReasonForApprovedForEditByDistrictBy,
	[ReasonForApprovedForEditByDistrictAt]=GETDATE()
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_PostArtistOnApprovedByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_PostArtistOnApprovedByDistrict](
@id int,
@StatusId int,
@ApprovedByDistrict int) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[StatusId]=@StatusId,
	[ApprovedByDistrict]=@ApprovedByDistrict,
	[ApprovedByDistrictAt]=GETDATE()
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_PostArtistOnHoldByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_PostArtistOnHoldByDistrict](
@id int,
@StatusId int,
@HoldByDistrict int) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[StatusId]=@StatusId,
	[HoldByDistrict]=@HoldByDistrict,
	[HoldByDistrictAt]=GETDATE()
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_PostRejectArtistByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_PostRejectArtistByDistrict](
@id int,
@StatusId int,
@ReasonForRejection varchar(255),
@RejectedByDistrict int) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[StatusId]=@StatusId,
	[ReasonForRejection]=@ReasonForRejection,
	[RejectedByDistrict]=@RejectedByDistrict,
	[RejectedByDistrictAT]=GETDATE()
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_ReqForHoldToHoldByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_ReqForHoldToHoldByDistrict](
@id int,
@StatusId int,
@ReasonForApprovedForGetReqToHoldActionByDistrictBy int,
@ReasonForApprovedForGetReqToHoldActionByDistrict varchar(255)) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[StatusId]=@StatusId,
	[ReasonForApprovedForGetReqToHoldActionByDistrictBy]=@ReasonForApprovedForGetReqToHoldActionByDistrictBy,
	[ReasonForApprovedForGetReqToHoldActionByDistrictByAt]=GETDATE(),
	[ReasonForApprovedForGetReqToHoldActionByDistrict]=@ReasonForApprovedForGetReqToHoldActionByDistrict
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_ReqHoldToApprovedByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_ReqHoldToApprovedByDistrict](
@id int,
@StatusId int,
@ReasonForGetReqToRemoveFromHoldToApprovedByDistrictBy int,
@ReasonForApprovedForGetReqToReleaseActionByDistrict varchar(255)) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[StatusId]=@StatusId,
	[ReasonForGetReqToRemoveFromHoldToApprovedByDistrictBy]=@ReasonForGetReqToRemoveFromHoldToApprovedByDistrictBy,
	[ReasonForGetReqToRemoveFromHoldToApprovedByDistrictAt]=GETDATE(),
	[ReasonForApprovedForGetReqToReleaseActionByDistrict]=@ReasonForApprovedForGetReqToReleaseActionByDistrict
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_ReqHoldToHoldByDistrict]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_ReqHoldToHoldByDistrict](
@id int,
@StatusId int,
@HoldByDistrict int) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[StatusId]=@StatusId,
	[HoldByDistrict]=@HoldByDistrict,
	[HoldByDistrictAt]=GETDATE()
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_ReqToRemoveFromHoldByPanchayat]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_ReqToRemoveFromHoldByPanchayat](
@id int,
@StatusId int,
@ReqToRemoveFromHoldByPanchayat int,
@ReasonForReqToPutOnHoldByPanchayat varchar(255)) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[StatusId]=@StatusId,
	[ReqToRemoveFromHoldByPanchayat]=@ReqToRemoveFromHoldByPanchayat,
	[ReqToRemoveFromHoldByPanchayatAt]=GETDATE(),
	[ReasonForReqToPutOnHoldByPanchayat]=@ReasonForReqToPutOnHoldByPanchayat
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_update_Gov_Personal_Detail]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_update_Gov_Personal_Detail](
	@id INT,
	@ArtistSystemCode varchar(255),
	@FirstName varchar(255),
	@MiddleName varchar(255),
	@LastName varchar(255),
	@DOB varchar(255),
	@AnnualIncome varchar(255),
	@ArtType varchar(255),
	@PeriodOfWork varchar(255),
	@Address varchar(255),
	@Taluka varchar(255),
	@District int,
	@ContactNo1 varchar(255),
	@ContactNo2 varchar(255),
	@AadharNo varchar(255),
	@PanNo varchar(255),
	@SpouseName varchar(255),
	@AccountName varchar(255),
	@AccountNumber varchar(255),
	@BankName varchar(255),
	@BankIFSCCode varchar(255),
	@City varchar(255),
	@FullName varchar(255),
@PinCode varchar(255),
@Religion varchar(255),
@Caste varchar(255),
@FamilyMemberCount varchar(255),
@DependentFamilyMemberCount varchar(255),
@Gender varchar(255),
@WorkDetails varchar(255),
@ArtLocations varchar(255),
@Place varchar(255),
@ApplicationDate varchar(255),
@UserId int,
@CurrentAge varchar(255),
@Status varchar(255),
@ReasonForRejection varchar(255),
@StatusId int,
@UpdatedBy int,
@ReasonForEdit varchar(255),
@ReqForEditByPanchayat int) AS
BEGIN
UPDATE Mst_ProposalForm
   SET [ArtistSystemCode]=@ArtistSystemCode,
	[FirstName]=@FirstName,
	[MiddleName]=@MiddleName,
	[LastName]=@LastName,
	[DOB]=@DOB,
	[AnnualIncome]=@AnnualIncome,
	[ArtType]=@ArtType,
	[PeriodOfWork]=@PeriodOfWork,
	[Address]=@Address,
	[Taluka]=@Taluka,
	[District]=@District,
	[ContactNo1]=@ContactNo1,
	[ContactNo2]=@ContactNo2,
	[AadharNo]=@AadharNo,
	[PanNo]=@PanNo,
	[SpouseName]=@SpouseName,
	[AccountName]=@AccountName,
	[AccountNumber]=@AccountNumber,
	[BankName]=@BankName,
	[BankIFSCCode]=@BankIFSCCode,
	[City]=@City,
	[FullName]=@FullName,
	[PinCode]=@PinCode,
	[Religion]=@Religion,
	[Caste]=@Caste,
	[FamilyMemberCount]=@FamilyMemberCount,
	[DependentFamilyMemberCount]=@DependentFamilyMemberCount,
	[Gender]=@Gender,
	[WorkDetails]=@WorkDetails,
	[ArtLocations]=@ArtLocations,
	[Place]=@Place,
	[ApplicationDate]=@ApplicationDate,
	[UserId]=@UserId,
	[CurrentAge]=@CurrentAge,
	[Status]=@Status,
	[ReasonForRejection]=@ReasonForRejection,
	[StatusId]=@StatusId,
	[UpdatedBy]=@UpdatedBy,
	[UpdatedAt]=GETDATE(),
	[ReasonForEdit]=@ReasonForEdit,
	[ReqForEditByPanchayat]=@ReqForEditByPanchayat,
	[ReqForEditByPanchayatAt]=GETDATE()
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_UpdateNewApporvalStatus]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_UpdateNewApporvalStatus](
	@id INT,
	@Status varchar(255),
	@Grade varchar(255),
	@ReasonForRejection varchar(255),
	@StatusCode int,
	@ApprovedByDistrict int) AS
BEGIN
UPDATE Mst_ProposalForm
   SET 
	[Status]=@Status,
	[Grade]=@Grade,
	[ReasonForRejection]=@ReasonForRejection,
	[StatusId]=@StatusCode,
	[ApprovedByDistrict]=@ApprovedByDistrict,
	[ApprovedByDistrictAt]=GETDATE()
 WHERE id=@id;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_UpdateUserMaster]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_UpdateUserMaster](
	@UserId INT,
	@Name varchar(255),
	@UserName varchar(255),
	@Password varchar(255),
	@MobileNumber varchar(255),
	@EmailId varchar(255),
	@RoleId INT,
	@DistrictId INT,
	@PanchyatId varchar(255),
	@IsActive char(1),
	@PinCode varchar(255)) AS
BEGIN
UPDATE Mst_UserMaster
   SET [Name]=@Name,
	[UserName]=@UserName,
	[Password]=@Password,
	[MobileNumber]=@MobileNumber,
	[EmailId]=@EmailId,

	[RoleId]=@RoleId,
	[DistrictId]=@DistrictId,
	[PanchyatId]=@PanchyatId,
	[IsActive]=@IsActive,
	[PinCode]=@PinCode

 WHERE UserId=@UserId;
 END
GO
/****** Object:  StoredProcedure [dbo].[Mst_UpdateUserMasterStateUser]    Script Date: 18-12-2020 01:17:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_UpdateUserMasterStateUser](
@UserId int,
@Name VARCHAR(255),
@UserName VARCHAR(255),

@MobileNumber VARCHAR(255),
@EmailId VARCHAR(255),
@RoleId int,

@DistrictId int,
@PanchyatId VARCHAR(255),
@PinCode VARCHAR(255),
@UpdatedBy int) AS
BEGIN
UPDATE Mst_UserMaster
   SET 
	[Name]=@Name,
	[UserName]=@UserName,
	[MobileNumber]=@MobileNumber,
	[EmailId]=@EmailId,
	[RoleId]=@RoleId,
	[DistrictId]=@DistrictId,
	[PanchyatId]=@PanchyatId,
	[PinCode]=@PinCode,
	[UpdatedBy]=@UpdatedBy,
	[UpdatedDate]=GETDATE()
 WHERE UserId=@UserId;
 END
GO
