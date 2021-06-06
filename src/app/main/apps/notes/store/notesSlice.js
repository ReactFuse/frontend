import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getNotes = createAsyncThunk('notesApp/notes/getNotes', async () => {
	const response = await axios.get('http://localhost:5002/api/note/getNotes');
	let data = await response.data.notes;
	console.log(' data is', data);
	data = data.map(item => {
		item.id = item._id;
		return item;
	});
	console.log('notes array', data);
	return data;
});

export const createNote = createAsyncThunk('notesApp/notes/createNote', async note => {
	const response = await axios.post('http://localhost:5002/api/note/addNote', { note });
	const data = await response.data;
	console.log('notes data', data);
	getNotes();
	return data;
});

export const updateNote = createAsyncThunk('notesApp/notes/updateNote', async note => {
	const response = await axios.put('http://localhost:5002/api/note/updateNote', { note });
	const data = await response.data;
	return data;
});

export const removeNote = createAsyncThunk('notesApp/notes/removeNote', async (noteId, dispatch) => {
	const response = await axios.delete('http://localhost:5002/api/note/deleteNote', { data: { id: noteId } });
	const data = await response.data;
	console.log(data);
	dispatch(getNotes());
	return data.id;
});

const notesAdapter = createEntityAdapter({});

export const {
	selectAll: selectNotes,
	selectEntities: selectNotesEntities,
	selectById: selectNoteById
} = notesAdapter.getSelectors(state => state.notesApp.notes);

const notesSlice = createSlice({
	name: 'notesApp/notes',
	initialState: notesAdapter.getInitialState({ searchText: '', noteDialogId: null, variateDescSize: true }),
	reducers: {
		setNotesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetNotesSearchText: (state, action) => {
			state.searchText = '';
		},
		toggleVariateDescSize: (state, action) => {
			state.variateDescSize = !state.variateDescSize;
		},
		openNoteDialog: (state, action) => {
			state.noteDialogId = action.payload;
		},
		closeNoteDialog: (state, action) => {
			state.noteDialogId = action.null;
		}
	},
	extraReducers: {
		[getNotes.fulfilled]: notesAdapter.setAll,
		[createNote.fulfilled]: notesAdapter.addOne,
		[updateNote.fulfilled]: notesAdapter.upsertOne,
		[removeNote.fulfilled]: notesAdapter.removeOne
	}
});

export const {
	setNotesSearchText,
	resetNotesSearchText,
	toggleVariateDescSize,
	openNoteDialog,
	closeNoteDialog
} = notesSlice.actions;

export default notesSlice.reducer;
