import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBarComp = ({ title }) => {
    return (
        <Appbar.Header
        style={{ backgroundColor: '#cdcdcd' }}
    >
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title={title} />
    </Appbar.Header>
    )
}

export default AppBarComp;