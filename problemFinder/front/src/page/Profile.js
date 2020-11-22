import React from "react";
import { Image, Divider, Avatar } from "antd";
import "./Profile.css";
//no se que datos se guardaran del perfil (?)
function Profile() {
  return (
    <div className="containerPrincipal">
      <div className="containerSecundario">
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <Divider type="vertical" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
          merninisti licere mihi ista probare, quae sunt a te dicta? Refert
          tamen, quo modo.
        </p>
      </div>
    </div>
  );
}
export default Profile;
