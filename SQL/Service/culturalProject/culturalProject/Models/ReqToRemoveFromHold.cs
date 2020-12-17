using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class ReqToRemoveFromHold
    {
        public int id { get; set; }
        public int StatusId { get; set; }
        public int ReqToRemoveFromHoldByPanchayat { get; set; }
        public int userId { get; set; }
        public string ReasonForReqToPutOnHoldByPanchayat { get; set; }
    }

    public class RemoveFromHoldToApproved
    {
        public int id { get; set; }
        public int StatusId { get; set; }
        public int ApprovedByDistrict { get; set; }
        public int userId { get; set; }
        public string ReasonForApprovedForGetReqToReleaseActionByDistrict { get; set; }
    }


    public class ReqFromHoldToHold
    {
        public int id { get; set; }
        public int StatusId { get; set; }
        public int HoldByDistrict { get; set; }
        public int userId { get; set; }
    }

    public class ReqToRemoveFromHoldBL
    {

        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();
        


        public DataTable getRemoveFromHoldMembersAtDistrict(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfRequestToPutOnHoldMembersByDistrict";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        

       public DataTable getRemoveFromHoldMembersAtPanchayat(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfRequestToPutOnHoldMembersByPanchayat";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }
        

        public void updateReqToRemoveFromHoldByPanchayat(ReqToRemoveFromHold objReqToRemoveFromHold)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_ReqToRemoveFromHoldByPanchayat", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objReqToRemoveFromHold.id));
            cmd.Parameters.AddWithValue("@StatusId", objReqToRemoveFromHold.StatusId);
            cmd.Parameters.AddWithValue("@ReqToRemoveFromHoldByPanchayat", objReqToRemoveFromHold.userId);
            cmd.Parameters.AddWithValue("@ReasonForReqToPutOnHoldByPanchayat", objReqToRemoveFromHold.ReasonForReqToPutOnHoldByPanchayat);

            cmd.ExecuteNonQuery();
            conn.Close();
        }


        public void updateReqToRemoveFromHoldToApprovedByDistrict(RemoveFromHoldToApproved objRemoveFromHoldToApproved)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_ReqHoldToApprovedByDistrict", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objRemoveFromHoldToApproved.id));
            cmd.Parameters.AddWithValue("@StatusId", objRemoveFromHoldToApproved.StatusId);
            cmd.Parameters.AddWithValue("@ReasonForGetReqToRemoveFromHoldToApprovedByDistrictBy", objRemoveFromHoldToApproved.userId);
           
            cmd.Parameters.AddWithValue("@ReasonForApprovedForGetReqToReleaseActionByDistrict", objRemoveFromHoldToApproved.ReasonForApprovedForGetReqToReleaseActionByDistrict);
            cmd.ExecuteNonQuery();
            conn.Close();
        }


        public void updateReqToRemoveFromHoldToHoldByDistrict(ReqFromHoldToHold objReqFromHoldToHold)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_ReqHoldToHoldByDistrict", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objReqFromHoldToHold.id));
            cmd.Parameters.AddWithValue("@StatusId", objReqFromHoldToHold.StatusId);
            cmd.Parameters.AddWithValue("@HoldByDistrict", objReqFromHoldToHold.userId);
            cmd.ExecuteNonQuery();
            conn.Close();
        }
    }
}