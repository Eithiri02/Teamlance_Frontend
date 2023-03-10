import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { history, fetchWrapper } from '_helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        error: null,
        loading: false,
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.user = null;
        localStorage.removeItem('user');
        history.navigate('/');
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/Users`;

    return {
        login: login()
    };    

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ email, password }) => await fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
        );
    }
}

function createExtraReducers() {
    return {
        ...login()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.loading = true;
            },
            [fulfilled]: (state, action) => {
                const user = action.payload;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;
                state.loading = false;
                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate("/projects");
            },
            [rejected]: (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            }
        };
    }
}
