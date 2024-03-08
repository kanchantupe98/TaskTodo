import {
	Keyboard,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewToDoData } from '../../Store/ToDoSlice';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const AddToDo = () => {
	const [toDoVale, setToDoValue] = useState('');
	const [isSelected, setSelected] = useState('');
	const dispatch = useDispatch();
	const list = useSelector((state) => state?.todolist?.data);
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<Pressable
				onPress={() => {
					Keyboard.dismiss();
				}}
				style={{ flex: 1 }}
			>
				<View style={styles.topView}>
					<Text style={styles.headerText}>ADD Your New To Do: </Text>

					<View style={styles.TextInputView}>
						<TextInput
							style={styles.TextInputStyle}
							value={toDoVale}
							onChangeText={(val) => {
								setToDoValue(val);
							}}
						/>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ marginTop: 20, flexDirection: 'row' }}>
							<Text style={styles.checkText}>Active: </Text>
							<TouchableOpacity
								style={styles.checkBox}
								onPress={() => {
									setSelected(!isSelected);
								}}
							>
								{isSelected == true ? (
									<>
										<AntDesign name="checkcircle" size={18} color="black" />
									</>
								) : (
									<MaterialIcons name="radio-button-unchecked" size={18} color="black" />
								)}
							</TouchableOpacity>
						</View>
						<View style={{ marginTop: 20, flexDirection: 'row', marginLeft: 20 }}>
							<Text style={styles.checkText}>completed: </Text>
							<TouchableOpacity
								style={styles.checkBox}
								onPress={() => {
									setSelected(!isSelected);
								}}
							>
								{!isSelected == true ? (
									<>
										<AntDesign name="checkcircle" size={18} color="black" />
									</>
								) : (
									<MaterialIcons name="radio-button-unchecked" size={18} color="black" />
								)}
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={styles.bottomView}>
					<TouchableOpacity
						style={styles.ButtonStyle}
						onPress={() => {
							if (toDoVale) {
								const toDoData = {
									userId:
										list && list.length % 20 === 0
											? list[list.length - 1].userId + 1
											: list[list.length - 1].userId,
									id: list && list.length + 1,
									title: toDoVale,
									completed: !isSelected,
								};
								dispatch(AddNewToDoData(toDoData));
								setToDoValue('');
								Keyboard.dismiss();
							}
						}}
					>
						<Text style={styles.buttonText}>ADD</Text>
					</TouchableOpacity>
				</View>
			</Pressable>
		</View>
	);
};

export default AddToDo;

const styles = StyleSheet.create({
	topView: {
		height: '70%',
		width: '100%',
		backgroundColor: '#000',
		borderBottomRightRadius: 60,
		borderBottomLeftRadius: 60,
		justifyContent: 'center',
		padding: 20,
	},
	headerText: { color: '#ffff', fontSize: 25, fontWeight: '700', marginBottom: 5 },
	checkText: { color: '#ffff', fontSize: 18, fontWeight: '700', marginBottom: 2 },
	TextInputView: {
		minHeight: '20%',
		width: '100%',
		backgroundColor: '#fff',
		alignSelf: 'center',
		padding: 5,
	},
	checkBox: {
		width: 20,
		height: 20,
		backgroundColor: 'white',
		borderRadius: 15,
		justifyContent: 'center',
		alignSelf: 'center',
		padding: 1,
	},

	TextInputStyle: {
		width: '100%',
		minHeight: '20%',
		fontSize: 18,
	},
	bottomView: {
		height: '30%',
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	ButtonStyle: {
		width: '70%',
		backgroundColor: '#000',
		height: 60,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	buttonText: { color: '#ffff', fontSize: 25, fontWeight: '700' },
});
