using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AngularCore.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularCore.Controllers
{

    /* public class DriverDto()
         { }*/

    public class DriverDto
    {
        public int Id { get; set; }

        
        public string Fio { get; set; }

       
        public string Phone { get; set; }
    }

    [Route("api/[controller]")]
    public class DriversController : Controller
    {
       private ApplicationDbContext _db;


        public DriversController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: api/Test
        [HttpGet]
        //  [Route("claims")]
        [Authorize(Policy = "ApiUser")]
        public IQueryable<Driver> Get() => _db.Drivers;


        [HttpGet("{id}")]
        public Driver Get(int id)
        {
           return _db.Drivers.Find(id);
           
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public Driver Put(int id, [FromBody]Driver driverDto )
        {
           var driver= _db.Drivers.Find(id);

            driver.Fio = driverDto.Fio;
            driver.Phone = driverDto.Phone;

            _db.SaveChanges();
            return driver;
        }


        // POST api/values
        [HttpPost]
        //[Route("PostFile")] то же самое
        [Route("[action]")]
        public string PostFile([FromForm]IFormFile uploadFile)
        {

            Debug.WriteLine(uploadFile.FileName);
            return uploadFile.FileName;
        }

    }
}
