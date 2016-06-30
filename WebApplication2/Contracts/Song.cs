using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Contracts
{
    public class Song : ISong
    {
        public float[] song {get; set;}
    }
}