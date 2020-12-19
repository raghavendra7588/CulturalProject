using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using culturalProject.Models;

namespace culturalProject.Controllers
{
    public class UserMasterController : ApiController
    {
        UserMasterBL objUserMasterBL = new UserMasterBL();



        [HttpGet]

        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objUserMasterBL.getAllData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/GetStateUserMaster")]
        public HttpResponseMessage getallAdminData()
        {
            try
            {
                DataTable dt = objUserMasterBL.getAllAdminData();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }



        [HttpPost]
        public HttpResponseMessage Post(UserMaster objUserMaster)
        {
            int intId = objUserMaster.UserId;

            try
            {
                if (intId == 0)
                  {
                    objUserMasterBL.postAddressToDb(objUserMaster);
                }
                  else
                  {                   
                    objUserMasterBL.updateAddressToDb(objUserMaster, intId);
                } 
                

                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}
