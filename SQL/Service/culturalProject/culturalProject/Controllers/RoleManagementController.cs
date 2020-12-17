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
    public class RoleManagementController : ApiController
    {

        RoleManagementBL objRoleManagementBL = new RoleManagementBL();

        [HttpGet]
        [Route("api/RoleManegement/UserMasterDataForState")]
        public HttpResponseMessage getUserMasterDataAtState()
        {
            try
            {
                DataTable dt = objRoleManagementBL.getStateUserMasterDataForState();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }



        [HttpGet]
        [Route("api/RoleManegement/UserMasterDataForDistrict")]
        public HttpResponseMessage getUserMasterDataForDistrictLevel()
        {
            try
            {
                DataTable dt = objRoleManagementBL.getStateUserMasterDataForDistrict();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/RoleManegement/UserMasterDataForPanchayat")]
        public HttpResponseMessage getUserMasterDataForPanchayatLevel()
        {
            try
            {
                DataTable dt = objRoleManagementBL.getStateUserMasterDataForPanchayat();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpPost]

        public HttpResponseMessage postActiveStatus(RoleManagement objRoleManagement)
        {
            try
            {
                objRoleManagementBL.updateActiveStatus(objRoleManagement);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
