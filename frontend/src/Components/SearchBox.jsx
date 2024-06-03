import React from 'react';

const SearchBox = (props) => {
	return (
		<div>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search...'
				style={{ width: '300px' }}
			></input>
		</div>
	);
};

export default SearchBox;
