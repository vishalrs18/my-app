import { useSelector } from "react-redux"
import Widget from "../Components/Widget/Widget";

const Profile = () => {
  const profile = useSelector((state) => state.userData);
  return (
    <Widget header="My Profile">
        <div style={{ margin: '10px'}}><span style={{ background: "gray", borderRadius: '4px', padding: '4px', marginRight: "2px"}}>Email:</span> {profile.email}</div>
        <div style={{ margin: '10px'}}><span style={{ background: "gray", borderRadius: '4px', padding: '4px', marginRight: "2px"}}>User Id:</span> {profile.user_id}</div>
        <div style={{ margin: '10px'}}><span style={{ background: "gray", borderRadius: '4px', padding: '4px', marginRight: "2px"}}>Is Admin:</span> {profile.is_admin ? "true": "false"}</div>
        <div style={{ margin: '10px'}}><span style={{ background: "gray", borderRadius: '4px', padding: '4px', marginRight: "2px"}}>Permission:</span> {profile.permission.join(', ')}</div>
    </Widget>
  );
};

export default Profile;
