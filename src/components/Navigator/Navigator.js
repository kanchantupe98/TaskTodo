import ToDoList from '../../components/ToDoList/ToDoList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddToDo from '../../components/AddToDo/AddToDo';
const RootStack = createNativeStackNavigator({
	screens: {
		ToDoList: ToDoList,
		AddToDo: AddToDo,
	},
});
export default RootStack;
