export class chatWidget {
    constructor({position,primaryColor,avatar}) {
        this.position = this.getPosition(position);
        this.chatPosition = this.chatBoxPosition(position);
        this.primaryColor = primaryColor;
        this.avatar = avatar;
        this.open = false;
        this.initialise();
        this.createStyles();
    }

    getPosition(position) {
        const [vertical, horizontal] = position.split('-');
        return {
            [vertical]: '30px',
            [horizontal]: '30px',
        };
    }

    chatBoxPosition(position) {
        const [vertical, horizontal] = position.split('-');
        return {
            [vertical]: '75px',
            [horizontal]: '-25px'
        }
    }
    
    initialise() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        Object.keys(this.position)
            .forEach(key => container.style[key] = this.position[key]);
        document.body.appendChild(container);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container')

        const chatIcon = document.createElement('img');
        chatIcon.src = this.avatar ? this.avatar : 'https://svgshare.com/i/xXv.svg';
        chatIcon.classList.add('icon', this.avatar ? 'avatar':'');
        this.chatIcon = chatIcon;

        const closeIcon = document.createElement('img');
        closeIcon.src = 'https://svgshare.com/i/xXh.svg';
        closeIcon.classList.add('icon', 'hidden');
        this.closeIcon = closeIcon;

        buttonContainer.appendChild(this.chatIcon);
        buttonContainer.appendChild(this.closeIcon);
        buttonContainer.addEventListener('click', this.toggleOpen.bind(this));

        this.messageContainer = document.createElement('div');
        this.messageContainer.classList.add('hidden', 'message-container');
        Object.keys(this.chatPosition)
            .forEach(key => this.messageContainer.style[key] = this.chatPosition[key]);
        
        this.createMessageContainerContent();

        container.appendChild(this.messageContainer);
        container.appendChild(buttonContainer);
    }

    toggleOpen() {
        this.open = !this.open;
        if (this.open) {
            this.chatIcon.classList.add('hidden');
            this.closeIcon.classList.remove('hidden');
            this.messageContainer.classList.remove('hidden');
        } else {
            this.createMessageContainerContent();
            this.chatIcon.classList.remove('hidden');
            this.closeIcon.classList.add('hidden');
            this.messageContainer.classList.add('hidden');
        }
    }

    createMessageContainerContent() {
        this.messageContainer.innerHTML = '';
        const title = document.createElement('h2');
        title.textContent = `We're not here, drop us an email...`;

        const form = document.createElement('form');
        form.classList.add('content');
        const email = document.createElement('input');
        email.required = true;
        email.id = 'email';
        email.type = 'email';
        email.placeholder = 'Enter your email address';

        const message = document.createElement('textarea');
        message.required = true;
        message.id = 'message';
        message.placeholder = 'Your message';
 
        const btn = document.createElement('button');
        btn.textContent = 'Submit';
        form.appendChild(email);
        form.appendChild(message);
        form.appendChild(btn);
        form.addEventListener('submit', this.submit.bind(this));

        this.messageContainer.appendChild(title);
        this.messageContainer.appendChild(form);

    }

    submit(event) {
        event.preventDefault();
        const formSubmission = {
            email: event.srcElement.querySelector('#email').value, 
            message: event.srcElement.querySelector('#message').value,
        };

        this.messageContainer.innerHTML = '<h2>Thanks for your submission.</h2><p class="content">Someone will be in touch with your shortly regarding your enquiry';
        
        console.log(formSubmission);
    }

    createStyles() {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            .icon {
                cursor: pointer;
                width: 70%;
                position: absolute;
                top: 9px;
                left: 9px;
                transition: transform .3s ease;
            }
            .avatar {
                width: 100%;
                top: 0;
                left: 0;
                border-radius: 50%;
            }
            .hidden {
                transform: scale(0);
            }
            .button-container {
                background-color: ${this.primaryColor};
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .message-container {
                box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
                width: 90vw;
                max-width: 400px;
                max-height: 400px;
                position: absolute;
                transition: max-height .2s ease;
                font-family: Helvetica, Arial ,sans-serif;
                background-color: #f9fafb;
            }
            .message-container.hidden {
                max-height: 0px;
            }
            .message-container h2 {
                margin: 0;
                padding: 20px 20px;
                color: #fff;
                background-color: ${this.primaryColor};
            }
            .message-container .content {
                margin: 20px 10px ;
                border: 1px solid #dbdbdb;
                padding: 10px;
                display: flex;
                flex-direction: column;
            }
            .message-container form * {
                margin: 5px 0;
            }
            .message-container form input {
                padding: 10px;
                border: 1px solid #dbdbdb;
                outline: 1px solid #dbdbdb;
            }
            .message-container form textarea {
                height: 100px;
                padding: 10px;
                border: 1px solid #dbdbdb;
                outline: 1px solid #dbdbdb;
            }
            .message-container form textarea::placeholder {
                font-family: Helvetica, Arial ,sans-serif;
            }
            .message-container form button {
                cursor: pointer;
                background-color: ${this.primaryColor};
                color: #fff;
                border: 0;
                border-radius: 4px;
                padding: 10px;
            }
            .message-container form button:hover {
                opacity: 0.9;
            }
        `.replace(/^\s+|\n/gm, '');
        document.head.appendChild(styleTag);
    }

}