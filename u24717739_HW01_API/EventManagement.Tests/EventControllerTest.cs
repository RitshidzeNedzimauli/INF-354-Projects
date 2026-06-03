using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using u24717739_HW01_API.Controllers;
using u24717739_HW01_API.Data;
using u24717739_HW01_API.Models;

namespace u24717739_HW01_API.Tests
{
    public class EventControllerTest
    {
        private readonly Mock<AppDbContext> _mockContext;
        private readonly EventController _controller;

        public EventControllerTest()
        {
            _mockContext = new Mock<AppDbContext>();

            // Mock the DbSet<Event>
            var events = new List<Event>
            {
                new Event { Id = 1, Title = "Test Event One", Location = "Pretoria", TicketPrice = 150.00m },
                new Event { Id = 2, Title = "Test Event Two", Location = "Johannesburg", TicketPrice = 299.99m }
            }.AsQueryable();

            var mockSet = new Mock<DbSet<Event>>();
            mockSet.As<IQueryable<Event>>().Setup(m => m.Provider).Returns(events.Provider);
            mockSet.As<IQueryable<Event>>().Setup(m => m.Expression).Returns(events.Expression);
            mockSet.As<IQueryable<Event>>().Setup(m => m.ElementType).Returns(events.ElementType);
            mockSet.As<IQueryable<Event>>().Setup(m => m.GetEnumerator()).Returns(events.GetEnumerator());

            _mockContext.Setup(c => c.Events).Returns(mockSet.Object);

            _controller = new EventController(_mockContext.Object);
        }

        [Fact]
        public async Task GetEvents_ShouldReturnOkResult_AndNotNull()
        {
            // Act
            var result = await _controller.GetEvents();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.NotNull(okResult);

            var returnedEvents = Assert.IsAssignableFrom<IEnumerable<Event>>(okResult.Value);
            Assert.NotNull(returnedEvents);
        }

        [Fact]
        public async Task GetEvent_ById_ShouldReturnOkResult_AndNotNull()
        {
            // Act
            var result = await _controller.GetEvent(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.NotNull(okResult);

            var eventItem = Assert.IsType<Event>(okResult.Value);
            Assert.NotNull(eventItem);
            Assert.Equal(1, eventItem.Id);
        }
    }
}