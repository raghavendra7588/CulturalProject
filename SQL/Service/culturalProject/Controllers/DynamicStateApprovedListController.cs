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
    public class DynamicStateApprovedListController : ApiController
    {
        DynamicStateApprovedListBL objDynamicStateApprovedListBL = new DynamicStateApprovedListBL();

        [HttpPost]
        [Route("api/DynamicStateApprovedList")]
        public HttpResponseMessage Post(DynamicStateApprovedList objDynamicStateApprovedList)
        {
            try
            {
               DataTable dt = objDynamicStateApprovedListBL.postAddressToDb(objDynamicStateApprovedList);
                return Request.CreateResponse(HttpStatusCode.Created, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("api/DynamicStateRejectedList")]
        public HttpResponseMessage PostRejected(DynamicStateApprovedList objDynamicStateApprovedList)
        {
            try
            {
                DataTable dt = objDynamicStateApprovedListBL.postRejectedListToDb(objDynamicStateApprovedList);
                return Request.CreateResponse(HttpStatusCode.Created, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpPost]
        [Route("api/DynamicStateHoldList")]
        public HttpResponseMessage postHoldListToDb(DynamicStateApprovedList objDynamicStateApprovedList)
        {
            try
            {
                DataTable dt = objDynamicStateApprovedListBL.postHoldListToDb(objDynamicStateApprovedList);
                return Request.CreateResponse(HttpStatusCode.Created, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        [Route("api/getPanchayatNameBasedOnDistrict/{id:int}")]
        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objDynamicStateApprovedListBL.getPanchyatDataBasedOnDistrict(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

    }
}
