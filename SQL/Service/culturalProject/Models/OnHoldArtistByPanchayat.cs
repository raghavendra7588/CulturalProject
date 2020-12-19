using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class OnHoldArtistByPanchayat
    {
        public int id { get; set; }
        public int StatusId { get; set; }
        public int UpdatedBy { get; set; }
        public int userId { get; set; }
        public string ReasonForRequestToPutOnHold { get; set; }

    }

    public class OnHoldArtistByPanchayatBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();



        public DataTable getOnHoldMembersAtPanchayat(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfOnHoldMembersByPanchyat";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        public DataTable getOnHoldMembersAtDistrictData(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfOnHoldMembersAtDistrict";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }





        public void updateOnHoldToPanchayat(OnHoldArtistByPanchayat objOnHoldArtistByPanchayat)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_OnHoldAtByPanchayat", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objOnHoldArtistByPanchayat.id));
            cmd.Parameters.AddWithValue("@StatusId", objOnHoldArtistByPanchayat.StatusId);
            cmd.Parameters.AddWithValue("@ReqForHoldByPanchayat", objOnHoldArtistByPanchayat.userId);
            cmd.Parameters.AddWithValue("@ReasonForReqForHoldByPanchayat", objOnHoldArtistByPanchayat.ReasonForRequestToPutOnHold);
            cmd.ExecuteNonQuery();
            conn.Close();
        }
    }
}