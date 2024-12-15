import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import APIs, { authApis, endpoints } from "../../configs/APIs";
import { MyDispatchContext } from "../../configs/UserContexts";
import Styles from "../../styles/Styles";

const Login = () => {
    const [user, setUser] = useState({
        "username": "",
        "password": ""
    });
    const [loading, setLoading] = useState(false);
    const users = {
        "username": {
            "title": "Tên đăng nhập",
            "field": "username",
            "secure": false,
            "icon": "text"
        },  "password": {
            "title": "Mật khẩu",
            "field": "password",
            "secure": true,
            "icon": "eye"
        }
    }
    const dispatch = useContext(MyDispatchContext);

    const updateUser = (value, field) => {
        setUser({...user, [field]: value});
    }

    const login = async () => {
        await AsyncStorage.removeItem('token');
        
        try {
            setLoading(true);

            
            const res = await APIs.post(endpoints['login'], {
                "client_id": "Vbe8euZZQJoWJ2UzW9wDThg4hJEZHHbhFmnfj7UR",
                "client_secret": "cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2",
                'grant_type': "password",
                ...user
            });
    
            console.info(res.data);
            await AsyncStorage.setItem('token', res.data.access_token);

            dispatch({"type": "login"});
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {Object.values(users).map(u => <TextInput right={<TextInput.Icon icon={u.icon} />} key={u.field} 
                    secureTextEntry={u.secure} style={Styles.margin} placeholder={u.title} 
                    value={user[u.field]}  onChangeText={t => updateUser(t, u.field)}  />)}
            

            <Button onPress={login} loading={loading} style={Styles.margin} 
                    icon="account-check" mode="contained">Đăng nhập</Button>
        </KeyboardAvoidingView>
    );
}

export default Login;