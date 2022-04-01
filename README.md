# React redux - simple example with hooks

## Setup

`npm install`

## Run demo

`npm run start` - Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `redux/counterWithoutHook.js`

Counter is just a number.
No `useCounter` hook.
You can use `getCounter` to get current counter value.

#### `redux/counterWithHook.js`

Counter is just a number.
Has `useCounter` hook and `getCounter`.

#### `redux/counterAsObjectWithHook.js`

Counter is an object which contains multiple counter.
Has `useCounter` hook.
`setCounter(id, newValue)` - sets counter value to newValue. Will add new counter if it doesn't exist.
`increment(id)` - increments counter by 1.
`resetToZero(counterId)` - resets counter to 0.
