import React, { useState, useEffect, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultBcg from '../images/room-1.jpeg';
import Banner from '../components/Banner';
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';

const SingleRoom = ({ match }) => {
	const [data, setImage] = useState({
		slug: match.params.slug,
		defaultBcg
	});

	let { getRoom } = useContext(RoomContext);

	const room = getRoom(data.slug);
	console.log(room);

	const handleSetImage = e => {};

	if (!room) {
		return (
			<div className='error'>
				<h3>no room found</h3>
				<Link to='/rooms' className='btn-primary'>
					Back to Rooms
				</Link>
			</div>
		);
	}

	const {
		name,
		description,
		capacity,
		size,
		price,
		extra,
		breakfast,
		pets,
		images
	} = room;

	return (
		<Fragment>
			<StyledHero img={images[0]}>
				<Banner title={`${name} room`}>
					<Link to='/rooms' className='btn-primary'>
						Back to rooms
					</Link>
				</Banner>
			</StyledHero>
			<section className='single-room'>
				<div className='single-room-images'>
					{images.map((image, index) => (
						<img key={index} src={image} alt='room' />
					))}
				</div>
			</section>
		</Fragment>
	);
};

SingleRoom.propTypes = {
	match: PropTypes.object
};

export default SingleRoom;
