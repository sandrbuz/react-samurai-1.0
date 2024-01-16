import React, { useState } from "react";
import { updateStatus } from "../../../redux/profile-reducer";



const ProfileStatus = (props) => {
    
    let [editMode,setEditMode] = useState(false);
    let [status,setStatus] = useState(props.status)

    let activateEditMode = () => {
      setEditMode(true)
    }
    let deactivateEditMode = () => {
      setEditMode(false)
      props.updateStatus(status)
    }
    let onStatusChange = (e) => {
      setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "-----"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} type="text" />
                </div>
            }

        </div>
    )


}

export default ProfileStatus;