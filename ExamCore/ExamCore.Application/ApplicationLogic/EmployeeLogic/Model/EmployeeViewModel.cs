using AutoMapper;
using ExamCore.Model.Models;
using ExamCore.Shared.Mappings;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Dynamic;

namespace ExamCore.Application.ApplicationLogic.EmployeeLogic.Model
{
    public class EmployeeViewModel
    {
        public EmployeeCreateModel CreateModel { get; set; }
        public EmployeeUpdateModel UpdateModel { get; set; }
        public EmployeeGridModel GridModel { get; set; }
        public dynamic OptionsDataSources { get; set; } = new ExpandoObject();
    }

    public class EmployeeCreateModel : IMapFrom<Employee>
    {
        [Column(TypeName = "nvarchar(50)")]
        [Required(ErrorMessage = "Please provide name.")]
        [StringLength(maximumLength: 50, MinimumLength = 2)]
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Employee, EmployeeCreateModel>();
            profile.CreateMap<EmployeeCreateModel, Employee>();
        }
    }

    public class EmployeeUpdateModel : IMapFrom<Employee>
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        [Required(ErrorMessage = "Please, provide name.")]
        [StringLength(maximumLength: 50, MinimumLength = 2)]
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Employee, EmployeeUpdateModel>();
            profile.CreateMap<EmployeeUpdateModel, Employee>();
        }
    }

    public class EmployeeGridModel : IMapFrom<Employee>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<Employee, EmployeeGridModel>();
            profile.CreateMap<EmployeeGridModel, Employee>();
        }
    }
}
