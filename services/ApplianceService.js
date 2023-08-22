import BaseStorageService from "./BaseStorageService";
import {auth, database} from "../firebase";
import {doc, getDoc, addDoc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import uuid from 'react-native-uuid';

const storageKey = '@appliance'

const ApplianceService = {
    getCategories: () => {
        return [
            {
              id: 1,
              title: 'Фільтри',
              icon: 'filter'
            },
            {
                id: 2,
                title: 'Автомобілі',
                icon: 'car'
            },
            {
                id: 3,
                title: 'Моторна техніка',
                icon: 'engine'
            },
            {
                id: 4,
                title: 'Гігієна',
                icon: 'higiene'
            },
            {
                id: 5,
                title: 'Опалення',
                icon: 'heating'
            },
            {
                id: 6,
                title: 'Сантехніка',
                icon: 'plumbing'
            },
            {
                id: 999,
                title: 'Інше',
                icon: 'other'
            },
            {
                id: 8,
                title: 'Електрична техніка',
                icon: 'electricity'
            },
        ];
    },
    getAppliance: async () => {
        return ApplianceService.groupByCategory((await ApplianceService._getUserDoc()).appliance);
    },
    groupByCategory: (applianceData) => {
        console.log(applianceData)
        if (!applianceData) {
            return []
        }
        const categories = ApplianceService.getCategories();
        const result = categories.map((category) => {
            category.applianceList = applianceData.filter((appliance) => appliance.categoryId === category.id)
            return category;
        })
        console.log(result.filter((category) => category.length))
        return result.filter((category) => category.applianceList.length)
    },
    /*flatten: (applianceData) => {
        return applianceData.reduce((acc, item) => {
            const list = item.applianceList.map(appliance => {
                return {...appliance, category: {id: item.id, title: item.title}}
            })
            return [...acc, ...list]
        }, []);
    },*/
    findById: async (id) => {
        const data = (await ApplianceService._getUserDoc()).appliance;
        if (!data) {
            return {};
        }
        const applianceItem = data.find(item => item.id === id);
        return applianceItem || { category: {} };
    },
    findCategoryByTitle: (applianceData, title) => {
        console.log(applianceData)
        const applianceItem = applianceData.find(item => item.title === title);
        return applianceItem || { };
    },
    upsert: async (data) => {
        let applianceList = (await ApplianceService._getUserDoc()).appliance;
        const ref = doc(database, "appliance", auth.currentUser.uid);

        if (data.id) {
            const appliance = applianceList.map(item => {
                if (item.id === data.id) {
                    item = data;
                }
                return item;
            })
            await updateDoc(ref, {
                appliance
            })
        } else {
            console.log(applianceList)
            applianceList.push({
                id: uuid.v1(),
                title: data.title,
                categoryId: data.categoryId
            })
            const d = {
                appliance: applianceList
            }
            console.log(d)
            await updateDoc(ref, {
                appliance: applianceList
            })
        }
        return;
    },
    delete: async (data) => {
        let applianceList = (await ApplianceService._getUserDoc()).appliance;
        const ref = doc(database, "appliance", auth.currentUser.uid);
        const appliance = applianceList.filter(item => item.id !== data.id)
        console.log(appliance, data.id)
        await updateDoc(ref, {
            appliance
        })
    },
    _getUserDoc: async () => {
        const appliance = await getDoc(doc(database, "appliance", auth.currentUser.uid));
        return appliance.data();
    },
}

export default ApplianceService;