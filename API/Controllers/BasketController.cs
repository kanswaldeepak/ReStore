using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }
       

        [HttpPost] 
        public async Task<ActionResult<Basket>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if(basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails{Title = "Problem saving Items to Basket;"});
        } 

        [HttpDelete] 
        public async Task<ActionResult<Basket>> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if(basket == null) return NotFound();
            basket.RemoveItem(productId,quantity);

            var result = await _context.SaveChangesAsync()>0;
            if(result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails{Title = "Problem Removing Item from basket"});
                        
        } 

        
        private async Task<Basket?> RetrieveBasket()
        {
            return _context.Baskets
                     .Include(i => i.Items)
                     .ThenInclude(x => x.Product)
                     .FirstOrDefault(y => y.BuyerId == Request.Cookies["buyerId"]);
            
            // return await _context.Baskets
            //         .Include(i => i.Items)
            //         .ThenInclude(x => x.Product)
            //         .FirstOrDefault(y => y.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket? CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = false, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket? basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity

                }).ToList()
            };
        }


    }
}