using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class ApprovedList
    {
        public int DistrictId { get; set; }
    }

    public class ApprovedListBL
    {
      
            string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();

            public DataTable getAllData()
            {
                SqlCommand command = new SqlCommand();
                SqlConnection conn = new SqlConnection(strConn);
                command.Connection = conn;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "Mst_GetApprovedList";
             
                SqlDataAdapter adapter = new SqlDataAdapter(command);
                conn.Open();

                DataSet fileData = new DataSet();
                adapter.Fill(fileData, "fileData");
                conn.Close();
                DataTable firstTable = fileData.Tables[0];
                return firstTable;

            }

        


         public DataTable getApprovedListByDistrict(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetApprovedListByDistrict";
            command.Parameters.AddWithValue("@UserId", id);
                SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }


        public DataTable getApprovedListPanchayatData(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetApprovedListPanchyat";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }



        public DataTable createProposalFormData(DataTable dt)
        {
            DataTable table = new DataTable();

            table.Columns.Add("id", typeof(int));
            table.Columns.Add("ArtistSystemCode", typeof(string));
            table.Columns.Add("FirstName", typeof(string));


            table.Columns.Add("MiddleName", typeof(string));
            table.Columns.Add("LastName", typeof(string));
            table.Columns.Add("DOB", typeof(string));

            table.Columns.Add("AnnualIncome", typeof(string));
            table.Columns.Add("ArtType", typeof(string));
            table.Columns.Add("PeriodOfWork", typeof(string));

            table.Columns.Add("Address", typeof(string));
            table.Columns.Add("Taluka", typeof(string));
            table.Columns.Add("ContactNo1", typeof(string));


            table.Columns.Add("ContactNo2", typeof(string));
            table.Columns.Add("AadharNo", typeof(string));
            table.Columns.Add("PanNo", typeof(string));

            table.Columns.Add("SpouseName", typeof(string));
            table.Columns.Add("AccountName", typeof(string));
            table.Columns.Add("AccountNumber", typeof(string));


            table.Columns.Add("BankName", typeof(string));
            table.Columns.Add("BankIFSCCode", typeof(string));
            table.Columns.Add("City", typeof(string));

            table.Columns.Add("BankName", typeof(string));
            table.Columns.Add("FullName", typeof(string));
            table.Columns.Add("PinCode", typeof(string));

            table.Columns.Add("Religion", typeof(string));
            table.Columns.Add("Caste", typeof(string));
            table.Columns.Add("FamilyMemberCount", typeof(string));

            table.Columns.Add("DependentFamilyMemberCount", typeof(string));
            table.Columns.Add("Gender", typeof(string));
            table.Columns.Add("WorkDetails", typeof(string));

            table.Columns.Add("ArtLocations", typeof(string));
            table.Columns.Add("Place", typeof(string));
            table.Columns.Add("ApplicationDate", typeof(string));

            table.Columns.Add("createdAt", typeof(DateTime));
            table.Columns.Add("UserId", typeof(int));
            table.Columns.Add("Status", typeof(string));

            table.Columns.Add("Grade", typeof(string));
            table.Columns.Add("CurrentAge", typeof(string));
            table.Columns.Add("ReasonForRejection", typeof(string));

            table.Columns.Add("District", typeof(int));
            table.Columns.Add("StatusId", typeof(int));
            table.Columns.Add("CreatedBy", typeof(int));

            table.Columns.Add("UpdatedBy", typeof(int));
            table.Columns.Add("UpdatedAt", typeof(DateTime));
            table.Columns.Add("ApprovedByDistrict", typeof(int));

            table.Columns.Add("ApprovedByDistrictAt", typeof(DateTime));
            table.Columns.Add("HoldByDistrict", typeof(int));
            table.Columns.Add("HoldByDistrictAt", typeof(DateTime));

            table.Columns.Add("ReqForHoldByPanchayat", typeof(int));
            table.Columns.Add("ReqForHoldByPanchayatAt", typeof(DateTime));
            table.Columns.Add("ReasonForEdit", typeof(string));

            table.Columns.Add("ReqToRemoveFromHoldByPanchayat", typeof(int));
            table.Columns.Add("ReqToRemoveFromHoldByPanchayatAt", typeof(DateTime));
            table.Columns.Add("ReqForEditByPanchayat", typeof(int));

            table.Columns.Add("ReqForEditByPanchayatAt", typeof(DateTime));
            table.Columns.Add("ReasonForReqForHoldByPanchayat", typeof(string));
            table.Columns.Add("RejectedByDistrict", typeof(int));

            table.Columns.Add("RejectedByDistrictAT", typeof(DateTime));
            table.Columns.Add("ReasonForApprovedForEditByDistrict", typeof(string));
            table.Columns.Add("ReasonForApprovedForEditByDistrictBy", typeof(int));


            table.Columns.Add("ReasonForApprovedForEditByDistrictAt", typeof(DateTime));
            table.Columns.Add("ReasonForApprovedForGetReqToHoldActionByDistrict", typeof(string));
            table.Columns.Add("ReasonForApprovedForGetReqToReleaseActionByDistrict", typeof(string));

            table.Columns.Add("ReasonForGetReqToRemoveFromHoldToApprovedByDistrictAt", typeof(DateTime));
            table.Columns.Add("ReasonForGetReqToRemoveFromHoldToApprovedByDistrictBy", typeof(int));
            table.Columns.Add("ReasonForApprovedForGetReqToHoldActionByDistrictBy", typeof(int));

            table.Columns.Add("ReasonForApprovedForGetReqToHoldActionByDistrictByAt", typeof(DateTime));
            table.Columns.Add("ReasonForReqToPutOnHoldByPanchayat", typeof(string));

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                int statusId = Convert.ToInt32(dt.Rows[i]["StatusId"]);

                for (int j = 0; j < dt.Rows.Count; j++)
                {
                    if (statusId == Convert.ToInt32(dt.Rows[j]["StatusId"]) && statusId == 5)
                    {
                        // return  createdAt UserId CreatedBy
                    }
                    if (statusId == Convert.ToInt32(dt.Rows[j]["StatusId"]) && statusId == 6)
                    {
                        // return  ApprovedByDistrict ApprovedByDistrictAt
                    }

                    if (statusId == Convert.ToInt32(dt.Rows[j]["StatusId"]) && statusId == 7)
                    {
                        // return RejectedByDistrict  RejectedByDistrictAT
                    }

                    if (statusId == Convert.ToInt32(dt.Rows[j]["StatusId"]) && statusId == 8)
                    {
                        // return HoldByDistrict  HoldByDistrictAt
                    }

                    if (statusId == Convert.ToInt32(dt.Rows[j]["StatusId"]) && statusId == 13)
                    {
                        // return ReqForHoldByPanchayat  ReqForHoldByPanchayatAt
                    }

                    if (statusId == Convert.ToInt32(dt.Rows[j]["StatusId"]) && statusId == 14)
                    {
                        // return ReqToRemoveFromHoldByPanchayat  ReqToRemoveFromHoldByPanchayatAt
                    }

                    if (statusId == Convert.ToInt32(dt.Rows[j]["StatusId"]) && statusId == 15)
                    {
                        // return  ReasonForApprovedForEditByDistrictBy ReasonForApprovedForEditByDistrictAt  
                    }
                }

            }

            return table;
        }
    }
}