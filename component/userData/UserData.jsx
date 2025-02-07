import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserData = () => {
    const [usersData, setUsersData] = useState(null);
    const [userStatus, setUserStatus] = useState(null);

    const loadUserData = useCallback(async () => {
        try {
            const user = await AsyncStorage.getItem('userData');
            if (user) {
                const parsedUser = JSON.parse(user);
                const userId = parsedUser._id;
                const response = await fetch(
                    `${process.env.REACT_APP_API}zenstudy/api/user/userdetail/${userId}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const resData = await response.json();
                const { userdetail } = resData;
                 //console.log('user: ', userdetail.status);
                setUsersData(userdetail || null);
                setUserStatus(userdetail?.status || null);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, []);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    return { usersData, userStatus, refreshUserData: loadUserData };
};
