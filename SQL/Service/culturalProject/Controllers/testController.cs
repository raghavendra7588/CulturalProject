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
    public class testController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage getall()
        {
            int strId = 1;
            test Objtest = new test();
            DataTable dt = Objtest.getAllData(strId);
            return Request.CreateResponse(HttpStatusCode.OK, dt);
          
        }
    }
}
