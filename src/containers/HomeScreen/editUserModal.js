/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
	View,
	Text,
	Modal,
	TextInput,
	Button,
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 20,
	},
	errorText: {
		color: 'red',
		fontSize: 10,
		marginBottom: 10,
	},
});

const isValidEmail = (email) => {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return emailRegex.test(email);
};

const isValidPassword = (password) => {
	return password.length >= 6;
};

const EditUserModal = ({ user, onSave, onCancel, isVisible }) => {
	const [editedUser, setEditedUser] = useState({ ...user });
	const [errors, setErrors] = useState({});

	const handleSave = () => {
		const validationErrors = {};

		if (!editedUser.name) {
			validationErrors.name = 'Nombre es requerido';
		}

		if (!editedUser.email) {
			validationErrors.email = 'Correo electrónico es requerido';
		} else if (!isValidEmail(editedUser.email)) {
			validationErrors.email = 'Formato de correo electrónico no válido';
		}

		if (!editedUser.password) {
			validationErrors.password = 'Contraseña es requerida';
		} else if (!isValidPassword(editedUser.password)) {
			validationErrors.password = 'La contraseña debe tener al menos 6 caracteres';
		}

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		onSave(editedUser);
	};

	const handleCancel = () => {
		onCancel();
	};

	return (
		<Modal visible={isVisible} animationType="slide">
			<View style={styles.modalContainer}>
				<Text style={styles.modalTitle}>User</Text>
				<TextInput
					style={styles.input}
					placeholder="Nombre"
					value={editedUser.name}
					onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
				/>
				{errors.name && (
					<Text style={styles.errorText}>{errors.name}</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder="Correo electrónico"
					value={editedUser.email}
					onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
				/>
				{errors.email && (
					<Text style={styles.errorText}>{errors.email}</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder="Contraseña"
					value={editedUser.password}
					onChangeText={(text) => setEditedUser({ ...editedUser, password: text })}
				/>
				{errors.password && (
					<Text style={styles.errorText}>{errors.password}</Text>
				)}
				<View style={styles.buttonContainer}>
					<Button title="Save" onPress={handleSave} />
					<Button title="Cancel" onPress={handleCancel} />
				</View>
			</View>
		</Modal>
	);
};

export default EditUserModal;
