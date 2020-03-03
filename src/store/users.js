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

const getUsers = async (page = 1) => {
  const response = await fetch(`${config.api}/users?_page=${page}`)
  let text = await response.text();

  if (response.ok){
    const usersList = JSON.parse(text);

    users.update(() => usersList);
    pagination.update(oldPagination => {
      const linkHeader = response.headers.get('Link').split(',');
      const { length, [length - 1]: last } = linkHeader;
      const lastPage = Number(last.match('_page=([0-9]+)>')[1]);

      return { ...oldPagination, currentPage: page, lastPage, totalCount: response.headers.get('X-Total-Count')}
    });

    return usersList;
  }

  throw new Error(text)
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

export {
  users,
  userSelected,
  userCountry,
  pagination,
  getUsers,
}
