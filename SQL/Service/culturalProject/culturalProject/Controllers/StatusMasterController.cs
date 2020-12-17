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
    public class StatusMasterController : ApiController
    {
        StatusMaster objStatusMaster = new StatusMaster();

        [HttpGet]
        public HttpResponseMessage getall()
        {
            try
            {

                DataTable dt = objStatusMaster.getAllData();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

    }
}
