import React, {useState, useEffect, useContext} from 'react'
import {TextInput, Text, View, Button, StyleSheet} from 'react-native'
import {Field, Formik} from 'formik'
import {ApplianceContext} from "../contexts/ApplianceContext";
import ApplianceService from "../services/ApplianceService";
import {Picker} from "@react-native-picker/picker";

const EditApplianceScreen = ({navigation, route}) => {
    const {applianceData, setApplianceData} = useContext(ApplianceContext);
    const [loading, setLoading] = useState(true);
    const [appliance, setAppliance] = useState({});
    const categories = ApplianceService.getCategories();

    useEffect( () => {
        const loadData = async () => {
            setAppliance(await ApplianceService.findById(route.params.id))
            setLoading(false)
        }
        loadData();
    }, []);

    const categoriesOptions = []
    for(let i = 0; i < categories.length; i++){
        categoriesOptions.push(
            <Picker.Item label={categories[i].title} value={categories[i].id} key={categories[i].id} />
        )
    }


    return (
        <View>
            {loading ? <Text>'Loading'</Text> : <Formik
                initialValues={{ id: appliance.id, title: appliance.title, categoryId: appliance.categoryId }}
                onSubmit={async( values ) => {
                    await ApplianceService.upsert(values);
                    setApplianceData([]);
                    navigation.navigate('Appliance', {id: appliance.id})
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values , setFieldValue}) => (
                    <View>
                        <Text>Edit appliance screen for {appliance.title}</Text>

                        <Text>
                            Title
                            <TextInput
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                style={styles.input}
                                value={values.title}
                            />
                        </Text>

                        <Text>
                            Category
                            <Picker
                                selectedValue={values.categoryId}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setFieldValue('categoryId', parseInt(itemValue))
                                }
                                }>
                                {categoriesOptions}
                            </Picker>
                        </Text>


                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                )}
            </Formik>}

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderStyle: 'solid',
        width: '100px',
        height: '24px'
    },
});

export default EditApplianceScreen;