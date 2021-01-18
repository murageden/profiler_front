import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppRouter from "./router"
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>,
    document.getElementById('root')
);