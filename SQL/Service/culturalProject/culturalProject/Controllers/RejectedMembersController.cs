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
    public class RejectedMembersController : ApiController
    {
        RejectedMembers objRejectedMembers = new RejectedMembers();

        [HttpGet]
        [Route("api/RejectedMembers/RejectedMembersByDistrict/{id:int}")]
        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objRejectedMembers.getRejectedMembersDataByDistrict(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpPost]
        [Route("api/RejectedMembers/RejectedMembersByState")]
        public HttpResponseMessage getAllDistrictData()
        {
            try
            {
                DataTable dt = objRejectedMembers.getRejectedMembersDataByState();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/RejectedMembersByPanchyat/{id:int}")]
        public HttpResponseMessage getAllDistrictData(int id)
        {
            try
            {
                DataTable dt = objRejectedMembers.getRejectedMembersDataByPanchyatName(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/RejectedMembers/GetAllRejectedMembersByState")]
        public HttpResponseMessage getAllRejectedStateData()
        {
            try
            {
                DataTable dt = objRejectedMembers.getALLRejectedMembersDataByState();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
