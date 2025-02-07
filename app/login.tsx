import { Text, View } from "react-native";
import * as yup from 'yup';
import { AuthContext } from "./_layout";

export default function Login() {

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Please enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(6, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    });

    return (
        <AuthContext.Consumer>
            {value => <View>
                <Text>{value.name}</Text>
            </View>}
        </AuthContext.Consumer>
    )
}