import hello from "./lib.js";
import data from './data/data.txt';
import img from './image/14.jpg';
import css from './css/index.css';

hello();

console.log('data',data);


const image = document.createElement('img');
image.src = img;
document.body.appendChild(image);



// const style = document.createElement('style');
//
// style.innerHTML = css.toString();
// console.log('css',css.toString());
//
// document.head.appendChild(style);
