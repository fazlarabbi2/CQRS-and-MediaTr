using ExamCore.Application.ApplicationLogic.EmployeeLogic.Command;
using ExamCore.Application.ApplicationLogic.EmployeeLogic.Model;
using ExamCore.Application.ApplicationLogic.EmployeeLogic.Queries;
using ExamCore.Shared.Base;
using Microsoft.AspNetCore.Mvc;

namespace ExamCore.Api.Controllers
{
    [ApiController]
    public class EmployeeController : BaseController
    {
        [HttpGet]
        [ProducesResponseType(typeof(ICollection<EmployeeGridModel>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ICollection<EmployeeGridModel>>> GetAllAsync()
        {
            var getEmployees = await Mediator.Send(new GetAllEmployeeQuery());
            return Ok(getEmployees);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(EmployeeViewModel), StatusCodes.Status200OK)]
        public async Task<ActionResult<EmployeeViewModel>> GetByIdAsync(int id)
        {
            var evm = new EmployeeViewModel
            {
                UpdateModel = await Mediator.Send(new GetEmployeeDetailsQuery { Id = id })
            };

            // Select List
            return Ok(evm);
        }


        [HttpPost]
        [ProducesResponseType(typeof(EmployeeCreateModel), StatusCodes.Status200OK)]
        public async Task<ActionResult<EmployeeCreateModel>> CreateAsync(CreateEmployeeCommand employeeCreateModel)
        {
            if (ModelState.IsValid)
            {
                var createEmployee = await Mediator.Send(employeeCreateModel);
                return Ok(createEmployee);
            }

            return BadRequest(employeeCreateModel);

        }

        [HttpPut]
        [ProducesResponseType(typeof(EmployeeUpdateModel), StatusCodes.Status200OK)]
        public async Task<ActionResult<EmployeeUpdateModel>> UpdateAsync(UpdateEmployeeCommand employeeUpdateModel)
        {
            if (ModelState.IsValid)
            {
                var updateEmployee = await Mediator.Send(employeeUpdateModel);
                return Ok(updateEmployee);
            }

            return BadRequest(employeeUpdateModel);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var deletedEmployee = await Mediator.Send(new DeleteEmployeeCommand { Id = id });
            return Ok(deletedEmployee);
        }
    }
}
