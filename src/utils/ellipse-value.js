const ellipse = (text = '', mark, width = 10) => {
	if (text.length <= width * 2) {
		return text;
	}

	let hiddenText = '...';

	if (mark) {
		const markLength = text.length - (width * 2);

		if (markLength > 0) {
			hiddenText = Array(markLength).fill('x').join('');
		}
	}

	return `${text.slice(0, width)}${hiddenText}${text.slice(-width)}`;
};

export default ellipse;
