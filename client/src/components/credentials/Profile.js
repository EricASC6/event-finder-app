import React from "react";
import ToggleContainer from "../general/ToggleContainer";
import { ReactComponent as UserIcon } from "../../icons/user.svg";
import PopupWrapper from "../general/PopupWrapper";
import { useAuth } from "../../hooks/auth.hook";
import credentialsStyles from "../../styles/credentials.module.css";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <ToggleContainer>
      {({ on, open, close }) => (
        <div style={{ position: "relative" }}>
          {on && (
            <PopupWrapper
              position={{
                top: 0,
                right: 0,
              }}
              handleClose={close}
            >
              <div className={credentialsStyles.profilePopup}>
                <p className={credentialsStyles.profileEmail}>{user.email}</p>
                <button
                  className={credentialsStyles.logoutBtn}
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </PopupWrapper>
          )}
          <UserIcon
            style={{ cursor: "pointer", position: "relative" }}
            onClick={open}
          />
        </div>
      )}
    </ToggleContainer>
  );
};

export default Profile;
