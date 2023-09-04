import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, Toast } from '@zellosoft/antd-react-native';

import { KeyboardAvoidingView, Platform } from 'react-native';

import { login } from 'src/redux/actions/auth';

import Text from 'src/components/UIDisplay/Text';
import View from 'src/components/UIDisplay/View';
import Container from 'src/components/Layout/Container';
import Logo from 'src/components/Layout/Logo';
import Form from 'src/components/UIControls/Form';
import InputText from 'src/components/UIControls/InputText';
import InputPassword from 'src/components/UIControls/InputPassword';

import { useRouter, Link } from 'expo-router';

const propTypes = {};
const defaultProps = {};

const SignInScreen = (props) => {
	const [loading, setLoading] = React.useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const inputPass = React.useRef();
	const [form] = Form.useForm();

	const handleSubmitFrom = React.useCallback(async (values) => {
		try {
			setLoading(true);
			await dispatch(await login(values));

			Toast.loading('Loading...', 0.3, () => {
				router.replace('/');
			});
		} catch (error) {
			Toast.fail({
				content: error.message || error.toString,
			});
		} finally {
			setLoading(false);
		}
	}, [dispatch, router]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{
				flex: 1,
			}}
		>
			<Container
				headerShown
				headerTransparent
				loading={loading}
				showIndicator={false}
			>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						marginTop: 20,
					}}
				>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							marginTop: 20,
						}}
					>
						<Logo size={100} />
					</View>
					<Form
						form={form}
						onFinish={handleSubmitFrom}
						initialValues={{
							email: 'juan@hotmail.com',
							password: '1234567',
						}}
					>
						<Form.Field
							name="email"
							rules={[
								{
									type: 'email',
									message: 'Invalid email',
								},
								{
									required: true,
									whitespace: false,
									message: 'Required Information',
								},
							]}
							style={{
								marginBottom: 20,
							}}
						>
							<InputText
								placeholder="Email"
								type="email"
								autoCapitalize="none"
								blurOnSubmit={false}
								onSubmitEditing={() => { inputPass?.current?.focus(); }}
							/>
						</Form.Field>
						<Form.Field
							name="password"
							rules={[
								{
									required: true,
									message: 'Required Information',
								},
							]}
							style={{
								marginBottom: 10,
							}}
						>
							<InputPassword
								ref={inputPass}
								placeholder="Password"
								secureTextEntry
								returnKeyType="go"
								onSubmitEditing={form.submit}
							/>
						</Form.Field>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginBottom: 20,
								marginTop: 10,
							}}
						>

							<Link href="/forgot-password" asChild>
								<Text
									style={{

									}}
									type="link"
								>
									Forgot password?
								</Text>
							</Link>
							<Link href="/signup" asChild>
								<Text
									style={{
										textAlign: 'right',
									}}
									type="link"
								>
									Sign up
								</Text>
							</Link>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Button
								onPress={form.submit}
								loading={loading}
								type="primary"
								style={{
									flex: 1,
								}}
							>
								Login
							</Button>
						</View>
					</Form>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'flex-end',
					}}
				>
					<Text
						style={{
							marginTop: 30,
							marginBottom: 0,
							textAlign: 'center',
						}}
						type="note"
					>
						2023
					</Text>
				</View>
			</Container>
		</KeyboardAvoidingView>
	);
};

SignInScreen.propTypes = propTypes;

SignInScreen.defaultProps = defaultProps;

export default SignInScreen;
