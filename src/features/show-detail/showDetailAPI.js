export async function getShowInfo(showId) {
  const showInfoRes = await fetch(`https://api.tvmaze.com/shows/${showId}`);
  const seasonsRes = await fetch(
    `https://api.tvmaze.com/shows/${showId}/seasons`
  );
  const episodesRes = await fetch(
    `https://api.tvmaze.com/shows/${showId}/episodes`
  );
  const showInfoJSON = await showInfoRes.json();
  const seasonsResJSON = await seasonsRes.json();
  const episodesResJSON = await episodesRes.json();

  return {
    ...showInfoJSON,
    seasons: seasonsResJSON,
    episodes: episodesResJSON,
  };
}
