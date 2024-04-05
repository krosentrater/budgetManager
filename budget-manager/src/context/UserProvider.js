import { useState } from 'react';
import axios from 'axios';
export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

async function UserProvider(props) {

    const initState = {
        user: JSON.parse(localStorag.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        income: '',
        expenses: [],
        errMsg: ''
    };

    const [userState, setUserState] = useState(initState);

    function handleAuthErr(errMsg) {
        setUserState((prevState) => ({
            ...prevState,
            errMsg
        }));
    };

    function resetAuthErr(){
        setUserState((prevState) => ({
            ...prevState,
            errMsg: ''
        }));
    };

    async function signup(credentials) {
        try {
            const res = await axios.post('http://localhost:3200/auth/signup', credentials);
            const { user, token } = res.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            setUserState((prevUserSate) => ({
                ...prevUserState,
                user,
                token
            }));
        } catch (err) {
            handleAuthErr(err.response.data.errMsg);
        };
    };

    async function login(credentials) {
        try {
            const res = await axios.post('http://localhost:3200/auth/login', credentials);
            const { user, token } = res.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            setUserState((prevUserState) => ({
                ...prevUserState,
                user,
                token
            }));
        } catch (err) {
            handleAuthErr(err.response.data.errMsg);
        };
    };

    async function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({ 
            user: {},
            token: '',
            income: '',
            expenses: []
         });
    };

    async function getExpenses() {
        try {
            const res = await userAxios.get('http://localhost:3200/api/user');
            setUserState((prevState) => ({
                ...prevState,
                expenses: res.data
            }));
        } catch (err) {
            console.err('Error fetching expenses:', err);
        };
    };

    async function addExpenses(newExpense) {
        try {
            const res = await userAxios.post('http://localhost:3200/api/user');
            setUserState((prevState) => ({
                ...prevState,
                expenses: [...prevState.expenses, res.data]
            }));
        } catch (err) {
            console.dir(err.response.data.errMsg);
        };
    };

    return (
        <UserContext.Provider value = {{ ...userState, signup, login, logout, addExpenses, getExpenses, resetAuthErr }} >
            { props.children }
        </UserContext.Provider>
    )
};

export default UserProvider;