using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class DynamicActionByState
    {
        public string DistrictName { get; set; }
        public int DistrictId { get; set; }

        public string RoleName { get; set; }

        public string PanchayatName { get; set; }
    }


    public class DynamicActionRoleDistrict
    {
        public int DistrictId { get; set; }
        public string RoleName { get; set; }
    }
    public class DynamicActionRolePanchayat
    {
        public int DistrictId { get; set; }
        public string PanchayatName { get; set; }
    }


    public class DynamicActionByStateBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();
        public DataTable postDynamicNewProposalByState(DynamicActionByState objDynamicActionByState)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_GetDynamicNewApprovalsByState", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@DistrictId", objDynamicActionByState.DistrictId);
            cmd.Parameters.AddWithValue("@RoleName", objDynamicActionByState.RoleName);
            cmd.Parameters.AddWithValue("@PanchyatId", objDynamicActionByState.PanchayatName);

            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;
        }

        public DataTable postDynamicReqToPutOnHoldByState(DynamicActionByState objDynamicActionByState)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_postDynamicReqToPutOnHoldByState", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@DistrictId", objDynamicActionByState.DistrictId);
            cmd.Parameters.AddWithValue("@RoleName", objDynamicActionByState.RoleName);
            cmd.Parameters.AddWithValue("@PanchyatId", objDynamicActionByState.PanchayatName);

            SqlDataAdapter adapter = new SqlDataAdapter(cmd);

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;
        }

        public DataTable postDynamicRoleByDistrict(DynamicActionRoleDistrict objDynamicActionRoleDistrict)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_DynamicStateRoleDistrictData", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@DistrictId", objDynamicActionRoleDistrict.DistrictId);
            cmd.Parameters.AddWithValue("@RoleName", objDynamicActionRoleDistrict.RoleName);
         
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;
        }

        public DataTable postDynamicRoleByPanchayat(DynamicActionRolePanchayat objDynamicActionRolePanchayat)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_DynamicStateRolePanchayatData", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@DistrictId", objDynamicActionRolePanchayat.DistrictId);
            cmd.Parameters.AddWithValue("@PanchayatId", objDynamicActionRolePanchayat.PanchayatName);

            SqlDataAdapter adapter = new SqlDataAdapter(cmd);

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;
        }
    }

 
}