using AngularCore.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularCore.Controllers
{

    [Route("api/[controller]/[action]")]
    public class DashboardController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly ApplicationDbContext _appDbContext;

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;


        public DashboardController(UserManager<ApplicationUser> userManager, ApplicationDbContext appDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _appDbContext = appDbContext;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }


        [HttpGet]
        //[Authorize(Policy = "ApiUser")]
        [Authorize]
        public async Task<IActionResult> Test()
        {
            return Ok("works!");
        }

        [HttpGet]
        [Authorize(Policy = "ApiUser")]        
        public async Task<IActionResult> Test1()
        {
            return Ok("works!");
        }

        [HttpGet]
        [Authorize(Policy = "ApiUser2")]
        public async Task<IActionResult> Test2()
        {
            return Ok("works2!");
        }


        // По claim возвращаем пользака
        // GET api/dashboard/GetUser
        [HttpGet]
        
        public async Task<IActionResult> GetUser()
        {
            // retrieve the user info
            //HttpContext.User
            var userId = _caller.Claims.Single(c => c.Type == Helpers.Constants.Strings.JwtClaimIdentifiers.Id);
            
           return Ok(await  _userManager.FindByIdAsync(userId.Value));
           
        }
    }
}

