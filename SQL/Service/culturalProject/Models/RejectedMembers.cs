using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{

    public class RejectedMembersBL
    {
        public string PanchayatName { get; set; }
    }

    public class RejectedMembers
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();



        public DataTable getRejectedMembersDataByDistrict(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfRejectedMembersByDistrict";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }
        
     public DataTable getRejectedMembersDataByState()
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfRejectedMembersByState";
       
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        
        

        public DataTable getRejectedMembersDataByPanchyatName(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfRejectedMembersByPanchyat";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }


        public DataTable getALLRejectedMembersDataByState()
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfRejectedMembersByState";

            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }
    }
}