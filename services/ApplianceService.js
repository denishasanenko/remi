import BaseStorageService from "./BaseStorageService";
import {ApplianceContext} from "../contexts/ApplianceContext";

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
                id: 7,
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
        return BaseStorageService.getData(storageKey)
    },
    groupByCategory: (applianceData) => {
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
        const data = await ApplianceService.getAppliance();
        const applianceItem = data.find(item => item.id === id);
        return applianceItem || { category: {} };
    },
    findCategoryByTitle: (applianceData, title) => {
        console.log(applianceData)
        const applianceItem = applianceData.find(item => item.title === title);
        return applianceItem || { };
    },
    upsert: async (data) => {
        let applianceList = await ApplianceService.getAppliance();
        if (data.id) {
            applianceList = applianceList.map(item => {
                if (item.id === data.id) {
                    item = data;
                }
                return item;
            })
        } else {
            applianceList.push({
                ...data
            })
        }
        return await BaseStorageService.setData(storageKey, applianceList)
    }
}

export default ApplianceService;