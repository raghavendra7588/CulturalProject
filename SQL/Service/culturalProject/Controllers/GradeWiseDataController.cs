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
    public class GradeWiseDataController : ApiController
    {
        GradeWiseDataBL objGradeWiseDataBL = new GradeWiseDataBL();

        [HttpGet]
        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objGradeWiseDataBL.getAllData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/GradeWiseData/gradeB/{id:int}")]
        public HttpResponseMessage getGradeB(int id)
        {
            try
            {
                DataTable dt = objGradeWiseDataBL.getAllGradeBData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/GradeWiseData/gradeC/{id:int}")]
        public HttpResponseMessage getGradeC(int id)
        {
            try
            {
                DataTable dt = objGradeWiseDataBL.getAllGradeCData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
