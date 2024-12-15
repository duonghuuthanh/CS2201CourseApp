import { useContext } from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/UserContexts";
import Styles from "../../styles/Styles";

const UserProfile = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext)

    console.info(user);

    return (
        <>
            <Text style={Styles.subject}>Chào {user._j.username}</Text>
            <Button onPress={() => dispatch({"type": "logout"})} style={Styles.margin} mode="outlined">Đăng xuất</Button>
        </>
    );
}

export default UserProfile;