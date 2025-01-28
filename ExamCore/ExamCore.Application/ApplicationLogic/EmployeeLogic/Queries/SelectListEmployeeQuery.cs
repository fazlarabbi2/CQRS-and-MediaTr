using ExamCore.Manager.Contracts;
using ExamCore.Shared.Models;
using MediatR;

namespace ExamCore.Application.ApplicationLogic.EmployeeLogic.Queries
{
    internal class SelectListEmployeeQuery : IRequest<List<SelectModel>>
    {

        public class Handler : IRequestHandler<SelectListEmployeeQuery, List<SelectModel>>
        {
            private readonly IEmployeeManager _employeeManager;

            public Handler(IEmployeeManager employeeManager)
            {
                _employeeManager = employeeManager;
            }

            public async Task<List<SelectModel>> Handle(SelectListEmployeeQuery request, CancellationToken cancellationToken)
            {
                var getEmployees = await _employeeManager.GetAllAsync();

                var employeeSelectList = getEmployees
                    .Select(c => new SelectModel()
                    {
                        Id = c.Id,
                        Name = c.Name,
                    }).ToList();

                return employeeSelectList;
            }
        }
    }
}
