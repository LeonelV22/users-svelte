import {derived, writable} from 'svelte/store/index';
import config from '../../config'
import { countries } from './countries';

let users = writable([]);
let userSelected = writable({});
let pagination = writable({
  currentPage: 1,
  lastPage: null,
  totalCount: null,
});
let userCache = {};

const getUsers = async (page = 1, force = false) => {

  if (!userCache[page] || force) {
    let response = await fetch(`${config.api}/users?_page=${page}`)
    let text = await response.text();

    if (response.ok) {
      userCache[page] = JSON.parse(text);

      pagination.update(oldPagination => {
        const linkHeader = response.headers.get('Link').split(',');
        const { length, [length - 1]: last } = linkHeader;
        const lastPage = Number(last.match('_page=([0-9]+)>')[1]);

        return { ...oldPagination, currentPage: page, lastPage, totalCount: response.headers.get('X-Total-Count')}
      });
    } else {
      throw new Error(text)
    }
  }

  users.update(() => userCache[page]);
  pagination.update(oldPagination => ({ ...oldPagination, currentPage: page }))

  return userCache[page];
}

const userCountry = derived(userSelected,
    async ($userSelected, set) => {
      if($userSelected.id) {
        const newVar = await countries.get($userSelected.country_id);
        return set(newVar);
      }

      return Promise.resolve({})
    },
)

const updateUser = async (user) => {
  userSelected.update(() => ({
      ...user,
      isUpdating: true
  }));

  const response = await fetch(`${config.api}/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(await response.text())
  }

  await getUsers(pagination.currentPage, true);

  userSelected.update(() => ({
    ...user,
    isUpdating: false
  }))
};

export {
  users,
  userSelected,
  userCountry,
  pagination,
  getUsers,
  updateUser,
}
