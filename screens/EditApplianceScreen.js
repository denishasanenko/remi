import React, {useContext} from 'react'
import {TextInput, Text, View, Button, StyleSheet} from 'react-native'
import {Field, Formik} from 'formik'
import {ApplianceContext} from "../contexts/ApplianceContext";
import ApplianceService from "../services/ApplianceService";

const EditApplianceScreen = ({navigation, route}) => {
    const {applianceData, setApplianceData} = useContext(ApplianceContext);
    const appliance = ApplianceService.findById(applianceData, route.params.id)

    return (
        <Formik
            initialValues={{ id: appliance.id, title: appliance.title, category: appliance.category.title }}
            onSubmit={async( values ) => {
                await ApplianceService.upsert(applianceData, values);
                setApplianceData([]);
                navigation.navigate('Appliance', {id: appliance.id})
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                        <TextInput
                            onChangeText={handleChange('category')}
                            onBlur={handleBlur('category')}
                            style={styles.input}
                            value={values.category}
                        />
                    </Text>


                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
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