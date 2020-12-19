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
    public class ReqToPutOnHoldController : ApiController
    {
        ReqToPutOnHoldBL objReqToPutOnHoldBL = new ReqToPutOnHoldBL();

        [HttpGet]
        [Route("api/ReqToPutOnHoldByDistrict/{id:int}")]
        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objReqToPutOnHoldBL.getReqToPutOnHoldMembersByDistrict(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }



        [HttpGet]
        [Route("api/ReqToPutOnHoldByPanchayat/{id:int}")]
        public HttpResponseMessage getReqToPutOnHoldAtPanchayat(int id)
        {
            try
            {
                DataTable dt = objReqToPutOnHoldBL.getReqToPutOnHoldMembersByPanchayat(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpGet]
        [Route("api/ReqToPutOnHoldByState")]
        public HttpResponseMessage getAllReqToPutOnHoldDataByState()
        {
            try
            {
                DataTable dt = objReqToPutOnHoldBL.getReqToPutOnHoldMembersByState();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpPost]
        [Route("api/ReqToPutOnHoldToHoldByDistrict")]
        public HttpResponseMessage PostReqToHoldByDistrict(ReqToPutOnHold objReqToPutOnHold)
        {
            try
            {
                objReqToPutOnHoldBL.updateOnHoldByDistict(objReqToPutOnHold);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
