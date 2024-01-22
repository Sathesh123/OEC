using MediatR;
using Microsoft.EntityFrameworkCore;
using RL.Backend.Exceptions;
using RL.Backend.Models;
using RL.Data;
using RL.Data.DataModels;
using System.Numerics;

namespace RL.Backend.Commands.Handlers.Plans;

public class AddUsersToProcedureCommandHandler : IRequestHandler<AddUsersToProcedureCommand, ApiResponse<Unit>>
{
    private readonly RLContext _context;

    public AddUsersToProcedureCommandHandler(RLContext context)
    {
        _context = context;
    }

    public async Task<ApiResponse<Unit>> Handle(AddUsersToProcedureCommand request, CancellationToken cancellationToken)
    {
        try
        {
            //Validate request
            if (request.PlanId < 1)
                return ApiResponse<Unit>.Fail(new BadRequestException("Invalid PlanId"));
            if (request.ProcedureId < 1)
                return ApiResponse<Unit>.Fail(new BadRequestException("Invalid ProcedureId"));
            if (request.UserId < 1)
                return ApiResponse<Unit>.Fail(new BadRequestException("Invalid UserId"));

            var plan = await _context.Plans
                .Include(p => p.PlanProcedures)
                .FirstOrDefaultAsync(p => p.PlanId == request.PlanId);
            var procedure = await _context.Procedures
                .Include(p => p.UserProcedures).
                FirstOrDefaultAsync(p => p.ProcedureId == request.ProcedureId);
            var user = await _context.Users.FirstOrDefaultAsync(p => p.UserId == request.UserId);

            if (plan is null)
                return ApiResponse<Unit>.Fail(new NotFoundException($"PlanId: {request.PlanId} not found"));

            if (procedure is null)
                return ApiResponse<Unit>.Fail(new NotFoundException($"ProcedureId: {request.ProcedureId} not found"));

            if (user is null)
                return ApiResponse<Unit>.Fail(new NotFoundException($"ProcedureId: {request.UserId} not found"));

            //Already has the User, so just succeed
            if (procedure.UserProcedures.Any(p => p.UserId == user.UserId))
                return ApiResponse<Unit>.Succeed(new Unit());

            procedure.UserProcedures.Add(new UserPlanProcedure
            {
                //ProcedureId = procedure.ProcedureId,
                UserId = user.UserId,
                PlanId = plan.PlanId
            });

            await _context.SaveChangesAsync();

            return ApiResponse<Unit>.Succeed(new Unit());
        }
        catch (Exception e)
        {
            return ApiResponse<Unit>.Fail(e);
        }
    }
}