export async function getShowInfo(showId) {
    const showInfoRes = await fetch(`https://api.tvmaze.com/shows/${showId}`);
    const episodesRes = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
    const showInfoJSON = await showInfoRes.json();
    const episodesResJSON = await episodesRes.json();
    
    return { ...showInfoJSON , episodes: episodesResJSON };
}