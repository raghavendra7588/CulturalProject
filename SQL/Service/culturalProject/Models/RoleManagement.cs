using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class RoleManagement
    {
        public int UserId { get; set; }
        public string IsActive { get; set; }
        public string ActiveStatus { get; set; }
    }

    public class RoleManagementBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();



        public DataTable getStateUserMasterDataForState()
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetStateUserMasterDataByState";
         
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        public DataTable getStateUserMasterDataForDistrict()
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetStateUserMasterDataByDistrict";
          
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        public DataTable getStateUserMasterDataForPanchayat()
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetStateUserMasterDataByPanchayat";

            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        public void updateActiveStatus(RoleManagement objRoleManagement)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_PostActiveStatusToUserMaster", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(objRoleManagement.UserId));
            cmd.Parameters.AddWithValue("@IsActive", objRoleManagement.IsActive);
            cmd.Parameters.AddWithValue("@ActiveStatus", objRoleManagement.ActiveStatus);
            cmd.ExecuteNonQuery();
            conn.Close();
        }
    }
}