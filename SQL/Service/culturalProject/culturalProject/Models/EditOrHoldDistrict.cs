using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class EditOrHoldDistrict
    {
         

    }

    public class ApprovToEditByDistrict
    {
        public int id { get; set; }
        public int StatusId { get; set; }
        public int userId { get; set; }
        public string ReasonForApprovedForEditByDistrict { get; set; }
    }

    public class EditOrHoldDistrictBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();
        public DataTable getAllData(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetListOfEditOrHoldByDistrict";
            command.Parameters.AddWithValue("@UserId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }


        public void updateToEditByDistrict(ApprovToEditByDistrict objApprovToEditByDistrict)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_PostApprovedToEditByDistrict", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(objApprovToEditByDistrict.id));
            cmd.Parameters.AddWithValue("@StatusId", objApprovToEditByDistrict.StatusId);
            cmd.Parameters.AddWithValue("@ReasonForApprovedForEditByDistrictBy", objApprovToEditByDistrict.userId);
            cmd.Parameters.AddWithValue("@ReasonForApprovedForEditByDistrict", objApprovToEditByDistrict.ReasonForApprovedForEditByDistrict);
            cmd.ExecuteNonQuery();
            conn.Close();
        }

    }
}