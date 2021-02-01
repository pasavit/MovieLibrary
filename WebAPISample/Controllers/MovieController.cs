using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var movieList = _context.Movies.ToList();
            return Ok(movieList);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var movie = _context.Movies.Where(m => m.MovieId == id).FirstOrDefault();
            return Ok(movie);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {
            _context.Movies.Add(value);
            _context.SaveChanges();
            return Ok(value);
        }

        [HttpPut]
        public IActionResult Put([FromBody] Movie movie)
        {
            _context.Movies.Update(movie);
            _context.SaveChanges();
            return Ok(movie);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var movie = _context.Movies.Where(m => m.MovieId == id).FirstOrDefault();
            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return Ok();
        }
    }
}