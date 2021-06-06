import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const getEvents = createAsyncThunk('calendarApp/events/getEvents', async () => {
	console.log('getting events');
	const response = await axios.get('http://localhost:5002/api/calendar/');
	const data = await response.data;
	const events = data.map(event => {
		event.id = event._id;
		return event;
	});
	return events;
});

export const addEvent = createAsyncThunk('calendarApp/events/addEvent', async (newEvent, { dispatch }) => {
	console.log('i am new event', newEvent);
	const response = await axios.post('http://localhost:5002/api/calendar/addEvent', newEvent);
	console.log(response);
	const data = await response.data;
	getEvents();
	return data;
});

export const updateEvent = createAsyncThunk('calendarApp/events/updateEvent', async (event, { dispatch }) => {
	console.log('i am update event', event);
	const response = await axios.put('http://localhost:5002/api/calendar', event);
	console.log('respone of an update', response);
	const data = await response.data;

	return data;
});

export const removeEvent = createAsyncThunk('calendarApp/events/remove-event', async (eventId, { dispatch }) => {
	console.log(eventId);
	const response = await axios.delete('http://localhost:5002/api/calendar', { data: { id: eventId } });
	const data = await response.data;
	console.log(data);

	return data.id;
});

const eventsAdapter = createEntityAdapter({});

export const {
	selectAll: selectEvents,
	selectIds: selectEventIds,
	selectById: selectEventById
} = eventsAdapter.getSelectors(state => state.calendarApp.events);

const eventsSlice = createSlice({
	name: 'calendarApp/events',
	initialState: eventsAdapter.getInitialState({
		eventDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		openNewEventDialog: {
			prepare: event => {
				const payload = {
					type: 'new',
					props: {
						open: true
					},
					data: {
						start: moment(event.start).format(dateFormat).toString(),
						end: moment(event.end).format(dateFormat).toString()
					}
				};
				return { payload };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload;
			}
		},
		openEditEventDialog: {
			prepare: event => {
				const payload = {
					type: 'edit',
					props: {
						open: true
					},
					data: {
						...event,
						start: moment(event.start).format(dateFormat).toString(),
						end: moment(event.end).format(dateFormat).toString()
					}
				};
				return { payload };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload;
			}
		},
		closeNewEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		closeEditEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[getEvents.fulfilled]: eventsAdapter.setAll,
		[addEvent.fulfilled]: eventsAdapter.addOne,
		[updateEvent.fulfilled]: eventsAdapter.upsertOne,
		[removeEvent.fulfilled]: eventsAdapter.removeOne
	}
});

export const {
	openNewEventDialog,
	closeNewEventDialog,
	openEditEventDialog,
	closeEditEventDialog
} = eventsSlice.actions;

export default eventsSlice.reducer;
