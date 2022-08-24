import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';

let ContextOne = React.createContext()
let initialState = {
    offset: 0,
    version: 0,
    courses: []
  };
let reducer = (state, action) => {
    switch (action.type) {
        case "loadData":
            return { ...state, ...action.payload, version: state.version + 1 };
        case "setCourses":
            return { ...state, courses: action.payload, version: state.version + 1 };
        case "setOffset":
            return { ...state, offset: action.payload };
    }
}
function ContextOneProvider(props) {
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };
    React.useEffect(() => {
        if(state.version > 0) {
        const jsonValue = JSON.stringify(state)
        AsyncStorage.setItem('DATABASE', jsonValue);
        }
    }, [state.version]);
    React.useEffect(() => {
        console.log('load data')
        AsyncStorage.getItem('DATABASE')
        .then((value) => {
        const jsonValue = value != null ? JSON.parse(value) : initialState;
        console.log('jsonValue ', jsonValue)
        dispatch({ type: 'loadData', payload: jsonValue})
        });
    }, [])
    return (
        <ContextOne.Provider value={value}>{props.children}</ContextOne.Provider>
    );

}
const API_URL = 'https://itunes.apple.com/search?limit=100&';


const HomeRoute = () => <HomeScreen contextOne={ContextOne} />;

const CertificateRoute = () => <Text>Certificate</Text>;

const MyCourseRoute = () => <Text>My Course</Text>;

const MyProfileRoute = () => <Text>My Profile</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home-circle', unfocusedIcon: 'home-circle'},
    { key: 'certificate', title: 'MyCert', focusedIcon: 'certificate' },
    { key: 'mycourse', title: 'MyCourse', focusedIcon: 'book-open-blank-variant' },
    { key: 'myprofile', title: 'MyProfile', focusedIcon: 'account-settings', unfocusedIcon: 'account-settings' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    certificate: CertificateRoute,
    mycourse: MyCourseRoute,
    myprofile: MyProfileRoute,
  });

  const Stack = createStackNavigator();


  return (
    <ContextOneProvider>
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    </ContextOneProvider>
  );
};

export default MyComponent;