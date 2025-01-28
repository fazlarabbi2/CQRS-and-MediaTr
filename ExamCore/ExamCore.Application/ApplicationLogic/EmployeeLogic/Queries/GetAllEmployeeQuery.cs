using AutoMapper;
using ExamCore.Application.ApplicationLogic.EmployeeLogic.Model;
using ExamCore.Manager.Contracts;
using MediatR;

namespace ExamCore.Application.ApplicationLogic.EmployeeLogic.Queries
{
    public class GetAllEmployeeQuery : IRequest<ICollection<EmployeeGridModel>>
    {
        public class Handler : IRequestHandler<GetAllEmployeeQuery, ICollection<EmployeeGridModel>>
        {
            private readonly IEmployeeManager _employeeManager;
            private readonly IMapper _mapper;

            public Handler(IEmployeeManager employeeManager, IMapper mapper)
            {
                _employeeManager = employeeManager;
                _mapper = mapper;
            }

            public async Task<ICollection<EmployeeGridModel>> Handle(GetAllEmployeeQuery request, CancellationToken cancellationToken)
            {
                var getEmployees = await _employeeManager.GetAllAsync();
                var mapGetEmployees = _mapper.Map<ICollection<EmployeeGridModel>>(getEmployees);

                return mapGetEmployees;
            }
        }
    }
}
