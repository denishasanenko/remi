import BaseStorageService from "./BaseStorageService";
import {ApplianceContext} from "../contexts/ApplianceContext";

const storageKey = '@appliance'

const ApplianceService = {
    getAppliance: () => {
        return BaseStorageService.getData(storageKey)
    },
    flatten: (applianceData) => {
        return applianceData.reduce((acc, item) => {
            const list = item.applianceList.map(appliance => {
                return {...appliance, category: {id: item.id, title: item.title}}
            })
            return [...acc, ...list]
        }, []);
    },
    findById: (applianceData, id) => {
        const data = ApplianceService.flatten(applianceData);
        const applianceItem = data.find(item => item.id === id);
        return applianceItem || { category: {} };
    },
    findCategoryByTitle: (applianceData, title) => {
        console.log(applianceData)
        const applianceItem = applianceData.find(item => item.title === title);
        return applianceItem || { };
    },
    upsert: async (applianceData, data) => {
        let category = ApplianceService.findCategoryByTitle(applianceData, data.category);
        if (!category.id) {
            category = {
                id: applianceData.length+1,
                title: data.category,
                applianceList: []
            };
            applianceData.push(category);
        }

        // add logic of changing category
        console.log(category)

        const applianceIndex = category.applianceList.findIndex(appliance => appliance.id === data.id);
        if (applianceIndex >= 0) {
            category.applianceList[applianceIndex].title = data.title;
        } else {
            category.applianceList.push({
                category: {
                    id: category.id,
                    title: category.title
                },
                id: category.id.toString()+(category.applianceList.length+1),
                title: data.title
            })
        }

        await BaseStorageService.setData(storageKey, applianceData)
    }
}

export default ApplianceService;