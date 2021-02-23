import temp,{webpack} from './libs/far';
import img from './image/14.jpg';
import './css/index.css';
import webpackNote from './data/webpack.md';

webpack();

console.log(temp);

const image = new Image();

image.src = img;

document.body.appendChild(image);

document.body.innerHTML += webpackNote;