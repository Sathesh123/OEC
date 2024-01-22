using MediatR;
using RL.Backend.Models;

namespace RL.Backend.Commands
{
    public class AddUsersToProcedureCommand : IRequest<ApiResponse<Unit>>
    {
        public int ProcedureId { get; set; }
        public int UserId { get; set; }
        public int PlanId { get; set; }
    }
}