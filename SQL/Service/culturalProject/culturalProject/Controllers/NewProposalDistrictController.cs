using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using culturalProject.Models;

namespace culturalProject.Controllers
{
    public class NewProposalDistrictController : ApiController
    {

        NewProposalDistrictBL objNewProposalDistrictBL = new NewProposalDistrictBL();

        [HttpPost]
        public HttpResponseMessage Post(NewProposalDistrict objNewProposalDistrict)
        {
            try
            {
                objNewProposalDistrictBL.updateNewProposalDataToDb(objNewProposalDistrict);
                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("api/PostRejectArtistByDistrict")]
        public HttpResponseMessage getAllDistrictData(RejectedByDistrict objRejectedByDistrict)
        {
            try
            {
                objNewProposalDistrictBL.updateRejectedArtistByDistict(objRejectedByDistrict);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

    }
}
