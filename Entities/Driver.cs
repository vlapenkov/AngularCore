using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCore
{
    public class Driver
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Fio { get; set; }

        [MaxLength(11)]
        public string Phone { get; set; }

        /*
        [MaxLength(100)]
        public string FavouriteSeason { get; set; }
        */
    }
}
