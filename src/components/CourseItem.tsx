import React from 'react';
import { Card, Title, Avatar, Button } from 'react-native-paper'
import { Ionicons, AntDesign } from '@expo/vector-icons';


const CourseItem = ({ trackData }) => {
    if(!trackData.trackId) return null
    return (
        <Card style={{ marginVertical: 5 }}>
            <Card.Title
                title={(
                <Title onPress={() => {}}>
                    {trackData.trackName}
                </Title>
                )}
                subtitle={trackData.artistName}
                style={{ paddingVertical: 10, paddingHorizontal: 15 }}
                leftStyle={{ marginRight: 25 }}
                left={(props) => (
                <Avatar.Image
                    size={50}
                    source={{ uri: trackData.artworkUrl100 && trackData.artworkUrl100.replace('100x100', '600x600') }}
                />
                )}
                right={() => null}
            />
            </Card>
    )
}
export default CourseItem;
