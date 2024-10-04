import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserData = () => {
    const [usersData, setUsersData] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const user = await AsyncStorage.getItem('userData');

                if (user) {
                    setUsersData(JSON.parse(user));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        loadUserData();
    }, []);

    return { usersData };
};
