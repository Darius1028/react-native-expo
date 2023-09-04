import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@zellosoft/antd-react-native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between', // Alinea elementos a la derecha
	},
	buttonContainer: {
		flexDirection: 'row', // Coloca botones en fila horizontal
	},
	button: {
		width: 50,
		maxHeight: 50,
		marginLeft: 5, // Agregar margen izquierdo entre botones si es necesario
	},
	column: {
		fontSize: 11,
	},
});

const UserItem = ({ user, onEdit, onDelete }) => {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text>Nombre:</Text>
				<Text>{user.name}</Text>
			</View>
			<View style={styles.column}>
				<Text>Correo electrónico:</Text>
				<Text>{user.email}</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					onPress={() => onEdit(user.id)}
					type="primary"
					style={styles.button}
				>
					<AntDesign name="edit" size={11} color="white" />
				</Button>
				<Button
					onPress={() => onDelete(user.id)}
					type="primary"
					style={styles.button}
				>
					<AntDesign name="delete" size={11} color="white" />
				</Button>
			</View>
		</View>
	);
};

export default UserItem;
