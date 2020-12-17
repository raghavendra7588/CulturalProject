using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class NewProposalDistrict
    {
        public int id { get; set; }
        public string ArtistSystemCode { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }

        public string DOB { get; set; }
        public string AnnualIncome { get; set; }
        public string ArtType { get; set; }
        public string PeriodOfWork { get; set; }
        public string Grade { get; set; }

        public string Address { get; set; }
        public string Taluka { get; set; }
        public string District { get; set; }
        public string ContactNo1 { get; set; }
        public string ContactNo2 { get; set; }

        public string AadharNo { get; set; }
        public string PanNo { get; set; }
        public string SpouseName { get; set; }

        public string FamilyMemberCount { get; set; }
        public string DependentFamilyMemberCount { get; set; }
        public string Religion { get; set; }
        public string Caste { get; set; }
        public string WorkDetails { get; set; }

        public string ArtLocations { get; set; }


        public string AccountName { get; set; }
        public string AccountNumber { get; set; }


        public string BankName { get; set; }
        public string BankIFSCCode { get; set; }
        public string City { get; set; }

        public int PinCode { get; set; }

        public string Gender { get; set; }

        public string Place { get; set; }

        public string ApplicationDate { get; set; }
        public string FullName { get; set; }

        public int UserId { get; set; }

        public string Status { get; set; }

        public string ReasonForRejection { get; set; }

        public int StatusCode { get; set; }

        public int ApprovedByDistrict { get; set; }

        public int UpdatedBy { get; set; }

    }

    //rsnForRejecctn yes
   // RejectnId  yes
    //rejectnTimeStamp yes

    public class RejectedByDistrict{
        public int id { get; set; }
        public int StatusId { get; set; }
        public int userId { get; set; }
        public string ReasonForRejection { get; set; }

    }

    public class NewProposalDistrictBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();

        public void updateNewProposalDataToDb(NewProposalDistrict objNewProposalDistrict)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_UpdateNewApporvalStatus", conn);
            cmd.CommandType = CommandType.StoredProcedure;


            /*cmd.Parameters.AddWithValue("@ArtistSystemCode", objNewProposalDistrict.ArtistSystemCode);
            cmd.Parameters.AddWithValue("@FirstName", objNewProposalDistrict.FirstName);
            cmd.Parameters.AddWithValue("@MiddleName", objNewProposalDistrict.MiddleName);
            cmd.Parameters.AddWithValue("@LastName", objNewProposalDistrict.LastName);
            cmd.Parameters.AddWithValue("@DOB", objNewProposalDistrict.DOB);

            cmd.Parameters.AddWithValue("@AnnualIncome", objNewProposalDistrict.AnnualIncome);
            cmd.Parameters.AddWithValue("@ArtType", objNewProposalDistrict.ArtType);
            cmd.Parameters.AddWithValue("@PeriodOfWork", objNewProposalDistrict.PeriodOfWork);

            cmd.Parameters.AddWithValue("@Address", objNewProposalDistrict.Address);
            cmd.Parameters.AddWithValue("@Taluka", objNewProposalDistrict.Taluka);

            cmd.Parameters.AddWithValue("@District", objNewProposalDistrict.District);
            cmd.Parameters.AddWithValue("@ContactNo1", objNewProposalDistrict.ContactNo1);
            cmd.Parameters.AddWithValue("@ContactNo2", objNewProposalDistrict.ContactNo2);
            cmd.Parameters.AddWithValue("@AadharNo", objNewProposalDistrict.AadharNo);
            cmd.Parameters.AddWithValue("@PanNo", objNewProposalDistrict.PanNo);
            cmd.Parameters.AddWithValue("@SpouseName", objNewProposalDistrict.SpouseName);

            cmd.Parameters.AddWithValue("@AccountName", objNewProposalDistrict.AccountName);
            cmd.Parameters.AddWithValue("@AccountNumber", objNewProposalDistrict.AccountNumber);
            cmd.Parameters.AddWithValue("@BankName", objNewProposalDistrict.BankName);

            cmd.Parameters.AddWithValue("@BankIFSCCode", objNewProposalDistrict.BankIFSCCode);
            cmd.Parameters.AddWithValue("@City", objNewProposalDistrict.City);

            cmd.Parameters.AddWithValue("@FullName", objNewProposalDistrict.FullName);
            cmd.Parameters.AddWithValue("@PinCode", objNewProposalDistrict.PinCode);
            cmd.Parameters.AddWithValue("@Religion", objNewProposalDistrict.Religion);
            cmd.Parameters.AddWithValue("@Caste", objNewProposalDistrict.Caste);
            cmd.Parameters.AddWithValue("@FamilyMemberCount", objNewProposalDistrict.FamilyMemberCount);
            cmd.Parameters.AddWithValue("@DependentFamilyMemberCount", objNewProposalDistrict.DependentFamilyMemberCount);
            cmd.Parameters.AddWithValue("@Gender", objNewProposalDistrict.Gender);
            cmd.Parameters.AddWithValue("@WorkDetails", objNewProposalDistrict.WorkDetails);
            cmd.Parameters.AddWithValue("@ArtLocations", objNewProposalDistrict.ArtLocations);

            cmd.Parameters.AddWithValue("@Place", objNewProposalDistrict.Place);
            cmd.Parameters.AddWithValue("@ApplicationDate", objNewProposalDistrict.ApplicationDate); */

            // cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(objNewProposalDistrict.UserId));
            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objNewProposalDistrict.id));
            cmd.Parameters.AddWithValue("@Status", objNewProposalDistrict.Status);
            cmd.Parameters.AddWithValue("Grade",objNewProposalDistrict.Grade);
            cmd.Parameters.AddWithValue("@ReasonForRejection", objNewProposalDistrict.ReasonForRejection);
            cmd.Parameters.AddWithValue("@StatusCode",Convert.ToInt32(objNewProposalDistrict.StatusCode));
            cmd.Parameters.AddWithValue("@ApprovedByDistrict", objNewProposalDistrict.ApprovedByDistrict);

            cmd.ExecuteNonQuery();
            conn.Close();
        }

        public void updateRejectedArtistByDistict(RejectedByDistrict objRejectedByDistrict)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_PostRejectArtistByDistrict", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objRejectedByDistrict.id));
            cmd.Parameters.AddWithValue("@StatusId", objRejectedByDistrict.StatusId);
            cmd.Parameters.AddWithValue("@ReasonForRejection", objRejectedByDistrict.ReasonForRejection);
            cmd.Parameters.AddWithValue("@RejectedByDistrict", objRejectedByDistrict.userId);

            cmd.ExecuteNonQuery();
            conn.Close();
        }


    }
}