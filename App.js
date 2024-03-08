import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import RootStack from './src/components/Navigator/Navigator';
import { createStaticNavigation } from '@react-navigation/native';
import { store } from './src/Store/Store';
import { Provider } from 'react-redux';

const App = () => {
	const Navigation = createStaticNavigation(RootStack);
	return (
		<Provider store={store}>
			<SafeAreaView style={{ flex: 1 }}>
				<Navigation />
			</SafeAreaView>
		</Provider>
        );
    };
    
    export default App;
    
    const styles = StyleSheet.create({});