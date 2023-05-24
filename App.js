import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, FlatList } from 'react-native';

/* serviceStatus
 * 1 - low
 * 2 - normal (1 month due date)
 * 3 - high (1 week due date)
 */
const DATA = [
  {
    id: 1,
    title: 'Автомобілі',
    applianceList: [
      {
        id: 11,
        title: 'Opel GrandlandX',
        serviceDate: '',
        serviceStatus: 3
      },
      {
        id: 12,
        title: 'Nissan Micra',
        serviceDate: '',
        serviceStatus: 2
      },
      {
        id: 13,
        title: 'Kia Sorento',
        serviceDate: '',
        serviceStatus: 1
      }
    ]
  },
  {
    id: 2,
    title: 'Фільтри',
    applianceList: [
      {
        id: 21,
        title: 'Вугільний',
        serviceDate: '',
        serviceStatus: 1
      },
      {
        id: 22,
        title: 'Механічний',
        serviceDate: '',
        serviceStatus: 2
      }
    ]
  },
  {
    id: 3,
    title: 'Аккумулятори',
    applianceList: [
      {
        id: 31,
        title: 'Mi Powerbank',
        serviceDate: '',
        serviceStatus: 3
      },
      {
        id: 32,
        title: 'EcoFlow',
        serviceDate: '',
        serviceStatus: 1
      }
    ]
  },
  {
    id: 4,
    title: 'Інше',
    applianceList: []
  }
];

const CategoryItem = ({category}) => {
  console.log(category)
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{category.title}</Text>
      <FlatList
          data={category.applianceList}
          renderItem={({item}) => <ApplianceItem appliance={item} />}
          keyExtractor={appliance => appliance.id}
      />
    </View>
  )
}

const ApplianceItem = ({appliance}) => {
  console.log(appliance)
  return (
      <View style={styles.item}>
        <Text style={styles.title}>{appliance.title}</Text>
      </View>
  )
}
const App = () => {
  return (
      <SafeAreaView style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <FlatList
            data={DATA}
            renderItem={({item}) => <CategoryItem category={item} />}
            keyExtractor={item => item.id}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default App;