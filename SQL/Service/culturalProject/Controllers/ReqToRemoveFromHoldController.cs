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
    public class ReqToRemoveFromHoldController : ApiController
    {

        ReqToRemoveFromHoldBL objReqToRemoveFromHoldBL = new ReqToRemoveFromHoldBL();


        [HttpGet]
        [Route("api/RequestToRemoveHoldAtDistrict/{id:int}")]
        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objReqToRemoveFromHoldBL.getRemoveFromHoldMembersAtDistrict(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }



        [HttpGet]
        [Route("api/RequestToRemoveHoldAtPanchayat/{id:int}")]
        public HttpResponseMessage getReqToPutonHoldDataAtPanchayat(int id)
        {
            try
            {
                DataTable dt = objReqToRemoveFromHoldBL.getRemoveFromHoldMembersAtPanchayat(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }



        [HttpPost]
        [Route("api/PostReqToRemoveFromHoldByPanchayat")]
        public HttpResponseMessage postApprovedArtistData(ReqToRemoveFromHold objReqToRemoveFromHold)
        {
            try
            {
                objReqToRemoveFromHoldBL.updateReqToRemoveFromHoldByPanchayat(objReqToRemoveFromHold);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpPost]
        [Route("api/PostReqToRemoveFromHoldToApprovedByDistrict")]
        public HttpResponseMessage postHoldToApprovedArtistDataByDistrict(RemoveFromHoldToApproved objRemoveFromHoldToApproved)
        {
            try
            {
                objReqToRemoveFromHoldBL.updateReqToRemoveFromHoldToApprovedByDistrict(objRemoveFromHoldToApproved);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }



        [HttpPost]
        [Route("api/PostReqToRemoveFromHoldToHoldByDistrict")]
        public HttpResponseMessage updateReqToRemoveFromHoldToHoldByDistrict(ReqFromHoldToHold objReqFromHoldToHold)
        {
            try
            {
                objReqToRemoveFromHoldBL.updateReqToRemoveFromHoldToHoldByDistrict(objReqFromHoldToHold);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
