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
    public class OnHoldArtistController : ApiController
    {
        OnHoldArtistBL objOnHoldArtistBL = new OnHoldArtistBL();


        [HttpGet]
        [Route("api/ListOnHoldByDistrict/{id:int}")]
        public HttpResponseMessage getall(int id)
        {
            try
            {
                DataTable dt = objOnHoldArtistBL.getOnHoldMembersAtDistrictData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/ListOnHoldByPanchayat/{id:int}")]
        public HttpResponseMessage getAllListOnHoldAtPanchayatData(int id)
        {
            try
            {
                DataTable dt = objOnHoldArtistBL.getOnHoldMembersAtPanchayat(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpGet]
        [Route("api/ListOnHoldByState")]
        public HttpResponseMessage getAllListOnHoldAtStateData()
        {
            try
            {
                DataTable dt = objOnHoldArtistBL.getOnHoldMembersAtState();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpPost]
        public HttpResponseMessage getAllDistrictData(OnHoldArtist objOnHoldArtist)
        {
            try
            {
                objOnHoldArtistBL.updateOnHoldToDistict(objOnHoldArtist);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpPost]
        [Route("api/PostOnApprovedArtistByDistrict")]
        public HttpResponseMessage postApprovedArtistData(OnApprvoedArtist objOnApprvoedArtist)
        {
            try
            {
                objOnHoldArtistBL.updateOnAppprovedToDistict(objOnApprvoedArtist);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpPost]
        [Route("api/DynamicStateOnHoldList")]
        public HttpResponseMessage PostRejected(OnHoldArtistAtState objOnHoldArtistAtState)
        {
            try
            {
                DataTable dt = objOnHoldArtistBL.postOnHoldListToDb(objOnHoldArtistAtState);
                return Request.CreateResponse(HttpStatusCode.Created, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}
