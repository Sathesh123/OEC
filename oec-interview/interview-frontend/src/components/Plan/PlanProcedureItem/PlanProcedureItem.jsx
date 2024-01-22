import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
import {
    addUsersToProcedure,
    getUserProcedure
  } from "../../../api/api";

const PlanProcedureItem = ({ procedure, planId, users }) => {
    const [selectedUsers, setSelectedUsers] = useState(null);

    useEffect(() => {
        (async () => {
          var userProcedures = await getUserProcedure(procedure.procedureId, planId);

          if(userProcedures.length !== 0){
            var userOptions = [];
          
            userProcedures.map((u) => userOptions.push({ label: u.user.name, value: u.user.userId }));
            setSelectedUsers(userOptions);
          }
          else{
            setSelectedUsers(null);
          }          
        })();
      }, [procedure.procedureId, planId]);


    const handleAssignUserToProcedure = async (e) => {
        var latestSelectedValue = null;
        if(selectedUsers !== null){
            latestSelectedValue = e.filter(value => !selectedUsers.includes(value))[0];
        }
        else{
            latestSelectedValue = e[0];
        }
        await addUsersToProcedure(procedure.procedureId,latestSelectedValue.value, planId );
        setSelectedUsers(e);
    };

    return (
        <div className="py-2">
            <div>
                {procedure.procedureTitle}
            </div>

            <ReactSelect
                className="mt-2"
                placeholder="Select User to Assign"
                isMulti={true}
                options={users}
                value={selectedUsers}
                onChange={(e) => handleAssignUserToProcedure(e)}
            />
        </div>
    );
};

export default PlanProcedureItem;
