const api = require('axios').default;

export function onSearch() {
  let query = prompt("Search:", "Edhi");
  console.log(query);
  // do the actual search and update results
  window.location.href="http://localhost:3000/search/" + query;
}

export function onBookmark(institute_id) {
  const data = { institution_id: institute_id, cookie: "" };
  console.log(data);
  api.post('http://localhost:8000/institutions/bookmark/',  data);
}

export function showBookmarks() {
  window.location.href="http://localhost:3000/bookmarks/";
}
