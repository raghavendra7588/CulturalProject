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
    public class LoginController : ApiController
    {
        LoginBL objLoginBL = new LoginBL();

        [HttpPost]
        public HttpResponseMessage Post(Login objLogin)
        {
            try
            {
                DataTable loginResponse = objLoginBL.postAddressToDb(objLogin);
                return Request.CreateResponse(HttpStatusCode.Created, loginResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
