import {createContext, useState, useEffect} from "react";
import ApplianceService from "../services/ApplianceService";

export const ApplianceContext = createContext();

export const ApplianceProvider = (props) => {
    const [applianceData, setApplianceData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let data = await ApplianceService.getAppliance();
            setApplianceData(data)
            return data
        }

        if (!applianceData.length) {
            getData();
        }
    });

    return (
        <ApplianceContext.Provider
            value={{
                applianceData,
                setApplianceData
            }}
        >
            {props.children}
        </ApplianceContext.Provider>
    );
}