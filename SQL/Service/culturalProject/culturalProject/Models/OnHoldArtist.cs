using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class OnHoldArtist
    {
        public int id { get; set; }
        public int StatusId { get; set; }
        public int HoldByDistrict { get; set; }

        public int userId { get; set; }
    }

    public class OnApprvoedArtist
    {
        public int id { get; set; }
        public int StatusId { get; set; }
        public int @ApprovedByDistrict { get; set; }

    }
    public class OnHoldArtistAtState
    {

        public int DistrictId { get; set; }

        public string RoleName { get; set; }
    }



    public class OnHoldArtistBL
    {

        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();
        public DataTable getOnHoldMembersAtDistrictData(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfOnHoldMembersByDistrict";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        public DataTable getOnHoldMembersAtPanchayat(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfOnHoldMembersByPanchayat";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        
          public DataTable getOnHoldMembersAtState()
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfOnHoldMembersByState";
           // command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        public void updateOnHoldToDistict(OnHoldArtist objOnHoldArtist)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_PostArtistOnHoldByDistrict", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objOnHoldArtist.id));
            cmd.Parameters.AddWithValue("@StatusId", objOnHoldArtist.StatusId);
            cmd.Parameters.AddWithValue("@HoldByDistrict", objOnHoldArtist.userId);
            cmd.ExecuteNonQuery();
            conn.Close();
        }

        public void updateOnAppprovedToDistict(OnApprvoedArtist objOnApprvoedArtist)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_PostArtistOnApprovedByDistrict", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objOnApprvoedArtist.id));
            cmd.Parameters.AddWithValue("@StatusId", objOnApprvoedArtist.StatusId);
            cmd.Parameters.AddWithValue("@ApprovedByDistrict", objOnApprvoedArtist.ApprovedByDistrict);
            cmd.ExecuteNonQuery();
            conn.Close();
        }



        public DataTable postOnHoldListToDb(OnHoldArtistAtState objOnHoldArtistAtState)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_GetDynamicHoldListByDistrict", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@DistrictId", objOnHoldArtistAtState.DistrictId);
            cmd.Parameters.AddWithValue("@RoleName", objOnHoldArtistAtState.RoleName);

            SqlDataAdapter adapter = new SqlDataAdapter(cmd);

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;
        }
    }
}