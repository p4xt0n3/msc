/*
  StellarMusic catalog
  -------------------
  Put your public GitHub repository in MUSIC_REPO, then point each track's
  file at its path inside that repository. Example:

  const MUSIC_REPO = 'https://raw.githubusercontent.com/your-name/your-repo/main';
  src: githubFile('fan-powers.mp3'),
  lyrics: githubFile('fanpower.lrc')

  GitHub repositories must be public for the browser audio player to reach them.
*/
const MUSIC_REPO = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main';
const githubFile = (path) => `${MUSIC_REPO}/${path}`;

const musicCatalog = {
  artists: [
    {
      id: 'z-j', name: 'Z.J.', genre: 'Pop & Synth', initials: 'ZJ', artClass: 'artist-zj',
      bio: 'Polished pop, luminous synths, and late-night hooks for moving through the city.',
      albums: [
        { id: 'fan-powers', title: 'Fan Powers', year: '', artClass: 'art-neon', tracks: [
          { id: 'zj-fan-powers', title: 'Fan Powers', duration: '—', src: githubFile('fan-powers.mp3'), lyrics: githubFile('fanpower.lrc') },
          { id: 'zj-include', title: 'Include', duration: '—', src: githubFile('include.mp3') },
          { id: 'zj-masses', title: 'Masses', duration: '—', src: githubFile('masses.mp3') },
          { id: 'zj-excitement', title: 'Excitement', duration: '—', src: githubFile('excitement.mp3') },
          { id: 'zj-very-nice-to-see-you', title: 'Very nice to See You', duration: '—', src: githubFile('very-nice-to-see-you.mp3') },
          { id: 'zj-in-the-night', title: 'In The Night', duration: '—', src: githubFile('in-the-night.mp3') }
        ] }
      ]
    },
    {
      id: 'the-old-duke', name: 'The Old Duke', genre: 'Classical Music', initials: 'OD', artClass: 'artist-duke',
      bio: 'Quiet rooms, grand arrangements, and timeless compositions for deep listening.',
      albums: [
        { id: 'classic-1', title: 'Classic #1', year: '', artClass: 'art-rooms', tracks: [
          { id: 'duke-winter-night', title: 'Winter Night', duration: '—', src: githubFile('winter-night.mp3') },
          { id: 'duke-dogs-and-cats', title: 'Dogs & Cats', duration: '—', src: githubFile('dogs-and-cats.mp3') },
          { id: 'duke-naturals', title: 'Naturals', duration: '—', src: githubFile('naturals.mp3') },
          { id: 'duke-peaceful-moment', title: 'Peaceful Moment', duration: '—', src: githubFile('peaceful-moment.mp3') },
          { id: 'duke-water', title: 'Water', duration: '—', src: githubFile('water.mp3') }
        ] }
      ]
    },
    {
      id: 'my-weekdys', name: 'My Weekdys', genre: 'R&B and Jazz', initials: 'MW', artClass: 'artist-weekdys',
      bio: 'Warm basslines, velvet chords, and a little bit of after-hours energy.',
      albums: [
        { id: 'until-we-laugh', title: 'Until We Laugh', year: '', artClass: 'art-sunday-service', tracks: [
          { id: 'weekdys-until-we-laugh', title: 'Until We Laugh', duration: '—', src: githubFile('until-we-laugh.mp3') },
          { id: 'weekdys-here-she-comes', title: 'Here she comes', duration: '—', src: githubFile('here-she-comes.mp3') },
          { id: 'weekdys-hangout', title: 'Hangout', duration: '—', src: githubFile('hangout.mp3') },
          { id: 'weekdys-hangback', title: 'Hangback', duration: '—', src: githubFile('hangback.mp3') },
          { id: 'weekdys-grateful', title: 'Grateful', duration: '—', src: githubFile('grateful.mp3') },
          { id: 'weekdys-happiness-has-no-cost', title: 'Happiness Has no Cost', duration: '—', src: githubFile('happiness-has-no-cost.mp3') },
          { id: 'weekdys-night', title: 'Night', duration: '—', src: githubFile('night.mp3') }
        ] }
      ]
    },
    {
      id: 'nova-lane', name: 'Nova Lane', genre: 'Dream Pop', initials: 'NL', artClass: 'artist-nova',
      bio: 'Soft-focus melodies and wide-open skies, made for the space between places.',
      albums: [
        { id: 'great-times', title: 'Great Times', year: '', artClass: 'art-satellite', tracks: [
          { id: 'nova-centre-city-tour', title: 'Centre City Tour', duration: '—', src: githubFile('centre-city-tour.mp3') },
          { id: 'nova-excellent-times', title: 'Excellent Times', duration: '—', src: githubFile('excellent-times.mp3') },
          { id: 'nova-upon-the-name', title: 'Upon the Name', duration: '—', src: githubFile('upon-the-name.mp3') },
          { id: 'nova-yippee', title: 'Yippee', duration: '—', src: githubFile('yippee.mp3') }
        ] }
      ]
    }
  ]
};

const catalogArtists = musicCatalog.artists;
const catalogTracks = catalogArtists.flatMap((artist) => artist.albums.flatMap((album) => album.tracks.map((track) => ({ ...track, artist: artist.name, artistId: artist.id, album: album.title, albumId: album.id, artClass: album.artClass }))));

function findArtist(id) { return catalogArtists.find((artist) => artist.id === id); }
function findAlbum(id) { return catalogArtists.flatMap((artist) => artist.albums).find((album) => album.id === id); }
function findTrack(id) { return catalogTracks.find((track) => track.id === id); }
