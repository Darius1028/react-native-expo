import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@zellosoft/antd-react-native';

import Text from 'src/components/UIDisplay/Text';

const propTypes = {
	style: PropTypes.object,
};

const defaultProps = {
	style: {},
};

const ToggleTheme = (props) => {
	return (
		<View
			{...props}
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				...props.style,
			}}
		>
			<Text style={{ marginRight: 5 }}> </Text>
		</View>
	);
};

ToggleTheme.propTypes = propTypes;

ToggleTheme.defaultProps = defaultProps;

export default React.memo(ToggleTheme);
