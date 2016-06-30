using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.Contracts;

namespace WebApplication2.Controllers
{
    public class SongController : ApiController
    {
        [HttpGet]
        public ISong GetSong()
        {
            var song = new Song();
            song.song = new float[] { 440, 440, 523.3f, 440, 587.3f, 440, 659.3f, 587.3f, 523.3f, 523.3f, 659.3f, 523.3f, 392, 523.3f, 659.3f, 523.3f, 392, 392, 493.9f, 392, 523.3f, 392, 587.3f, 523.3f, 349.2f, 349.2f, 440, 349.2f, 523.3f, 349.2f, 523.3f, 493.9f };
            return song;
        }
    }
}
