/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import useTheme from 'src/hooks/useTheme';

import View from 'src/components/UIDisplay/View';
import Touchable from 'src/components/UIControls/Touchable';
import CheckBox from 'src/components/UIControls/CheckBox';

const propTypes = {
	value: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired,
	onPress: PropTypes.func,
	disabled: PropTypes.bool,
	isSelected: PropTypes.bool,
	last: PropTypes.bool,
	error: PropTypes.bool,
	inline: PropTypes.bool,
	style: PropTypes.object,
};

const defaultProps = {
	onPress: f => f,
	children: '',
	disabled: false,
	isSelected: false,
	error: false,
	last: false,
	inline: false,
	style: {},
};

const Item = (props) => {
	const { value, style, children, inline, onPress, last, error, isSelected, disabled } = props;
	const theme = useTheme();

	return (
		<Touchable
			onPress={disabled ? f => f : () => {
				onPress(value, children);
			}}
			style={{
				marginBottom: inline ? 0 : 10,
				alignItems: 'flex-start',
				flexDirection: 'row',
				marginRight: (inline && !last) ? 15 : 0,
				...style,
				opacity: disabled ? 0.5 : 1,
			}}
		>
			<CheckBox
				readOnly={isSelected}
				onChange={(disabled || isSelected) ? f => f : (checked) => {
					if (checked) {
						onPress(value, children);
					}
				}}
				value={isSelected}
				innerStyle={{
					borderRadius: 20,
					height: 18,
					width: 18,
					borderColor: error ? theme.brand_error : theme.border_color_base,
				}}
			/>
			{
				children ?
					<View
						color={error ? 'danger' : 'normal'}
						style={{
							lineHeight: 18,
							marginLeft: 10,
							// flex: 1,
							// paddingRight: 15,
							...(!inline ? {
								flex: 1,
							} : {}),
						}}
					>
						{children}
					</View> :
					null
			}
		</Touchable>
	);
};

Item.propTypes = propTypes;

Item.defaultProps = defaultProps;

export default Item;
