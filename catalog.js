/*
  StellarMusic catalog
  -------------------
  The catalog describes the music shown in the app. Tracks without an
  imported recording are given playable demo audio by app.js automatically.
*/
const musicCatalog = {
  artists: [
    {
      id: 'z-j', name: 'Z.J.', genre: 'Pop & Synth', initials: 'ZJ', artClass: 'artist-zj',
      bio: 'Polished pop, luminous synths, and late-night hooks for moving through the city.',
      albums: [
        { id: 'fan-powers', title: 'Fan Powers', year: '', artClass: 'art-neon', tracks: [
          { id: 'zj-fan-powers', title: 'Fan Powers', duration: '—', src: './fanpowers.mp3' },
          { id: 'zj-include', title: 'Include', duration: '—', src: './include.mp3' },
          { id: 'zj-masses', title: 'Masses', duration: '—', src: './masses.mp3' },
          { id: 'zj-excitement', title: 'Excitement', duration: '—', src: './excitement.mp3' },
          { id: 'zj-very-nice-to-see-you', title: 'Very nice to See You', duration: '—', src: './vntsy.mp3' },
          { id: 'zj-in-the-night', title: 'In The Night', duration: '—', src: './inthenight.mp3' }
        ] }
      ]
    },
    {
      id: 'the-old-duke', name: 'The Old Duke', genre: 'Classical Music', initials: 'OD', artClass: 'artist-duke',
      bio: 'Quiet rooms, grand arrangements, and timeless compositions for deep listening.',
      albums: [
        { id: 'classic-1', title: 'Classic #1', year: '', artClass: 'art-rooms', tracks: [
          { id: 'duke-winter-night', title: 'Winter Night', duration: '—' },
          { id: 'duke-dogs-and-cats', title: 'Dogs & Cats', duration: '—' },
          { id: 'duke-naturals', title: 'Naturals', duration: '—' },
          { id: 'duke-peaceful-moment', title: 'Peaceful Moment', duration: '—' },
          { id: 'duke-water', title: 'Water', duration: '—' }
        ] }
      ]
    },
    {
      id: 'my-weekdys', name: 'My Weekdys', genre: 'R&B and Jazz', initials: 'MW', artClass: 'artist-weekdys',
      bio: 'Warm basslines, velvet chords, and a little bit of after-hours energy.',
      albums: [
        { id: 'until-we-laugh', title: 'Until We Laugh', year: '', artClass: 'art-sunday-service', tracks: [
          { id: 'weekdys-until-we-laugh', title: 'Until We Laugh', duration: '—' },
          { id: 'weekdys-here-she-comes', title: 'Here she comes', duration: '—' },
          { id: 'weekdys-hangout', title: 'Hangout', duration: '—' },
          { id: 'weekdys-hangback', title: 'Hangback', duration: '—' },
          { id: 'weekdys-grateful', title: 'Grateful', duration: '—' },
          { id: 'weekdys-happiness-has-no-cost', title: 'Happiness Has no Cost', duration: '—' },
          { id: 'weekdys-night', title: 'Night', duration: '—' }
        ] }
      ]
    },
    {
      id: 'nova-lane', name: 'Nova Lane', genre: 'Dream Pop', initials: 'NL', artClass: 'artist-nova',
      bio: 'Soft-focus melodies and wide-open skies, made for the space between places.',
      albums: [
        { id: 'great-times', title: 'Great Times', year: '', artClass: 'art-satellite', tracks: [
          { id: 'nova-centre-city-tour', title: 'Centre City Tour', duration: '—' },
          { id: 'nova-excellent-times', title: 'Excellent Times', duration: '—' },
          { id: 'nova-upon-the-name', title: 'Upon the Name', duration: '—' },
          { id: 'nova-yippee', title: 'Yippee', duration: '—' }
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
