import * as React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper'
import AppBarComp from '../components/AppBarComp';
import CourseItem from '../components/CourseItem';

const API_URL = 'https://itunes.apple.com/search?limit=100&';


const HomeScreen = ({ contextOne }) => {
    let { state, dispatch } = React.useContext(contextOne);
    async function fetchCourseData(offset) {
        console.log('fetchCourseData invoked')
        dispatch({type: 'setOffset', payload: offset})
        const response = await fetch(API_URL+'offset='+offset+'&term=love');
        fetchResults(await response.json());
        
    }
    const fetchResults = (data) => {
        dispatch({type: 'setCourses', payload: data.results})
    };
    const renderItem = ({ item }) => {
        return <CourseItem trackData={item} />
    }
    React.useEffect(() => {
        fetchCourseData(state.offset + 1)
    }, [0]);
    return (
        <>
            <AppBarComp title='Home' />
            <View style={styles.content}>
                {/* <Text>Home Screen. Offset = {state.offset}</Text> */}
                {/* <Button onPress={() => fetchCourseData(state.offset+1)}>Next</Button> */}
                <FlatList
                    data={state.courses}
                    renderItem={renderItem}
                    keyExtractor={item => item.trackId}
                    onEndReached={() => fetchCourseData(state.offset + 1)}
                    />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      padding: 8,
    },
  });

export default HomeScreen;