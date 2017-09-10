import React from 'react';
import { render } from 'react-dom';
import Header from './src/components/Header';

render(
    <Header cat={5} ></Header>, document.getElementById('app')
    );