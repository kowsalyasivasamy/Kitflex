export async function fetchShows() {
    const response = await fetch("https://api.tvmaze.com/shows?page=1");
    return response.json();
}

export async function searchShows(searchKey) {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchKey}`);
    return response.json();
}
