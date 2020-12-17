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
    public class OnHoldArtistByPanchayatController : ApiController
    {

        OnHoldArtistByPanchayatBL objOnHoldArtistByPanchayatBL = new OnHoldArtistByPanchayatBL();

        [HttpGet]
    
        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objOnHoldArtistByPanchayatBL.getOnHoldMembersAtPanchayat(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpGet]
        [Route("api/OnHoldMembersAtDistrict/{id:int}")]
        public HttpResponseMessage getOnHoldMemebrsAtDistrict(int id)
        {
            try
            {
                DataTable dt = objOnHoldArtistByPanchayatBL.getOnHoldMembersAtDistrictData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpPost]
       
        public HttpResponseMessage getAllDistrictData(OnHoldArtistByPanchayat objOnHoldArtistByPanchayat)
        {
            try
            {
                objOnHoldArtistByPanchayatBL.updateOnHoldToPanchayat(objOnHoldArtistByPanchayat);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
