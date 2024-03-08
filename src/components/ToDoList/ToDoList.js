import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToDo, setToDoListApiResponse } from '../../Store/ToDoSlice';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SelectDropdown } from 'expo-select-dropdown';
import { Dropdown } from 'react-native-element-dropdown';

const ToDoList = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [listData, setlistData] = useState([]);
	const [isFocus, setIsFocus] = useState(false);
	const [isFocusSort, setIsFocusSort] = useState(false);
	const [value, setValue] = useState('');
	const [valueSort, setValueSort] = useState('');
	const filterArray = [
		{ label: 'All', value: 'All' },
		{ label: 'Active', value: 'Active' },
		{ label: 'Done', value: 'Done' },
	];
	const SortArray = [
		{ label: 'Default', value: 'Default' },
		{ label: 'Most Recent', value: 'Most Recent' },
	];
	const list = useSelector((state) => state?.todolist?.data);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((res) => res.json())
			.then((data) => dispatch(setToDoListApiResponse(data)))
			.catch((e) => console.log(e));
	}, []);

	useEffect(() => {
		const data = list.map((item) => {
			return { ...item, isSelected: false };
		});
		setlistData(data);
	}, [list]);

	const renderItemDate = (item) => {
		return (
			<View style={styles.DropdownBox}>
				<Text style={{ color: '#000000' }}>{item?.label}</Text>
			</View>
		);
	};
	const filterData = (item) => {
		if (item === 'All') {
			setlistData(list);
		} else if (item === 'Done') {
			const completedData = list.filter((item) => item.completed === true);
			setlistData(completedData);
		} else if (item === 'Active') {
			const data = list.filter((item) => item.completed === false);
			setlistData(data);
		}
	};

	return (
		<View style={styles.mainView}>
			<View style={styles.sortFilterView}>
				<View style={styles.sortView}>
					<Text style={styles.sortText}>Sort: </Text>
					<Dropdown
						style={styles.DropdownStyle}
						selectedTextStyle={styles.selectedTextStyle}
						placeholderStyle={styles.placeholderStyle}
						data={SortArray}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder={!isFocusSort ? 'Default' : '...'}
						value={valueSort}
						renderItem={renderItemDate}
						onFocus={() => setIsFocusSort(true)}
						onBlur={() => setIsFocusSort(false)}
						onChange={(item) => {
							setlistData(listData.reverse());
							setValueSort(item.value);
							setIsFocusSort(false);
						}}
					/>
				</View>
				<View style={styles.filterView}>
					<Text style={styles.sortText}>Filter: </Text>
					<Dropdown
						style={styles.DropdownStyle}
						selectedTextStyle={styles.selectedTextStyle}
						placeholderStyle={styles.placeholderStyle}
						data={filterArray}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder={!isFocus ? 'All' : '...'}
						value={value}
						renderItem={renderItemDate}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						onChange={(item) => {
							filterData(item.label);
							setValue(item.value);
							setIsFocus(false);
						}}
					/>
				</View>
			</View>
			<View style={styles.scrollView}>
				<FlatList
				
					data={listData ? listData : []}
					renderItem={({ item, index }) => {
					
						return (
							<View style={styles.flatListView}>
								<TouchableOpacity
									style={styles.checkBox}
									onPress={() => {
										setlistData(
											listData.map((val) => {
												if (val === item) {
													return {
														...val,
														isSelected: val.isSelected ? false : true,
													};
												} else {
													return val;
												}
											})
										);
									}}
								>
									{item.isSelected == true ? (
										<>
											<AntDesign name="checkcircle" size={20} color="black" />
										</>
									) : (
										<MaterialIcons name="radio-button-unchecked" size={20} color="black" />
									)}
								</TouchableOpacity>
								<View style={{ width: '88%', padding: 10 }}>
									<Text style={styles.cardText}>ID: {item.id}</Text>
									<Text style={styles.cardText}>{item.title}</Text>
									<Text style={styles.cardText}>Status: {item.completed ? 'Done' : 'Active'}</Text>
								</View>
								<TouchableOpacity
									style={{ width: 20, height: 20 }}
									onPress={() => {
										dispatch(deleteToDo(item));
									}}
								>
									<AntDesign name="delete" size={20} color="red" />
								</TouchableOpacity>
							</View>
						);
					}}
					keyExtractor={(item, index) => {
						item?.id;
					}}
				/>
			</View>
			<View style={styles.AddToDoView}>
				<TouchableOpacity
					style={styles.AddToDoButton}
					onPress={() => {
						navigation.navigate('AddToDo');
					}}
				>
					<Text style={styles.AddToDoButtonText}>ADD TO DO</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ToDoList;

const styles = StyleSheet.create({
	sortFilterView: {
		height: 50,
		width: '100%',
		borderBottomWidth: 1,
		backgroundColor: 'white',
		borderColor: '#000',
		elevation: 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	mainView: { height: '100%', backgroundColor: '#fff' },
	sortView: { flexDirection: 'row', alignItems: 'center' },
	sortText: { fontSize: 15, fontWeight: '500', color: '#000' },
	DropdownStyle: {
		width: 110,
		height: 25,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 2,
		marginRight: 5,
		borderWidth: 1,
		borderColor: '#000',
	},
	selectedTextStyle: {
		flex: 1,
		color: '#000',
		fontSize: 13,
		fontWeight: '500',
	},
	placeholderStyle: {
		flex: 1,
		color: '#000',
		fontSize: 13,
		paddingHorizontal: 5,
		fontWeight: '500',
	},
	filterView: { flexDirection: 'row', alignItems: 'center' },
	flatListView: {
		minHeight: 80,
		flexDirection: 'row',
		backgroundColor: '#C8C5C5',
		marginBottom: 10,
		marginHorizontal: 5,
		alignItems: 'center',
		borderRadius: 15,
		paddingHorizontal: 10,
	},
	scrollView: { height: '100%', paddingTop: 10, backgroundColor: '#fff', paddingBottom: 160 },
	checkBox: { width: 20, height: 20, backgroundColor: 'white', borderRadius: 15 },
	cardText: { fontSize: 15, fontWeight: '500', color: '#000' },
	AddToDoView: {
		height: '15%',
		width: '100%',
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#000',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		justifyContent: 'center',
	},
	AddToDoButton: {
		width: '80%',
		backgroundColor: '#ffffff',
		alignSelf: 'center',
		height: 60,
		borderRadius: 35,
		justifyContent: 'center',
	},
	AddToDoButtonText: { fontSize: 25, fontWeight: '800', textAlign: 'center', width: '100%' },
	DropdownBox: {
		height: 33,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 10,
		borderBottomWidth: 2,
		borderBottomColor: '#0000',
		backgroundColor: '#fff',
	},
});
