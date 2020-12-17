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
    public class ApprovedListController : ApiController
    {
        ApprovedListBL objApprovedListBL = new ApprovedListBL();
        public HttpResponseMessage getall()
        {
            try
            {         
                DataTable dt = objApprovedListBL.getAllData();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/ApprovedList/district/{id:int}")]
        public HttpResponseMessage getApprovedListByDistrict(int id)
        {
            try
            {
                DataTable dt = objApprovedListBL.getApprovedListByDistrict(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/ApprovedList/Panchayat/{id:int}")]
        public HttpResponseMessage getApprovedList(int id)
        {
            try
            {
                DataTable dt = objApprovedListBL.getApprovedListPanchayatData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
