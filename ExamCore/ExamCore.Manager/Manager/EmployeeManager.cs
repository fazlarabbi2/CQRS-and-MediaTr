using ExamCore.Manager.Base;
using ExamCore.Manager.Contracts;
using ExamCore.Model.Models;
using ExamCore.Repository.Contracts;

namespace ExamCore.Manager.Manager
{
    public class EmployeeManager : BaseManager<Employee>, IEmployeeManager
    {
        public readonly IEmployeeRepository _employeeRepository;

        public EmployeeManager(IEmployeeRepository employeeRepository) : base(employeeRepository) => _employeeRepository = employeeRepository;

        public override async Task<ICollection<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }
    }
}
