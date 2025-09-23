using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StargateAPI.Business.Commands;
using StargateAPI.Business.Queries;
using StargateAPI.Controllers;
using System.Net;

namespace StargateAPI.Tests.Controllers
{
    public class PersonControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly PersonController _controller;

        public PersonControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new PersonController(_mediatorMock.Object);
        }

        [Fact]
        public async Task GetPeople_ReturnsOk_WhenMediatorReturnsSuccess()
        {
            // Arrange
            var response = new GetPeopleResult { Success = true, Message = "ok", ResponseCode = (int)HttpStatusCode.OK };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<GetPeople>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.GetPeople();

            // Assert
            var objectResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal((int)HttpStatusCode.OK, objectResult.StatusCode);
            Assert.Equal(response, objectResult.Value);
        }

        [Fact]
        public async Task GetPersonByName_ReturnsOk_WhenMediatorReturnsSuccess()
        {
            // Arrange
            var response = new GetPersonByNameResult { Success = true, Message = "found", ResponseCode = (int)HttpStatusCode.OK };
            _mediatorMock
                .Setup(m => m.Send(It.Is<GetPersonByName>(q => q.Name == "Samantha Carter"), It.IsAny<CancellationToken>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.GetPersonByName("Samantha Carter");

            // Assert
            var objectResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal((int)HttpStatusCode.OK, objectResult.StatusCode);
            Assert.Equal(response, objectResult.Value);
        }

        [Fact]
        public async Task CreatePerson_ReturnsOk_WhenMediatorReturnsSuccess()
        {
            // Arrange
            var response = new CreatePersonResult { Success = true, Message = "created", ResponseCode = (int)HttpStatusCode.Created };
            _mediatorMock
                .Setup(m => m.Send(It.Is<CreatePerson>(c => c.Name == "Daniel Jackson"), It.IsAny<CancellationToken>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.CreatePerson("Daniel Jackson");

            // Assert
            var objectResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal((int)HttpStatusCode.Created, objectResult.StatusCode);
            Assert.Equal(response, objectResult.Value);
        }

        [Fact]
        public async Task CreatePerson_ReturnsConflict_WhenPersonAlreadyExists()
        {
            // Arrange
            var response = new CreatePersonResult
            {
                Success = false,
                Message = "Person already exists",
                ResponseCode = (int)HttpStatusCode.Conflict
            };

            _mediatorMock
                .Setup(m => m.Send(It.Is<CreatePerson>(c => c.Name == "Jack O'Neill"), It.IsAny<CancellationToken>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.CreatePerson("Jack O'Neill");

            // Assert
            var objectResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal((int)HttpStatusCode.Conflict, objectResult.StatusCode);

            var returnedResponse = Assert.IsType<CreatePersonResult>(objectResult.Value);
            Assert.False(returnedResponse.Success);
            Assert.Equal("Person already exists", returnedResponse.Message);
        }
    }
}
