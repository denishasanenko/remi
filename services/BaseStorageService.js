import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {
    getData: async (storageKey, defaultValue = []) => {
        let data = await AsyncStorage.getItem(storageKey);
        data = data ? JSON.parse(data) : defaultValue;
        return data;
    },
    setData: async (storageKey, value) => {
        await AsyncStorage.setItem(storageKey, JSON.stringify(value));
    }
};

export default StorageService;