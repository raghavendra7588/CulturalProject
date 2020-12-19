using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using culturalProject.Models;

namespace culturalProject.Controllers
{
    public class ProposalFormController : ApiController
    {
        ProposalFormBL objProposalFormBL = new ProposalFormBL();
        public HttpResponseMessage getall()
        {
            try
            {
                DataTable dt = objProposalFormBL.getAllData();
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        /* [HttpPost]
         public HttpResponseMessage Post()
         {
             ProposalForm objGov_PersonalDetails = new ProposalForm();
              HttpResponseMessage result = null;
              string strId = HttpContext.Current.Request.Params.Get("id");
              objGov_PersonalDetails.FirstName = HttpContext.Current.Request.Params.Get("firstName");
              objGov_PersonalDetails.MiddleName = HttpContext.Current.Request.Params.Get("middleName");
              objGov_PersonalDetails.LastName = HttpContext.Current.Request.Params.Get("lastName");
              objGov_PersonalDetails.DOB = HttpContext.Current.Request.Params.Get("dob");
              objGov_PersonalDetails.AnnualIncome = HttpContext.Current.Request.Params.Get("annualIncome");
              objGov_PersonalDetails.ArtType = HttpContext.Current.Request.Params.Get("artType");
              objGov_PersonalDetails.PeriodOfWork = HttpContext.Current.Request.Params.Get("periodOfWork");
              objGov_PersonalDetails.Grade = HttpContext.Current.Request.Params.Get("grade");
              objGov_PersonalDetails.Address = HttpContext.Current.Request.Params.Get("address");
              objGov_PersonalDetails.Taluka = HttpContext.Current.Request.Params.Get("taluka");
              objGov_PersonalDetails.District = HttpContext.Current.Request.Params.Get("district");
              objGov_PersonalDetails.ContactNo1 = HttpContext.Current.Request.Params.Get("contactNo1");
              objGov_PersonalDetails.ContactNo2 = HttpContext.Current.Request.Params.Get("contactNo2");
              objGov_PersonalDetails.AadharNo = HttpContext.Current.Request.Params.Get("aadharNo");
              objGov_PersonalDetails.PanNo = HttpContext.Current.Request.Params.Get("panNo");
              objGov_PersonalDetails.SpouseName = HttpContext.Current.Request.Params.Get("spouseName");

             objGov_PersonalDetails.AccountName = HttpContext.Current.Request.Params.Get("accountName");
             objGov_PersonalDetails.AccountNumber = HttpContext.Current.Request.Params.Get("accountNumber");
             objGov_PersonalDetails.BankName = HttpContext.Current.Request.Params.Get("bankName");
             objGov_PersonalDetails.BankIFSCCode = HttpContext.Current.Request.Params.Get("BankIFSCCode");
             objGov_PersonalDetails.City = HttpContext.Current.Request.Params.Get("city");


             result = Request.CreateResponse(HttpStatusCode.OK);
             }
        */
    }
}
