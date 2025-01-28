using AutoMapper;
using ExamCore.Application.ApplicationLogic.EmployeeLogic.Model;
using ExamCore.Manager.Contracts;
using MediatR;

namespace ExamCore.Application.ApplicationLogic.EmployeeLogic.Queries
{
    public class GetEmployeeDetailsQuery : IRequest<EmployeeUpdateModel>
    {
        public int Id { get; set; }

        public class Handler : IRequestHandler<GetEmployeeDetailsQuery, EmployeeUpdateModel>
        {
            private readonly IEmployeeManager _employeeManager;
            private readonly IMapper _mapper;


            public Handler(IEmployeeManager employeeManager, IMapper mapper)
            {
                _employeeManager = employeeManager;
                _mapper = mapper;
            }

            public async Task<EmployeeUpdateModel> Handle(GetEmployeeDetailsQuery request, CancellationToken cancellationToken)
            {
                var getExistEmployee = await _employeeManager.GetByIdAsync(request.Id);

                if (getExistEmployee is null)
                {
                    return null!;
                }

                var mapExistEmployee = _mapper.Map<EmployeeUpdateModel>(getExistEmployee);

                return mapExistEmployee;
            }
        }
    }
}
