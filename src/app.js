import { chatWidget } from "./chatWidget.js";

let position = 'bottom-right';
let primaryColor = '#6d28d9';
let avatar = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100';

const widget = new chatWidget({
    position,
    primaryColor,
    avatar
})