//const api_url = "http://localhost:10010";
//44343
const api_url = "https://localhost:44343";

export const startPlan = async () => {
    const url = `${api_url}/Plan`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    if (!response.ok) throw new Error("Failed to create plan");

    return await response.json();
};

export const addProcedureToPlan = async (planId, procedureId) => {
    const url = `${api_url}/Plan/AddProcedureToPlan`;
    var command = { planId: planId, procedureId: procedureId };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
    });

    if (!response.ok) throw new Error("Failed to create plan");

    return true;
};

export const getUserProcedure = async (procedureId, planId) => {
    const url = `${api_url}/UserProcedure?$filter=procedureId eq ${procedureId} and planId eq ${planId}&$expand=user`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get Users with procedures");

    return await response.json();
};

export const addUsersToProcedure = async (procedureId, userId, planId) => {
    const url = `${api_url}/UserProcedure/AddUsersToProcedure`;
    var command = { procedureId: procedureId,  userId: userId , planId: planId};
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
    });

    if (!response.ok) throw new Error("Failed to Assign Users to Procedure");

    return true;
};

export const getProcedures = async () => {
    const url = `${api_url}/Procedures`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get procedures");

    return await response.json();
};

export const getPlanProcedures = async (planId) => {
    const url = `${api_url}/PlanProcedure?$filter=planId eq ${planId}&$expand=procedure`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get plan procedures");

    return await response.json();
};

export const getUsers = async () => {
    const url = `${api_url}/Users`;
    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to get users");

    return await response.json();
};
