import { refs } from '../../../refs/refs';
import { state } from '../../../data/data';
import { deleteUserById } from '../../../api/api';
import { createUserForm } from '../usersForm/usersForm';

const createUsersMurkup = () => {
    return state.data.users.reduce((acc, user) => {
        acc += `<li data-id=${user.id}>
            <img src=${user.avatar ? user.avatar : ''} alt="">
            <h2>Email:${user.email}</h2>
            <p>Id:${user.localId}</p>
            <button data-btn="edit">Edit</button>
            <button data-btn="delete">Delete</button>
        </li>`;
        return acc;
    }, '');
};

export const createUsersList = () => {
    refs.content.innerHTML = `
        <div class="flexible">
            <ul class="usersList">${createUsersMurkup()}</ul>
            <div class="usersDataContent"></div>
        </div>
        `;
    const usersList = document.querySelector('.usersList');

    const options = event => {
        if (event.target.dataset) {
            if (event.target.dataset.btn === 'edit') {
                const id = event.target.closest('[data-id]').dataset.id;
                // console.log('edit');
                createUserForm(id);
            } else if (event.target.dataset.btn === 'delete') {
                const id = event.target.closest('[data-id]').dataset.id;
                // console.log('delete');
                deleteUserById(id);
            } else return;
        } else return;
    };
    usersList.addEventListener('click', options);
};
