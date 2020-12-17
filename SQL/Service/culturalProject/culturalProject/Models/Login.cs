using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace culturalProject.Models
{
    public class Login
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }




    public class LoginBL
    {

        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();
        public DataTable postAddressToDb(Login objLogin)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_Login", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserName", objLogin.UserName);
            cmd.Parameters.AddWithValue("@Password", objLogin.Password);


            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
           

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");

           
            DataTable LoginResponseTable = fileData.Tables[0];
            cmd.ExecuteNonQuery();
            conn.Close();
            if (conn.State == ConnectionState.Open) { 
                conn.Close();
          }
            
            return LoginResponseTable;
        }

    }
}