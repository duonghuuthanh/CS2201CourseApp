import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "./APIs";

const MyUserReducer = async (currentState, action) => {
    switch (action.type) {
        case "login":
            const user = await (await authApis()).get(endpoints['current-user']);
            console.info(user.data);
            return user.data;
        case "logout":
            await AsyncStorage.removeItem('token');
            return null;
    }

    return currentState;
}

export default MyUserReducer;