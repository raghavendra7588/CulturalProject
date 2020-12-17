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
    public class EditOrHoldDistrictController : ApiController
    {
        EditOrHoldDistrictBL objEditOrHoldDistrictBL = new EditOrHoldDistrictBL();

        [HttpGet]
        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objEditOrHoldDistrictBL.getAllData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }



        [HttpPost]
        [Route("api/ApprovedForEditByDistrict")]
        public HttpResponseMessage ApprovedForEditByDistrict(ApprovToEditByDistrict objApprovToEditByDistrict)
        {
            try
            {
                objEditOrHoldDistrictBL.updateToEditByDistrict(objApprovToEditByDistrict);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
