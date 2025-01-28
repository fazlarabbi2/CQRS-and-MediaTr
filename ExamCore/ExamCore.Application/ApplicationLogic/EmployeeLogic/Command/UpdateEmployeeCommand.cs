using AutoMapper;
using ExamCore.Application.ApplicationLogic.EmployeeLogic.Model;
using ExamCore.Manager.Contracts;
using ExamCore.Shared.ErrorMessages;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace ExamCore.Application.ApplicationLogic.EmployeeLogic.Command
{
    public class UpdateEmployeeCommand : EmployeeUpdateModel, IRequest<EmployeeUpdateModel>
    {
        public class Handler : IRequestHandler<UpdateEmployeeCommand, EmployeeUpdateModel>
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

            public async Task<EmployeeUpdateModel> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
            {
                // Get exist employee
                var getExistEmployee = await _employeeManager.GetByIdAsync(request.Id);

                if (getExistEmployee is null)
                {
                    throw new BadHttpRequestException(ProvideErrorMessage.EmployeeIdNotFound);
                }

                getExistEmployee = _mapper.Map((EmployeeUpdateModel)request, getExistEmployee);
                getExistEmployee.UpdatedById = Guid.NewGuid().ToString();
                getExistEmployee.UpdatedDateTime = DateTime.UtcNow;

                getExistEmployee = await _employeeManager.UpdateAsync(getExistEmployee);

                return request;
            }
        }
    }
}
