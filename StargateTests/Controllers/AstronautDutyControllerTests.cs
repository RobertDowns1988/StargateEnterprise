using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StargateAPI.Business.Commands;
using StargateAPI.Business.Queries;
using StargateAPI.Controllers;
using System.Net;

namespace StargateAPI.Tests.Controllers
{
    public class AstronautDutyControllerTests
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly AstronautDutyController _controller;

        public AstronautDutyControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new AstronautDutyController(_mediatorMock.Object);
        }

        [Fact]
        public async Task GetAstronautDutiesByName_ReturnsOk_WhenMediatorReturnsSuccess()
        {
            // Arrange
            var name = "Jonas Quinn";
            var response = new GetPersonByNameResult
            {
                Success = true,
                Message = "Found",
                ResponseCode = (int)HttpStatusCode.OK
            };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<GetPersonByName>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.GetAstronautDutiesByName(name) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(response, result.Value);
        }

        [Fact]
        public async Task GetAstronautDutiesByName_Returns500_OnException()
        {
            // Arrange
            var name = "Elizabeth Weir";
            _mediatorMock
                .Setup(m => m.Send(It.IsAny<GetPersonByName>(), It.IsAny<CancellationToken>()))
                .ThrowsAsync(new Exception("Something went wrong"));

            // Act
            var result = await _controller.GetAstronautDutiesByName(name) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            var response = Assert.IsType<BaseResponse>(result.Value);
            Assert.False(response.Success);
            Assert.Equal("Something went wrong", response.Message);
            Assert.Equal((int)HttpStatusCode.InternalServerError, result.StatusCode);
        }

        [Fact]
        public async Task CreateAstronautDuty_ReturnsOk_WhenMediatorReturnsSuccess()
        {
            // Arrange
            var request = new CreateAstronautDuty
            {
                Name = "John Shepard",
                Rank = "Lt Colonel",
                DutyTitle = "Lunar Module Pilot",
                DutyStartDate = DateTime.MinValue // or any appropriate date
            };

            var response = new CreateAstronautDutyResult
            {
                Success = true,
                Message = "Created",
                ResponseCode = (int)HttpStatusCode.OK
            };

            _mediatorMock
                .Setup(m => m.Send(It.IsAny<CreateAstronautDuty>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(response);

            // Act
            var result = await _controller.CreateAstronautDuty(request) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(response, result.Value);
        }
    }
}