using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AngularCore.Entities;
using AngularCore.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;





namespace AngularCore.Controllers
{
    /// <summary>
    /// jwt token authentication https://dotnetthoughts.net/token-based-authentication-in-aspnet-core/ и 
    /// как дружить с ангуляром 2
    /// https://fullstackmark.com/post/13/jwt-authentication-with-aspnet-core-2-web-api-angular-5-net-core-identity-and-facebook-login 
    /// </summary>
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private IConfiguration _config;        
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        IConfiguration _configuration;

    //    private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
    //   private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

        public AccountsController(UserManager<ApplicationUser> userManager,
            ApplicationDbContext appDbContext, 
            IConfiguration config, 
            IOptions<JwtIssuerOptions> jwtOptions,
            IJwtFactory jwtFactory,
            IConfiguration configuration
            )
        {
            _userManager = userManager;        
            _appDbContext = appDbContext;
             _config=config;
        _jwtOptions = jwtOptions.Value;
            _jwtFactory = jwtFactory;
            _configuration = configuration;

        }

        // Создаем пользака
        // POST api/accounts/register
        [HttpPost("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]UserModel model)
        {

            IdentityResult result;
            string res;

            // проверить что пришло в request 
            using (var ms = new MemoryStream(2048))
            {
                await Request.Body.CopyToAsync(ms);
                StreamReader reader = new StreamReader(ms);
                 res = reader.ReadToEnd();
                
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

        
            var user = new ApplicationUser { UserName = model.UserName, Email = model.UserName };
            
            //    var userIdentity = _mapper.Map<AppUser>(model);

            try
            {
                 result = await _userManager.CreateAsync(user, model.Password);
                if (! result.Succeeded) return new BadRequestObjectResult((ModelState));

            }
            catch (Exception e)
            {
                Trace.WriteLine(e.Message);
                 return new BadRequestObjectResult((ModelState));
            }

        

            return new OkObjectResult("Account created");
        }


        // Даем пользаку claims если он реальный
        // POST api/accounts/login
        [HttpPost("login")]

        public async Task<IActionResult> Post2([FromBody]UserModel loginViewModel)
        {
            if (ModelState.IsValid)
            {
                var userFound = await _userManager.FindByNameAsync(loginViewModel.UserName);

                if (userFound == null) return Unauthorized();
                //This method returns user id from username and password.
                var userId = userFound?.Id;

                // Claims, которыми мы наделяем этого пользака (в базе не хранятся)
                var claims = new[]
                {
                
                new Claim(Helpers.Constants.Strings.JwtClaimIdentifiers.Id, userId),
                new Claim(Helpers.Constants.Strings.JwtClaimIdentifiers.Rol, Helpers.Constants.Strings.JwtClaims.ApiAccess),
                new Claim("test2", "test2")
             };


                // Get options from app settings
                var options = _configuration.GetSection(nameof(JwtIssuerOptions));

                SymmetricSecurityKey _signingKey =  new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["SecretKey"]));

                // Configure JwtIssuerOptions


                var token = new JwtSecurityToken
                (
                    issuer: options[nameof(JwtIssuerOptions.Issuer)],
                    audience: options[nameof(JwtIssuerOptions.Audience)],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(3), // токен действует 3 минуты
                    notBefore: DateTime.UtcNow,
                    signingCredentials: new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
            }

            return BadRequest();
        }

        /*
        // POST api/accounts/login
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]UserModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null)
            {

                ModelState.AddModelError("login_failure", "Invalid username or password.");
                return BadRequest(ModelState);
            }

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }



        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }

    */


    }
}