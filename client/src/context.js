import React, { useState, useEffect } from 'react';
import items from './data';

const RoomProvider = ({ children }) => {
	const [data, setData] = useState({
		rooms: [],
		sortedRooms: [],
		featuredRooms: [],
		loading: true
	});

	useEffect(() => {
		let rooms = formatData(items);
		let featuredRooms = rooms.filter(room => room.featured === true);
		setData({
			rooms,
			featuredRooms,
			sortedRooms: rooms,
			loading: false
		});
	}, []);

	const formatData = items => {
		let tempItems = items.map(item => {
			let id = item.sys.id;
			let images = item.fields.images.map(image => image.fields.file.url);

			let room = { ...item.fields, images, id };
			return room;
		});
		return tempItems;
	};

	const getRoom = slug => {
		let tempRooms = [...data.rooms];
		let roomSlug = tempRooms.find(room => room.slug === slug);
		return roomSlug;
	};

	return (
		<RoomContext.Provider value={{ ...data, getRoom }}>
			{children}
		</RoomContext.Provider>
	);
};

export const RoomContext = React.createContext();
export const RoomConsumer = RoomContext.Consumer;

export default RoomProvider;
