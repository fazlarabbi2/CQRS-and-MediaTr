using AutoMapper;
using ExamCore.Application.ApplicationLogic.EmployeeLogic.Model;
using ExamCore.Manager.Contracts;
using ExamCore.Model.Models;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace ExamCore.Application.ApplicationLogic.EmployeeLogic.Command
{
    public class CreateEmployeeCommand : EmployeeCreateModel, IRequest<EmployeeCreateModel>
    {
        public class Handler : IRequestHandler<CreateEmployeeCommand, EmployeeCreateModel>
        {
            private readonly IEmployeeManager _employeeManager;
            private readonly IMapper _mapper;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(IEmployeeManager employeeManager, IMapper mapper, IHttpContextAccessor httpContextAccessor)
            {
                _employeeManager = employeeManager;
                _mapper = mapper;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<EmployeeCreateModel> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
            {
                var createdEmployee = _mapper.Map<Employee>(request);
                createdEmployee.CreatedById = Guid.NewGuid().ToString();
                createdEmployee.CreatedDateTime = DateTime.UtcNow;

                createdEmployee = await _employeeManager.CreateAsync(createdEmployee);
                return request;
            }
        }
    }
}
