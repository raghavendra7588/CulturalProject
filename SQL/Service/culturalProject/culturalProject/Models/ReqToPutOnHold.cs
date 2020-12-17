using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class ReqToPutOnHold
    {
        public int id { get; set; }
        public int StatusId { get; set; }
        public int userId { get; set; }
        public string ReasonForApprovedForGetReqToHoldActionByDistrict { get; set; }
    }
    public class ReqToPutOnHoldBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();

        public DataTable getReqToPutOnHoldMembersByDistrict(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetRequestToPutOnHoldListByDistrict";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        public DataTable getReqToPutOnHoldMembersByPanchayat(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetRequestToPutOnHoldListByPanchayat";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }
   

    public void updateOnHoldByDistict(ReqToPutOnHold objReqToPutOnHold)
    {
        SqlConnection conn = new SqlConnection(strConn);
        conn.Open();
        SqlCommand cmd = new SqlCommand("Mst_ReqForHoldToHoldByDistrict", conn);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objReqToPutOnHold.id));
        cmd.Parameters.AddWithValue("@StatusId", objReqToPutOnHold.StatusId);
        cmd.Parameters.AddWithValue("@ReasonForApprovedForGetReqToHoldActionByDistrictBy", objReqToPutOnHold.userId);
        cmd.Parameters.AddWithValue("@ReasonForApprovedForGetReqToHoldActionByDistrict", objReqToPutOnHold.ReasonForApprovedForGetReqToHoldActionByDistrict);
        cmd.ExecuteNonQuery();
        conn.Close();
    }

    }
}