const vids = [
  {
    mp4Source:
      'https://player.vimeo.com/external/301397451.sd.mp4?s=27d342f4f8073d5ba65f46926200e584e2afbaad&profile_id=164',
    hlsSource:
      'https://player.vimeo.com/external/301397451.m3u8?s=5108d8dce19ca84960e895e5db6bc887c42ca7e5',
    name: 'Elsa Landberg',
    role: 'elsalandberg.com',
    url: '/elsa',
    citat:
      'Jag drömmer om ett Sverige med mer fokus på värde, snarare än traditionella sanningar och normer',
    videoId: 306574431,
    mp4SourceHq:
      'https://player.vimeo.com/external/301397451.hd.mp4?s=e0eeafd4ea047a9eec05d4c178c14d5df6db7df9&profile_id=175',
  },
  {
    name: 'Magnus Enzell',
    role: 'Ämnesråd, Finansdepartementet',
    url: '/magnus',
    mp4Source:
      'https://player.vimeo.com/external/306652847.sd.mp4?s=283c412c6935edb1a4f81b21340e2947f7e3d06f&profile_id=164',
    mp4SourceHq:
      'https://player.vimeo.com/external/306652847.hd.mp4?s=f950951baaccc1879cf0925c1e841491d148e0d0&profile_id=175',
    hlsSource:
      'https://player.vimeo.com/external/306652847.m3u8?s=dbeda8ca086bdcf60320a52ed017f32aa2ba28aa',
    videoId: '306574943',
    citat:
      'Min dröm är att dom kloka tar större plats i samhällsbygget, så att dom tvärsäkra får mindre plats',
  },

  {
    name: 'Ann Molin',
    role: 'Head Project Manager, Hack for Sweden',
    url: '/ann',
    citat:
      'Medborgardriven innovation ett Sverige där alla bidrar till att det blir bättre',
    mp4Source:
      'https://player.vimeo.com/external/306652958.sd.mp4?s=d2769b4bd2fbab8c2564cf442c1d6af053d2f4bc&profile_id=164',
    mp4SourceHq:
      'https://player.vimeo.com/external/306652958.hd.mp4?s=05cfee7eb17f5331474ce83308e70259b618d00a&profile_id=175',
    hlsSource:
      'https://player.vimeo.com/external/306652958.m3u8?s=47e981a9d7b27b155fdfcdee131426a47f8586c6',
    videoId: '306574140',
  },
  {
    name: 'Lovisa',
    role: 'Professional Dreamer',
    url: '/lovisa',
    citat:
      'Att det om några år, kanske 10 eller 20, så kommer världen gå under',
    mp4Source:
      'https://player.vimeo.com/external/306575259.sd.mp4?s=e51ea0f87d603875a55ede007cd75d339820e737&profile_id=164',
    mp4SourceHq:
      'https://player.vimeo.com/external/306575259.hd.mp4?s=d74b18ea597abd15c286b56e52db31944ac1c80d&profile_id=175',
    hlsSource:
      'https://player.vimeo.com/external/306575259.m3u8?s=2e91a86a1f29c533d712a2febe864701baafc712',
    videoId: '306574762',
  },
  {
    mp4Source:
      'https://player.vimeo.com/external/306652895.sd.mp4?s=18f6575a63be8ef757ee6115ab264784059a2fb7&profile_id=164',
    hlsSource:
      'https://player.vimeo.com/external/306652895.m3u8?s=b443b1437bebd4924d288ebe6da771c9382f8ea4',
    mp4SourceHq:
      'https://player.vimeo.com/external/306652895.hd.mp4?s=f23748dd523c7da0c571d8e6864eeb1b9c0f3576&profile_id=175',
    name: 'Olle Lundin',
    role: 'Grundare, Swedish Jobtech',
    url: '/olle',
    videoId: '306575047',
    citat:
      'Jag tror att arbetsmarknaden är en av nycklarna och grunden för att vi kommer må bra i framtiden',
  },
  {
    mp4Source:
      'https://player.vimeo.com/external/301397487.sd.mp4?s=58b0f1560405d56e252d00180ea1a068b6039faf&profile_id=164',
    hlsSource:
      'https://player.vimeo.com/external/301397487.m3u8?s=2c93b46f0dfd5fc725d4690bcd4c911b7af871c7',
    name: 'Filippa Jennersjö',
    mp4SourceHq:
      'https://player.vimeo.com/external/301397487.hd.mp4?s=9216031ac450f54fa8d8980eaf4c6014412c33aa&profile_id=175',
    role: 'CIO, Arbetsförmedlingen',
    url: '/filippa',
    videoId: 306574500,
    citat:
      'Jag har helt övertygad att om vi med teknikutvecklingen har skapat klimatproblemen, så kan vi också fixa dem med teknikutveckling',
  },
  {
    name: 'Jonathan Gustafsson',
    role: 'Developer, Etablera.co',
    url: '/jonathan',
    citat: 'Min dröm för 2045? </br>- En regering',
    teaserImage: '/static/jonathan.jpg',
    fullImage: '/static/jonathan.jpg',
    unique: true,
  },
  {
    name: 'Niklas Tideklev & Jenny Engström',
    role: 'Dialogmakarna',
    url: '/dialogmakarna',
    mp4Source:
      'https://player.vimeo.com/external/306575196.sd.mp4?s=04e652a0b1f4e52826504e256de39375579713f2&profile_id=164',
    mp4SourceHq:
      'https://player.vimeo.com/external/306575196.hd.mp4?s=75b374d65577d62845fd5846ba7ffa9613ee9d47&profile_id=175',
    hlsSource:
      'https://player.vimeo.com/external/306575196.m3u8?s=77684665f1467c76999d449dcc06650f6e3ea529',
    videoId: '306574377',
    citat:
      'Hur kan vi få och nudga människor att agera på ett sätt som är bättre för både dem själva och samhället?',
  },
  {
    name: 'Lexi',
    role: 'Mood Manager & Cat Whisperer',
    url: '/lexi',
    citat: 'Voff',
    mp4Source:
      'https://player.vimeo.com/external/306672540.sd.mp4?s=be9b70d605b9fa22b2fce501ea2b3eb243275d2f&profile_id=164',
    mp4SourceHq:
      'https://player.vimeo.com/external/306672540.hd.mp4?s=b5979d1fad25b1bbc6d602fcb186792db8ba55ec&profile_id=175',
    videoId: 306672498,
  },
  {
    name: 'Erik Nilsson',
    role: 'Community Management, Hack for Sweden',
    url: '/erik',
    citat: 'Jag vill att vem som helst, ska kunna resa var som helst, via VR',
    mp4Source:
      'https://player.vimeo.com/external/306575220.sd.mp4?s=14bccaadfaee75eb0af65e4b0f7d1f02d334e4e7&profile_id=164',
    mp4SourceHq:
      'https://player.vimeo.com/external/306575220.hd.mp4?s=e4727172136d72b17e1753597384beede05e4830&profile_id=175',
    hlsSource:
      'https://player.vimeo.com/external/306575220.m3u8?s=21e4fcb9a68bf74a61bcc7774cff418fc154a42f',
    videoId: '306574467',
  },

  {
    mp4Source:
      'https://player.vimeo.com/external/301397619.sd.mp4?s=d29b715076db67ed05c3896f19a41fee0debaa09&profile_id=164',
    hlsSource:
      'https://player.vimeo.com/external/301397619.m3u8?s=b34a515da0a350c1cd5fe4d8bec46e1b3146ab15',
    mp4SourceHq:
      'https://player.vimeo.com/external/301397619.hd.mp4?s=b5140a1769771a37e07107b85779da9324b42f06&profile_id=175',
    name: 'Matilda George',
    role: 'Director Global Innovation, Ericsson ONE',
    url: '/matilda',
    videoId: 306575014,
    citat: 'Jag vill att Sverige ska va tryggt, hållbart och smart',
  },

  {
    mp4Source:
      'https://player.vimeo.com/external/301397663.sd.mp4?s=38c5e7ccdd63fc4c99c143ad3f8259e0e7e39998&profile_id=164',
    hlsSource:
      'https://player.vimeo.com/external/301397663.m3u8?s=091dc2ec1c9ae4f0737692fc4b6accd210584125',
    mp4SourceHq:
      'https://player.vimeo.com/external/301397663.hd.mp4?s=0d7dfe7eb547ba30e9b7bef047a9b91710d2c9b1&profile_id=175',
    name: 'Oscar Mörke',
    citat:
      'Jag vill att Sverige ska bli mindre styrt av normer och att våra beslut ska vara mindre definitivt',
    role: 'Community Management, Hack for Sweden',
    url: '/oscar',
    videoId: 306575084,
  },

  {
    mp4Source:
      'https://player.vimeo.com/external/301397410.sd.mp4?s=68a4e79474cecf8cc6393443b379bdba97e964b9&profile_id=164',
    hlsSource:
      'https://player.vimeo.com/external/301397410.m3u8?s=b2659122c6f06d10957c89007d06116fffc3a597',
    name: 'Annie Lindmark',
    role: 'Programme Manager, Vinnova',
    url: '/annie',
    videoId: '306574254',
    citat: 'Jag drömmer om att skapa ett samhälle präglat av meningsfullhet',
    mp4SourceHq:
      'https://player.vimeo.com/external/301397410.hd.mp4?s=87a3546c77a4f9e09d7526c80dcb38b79ba5fa9b&profile_id=175',
  },
  {
    mp4Source:
      'https://player.vimeo.com/external/301397712.sd.mp4?s=bd5c3b8765dd4e488ab852ece3af59380f1a18ff&profile_id=164',

    mp4SourceHq:
      'https://player.vimeo.com/external/301397712.hd.mp4?s=04bcda7aab0b2da25939ba4d5b3a8881b384652a&profile_id=175',
    hlsSource:
      'https://player.vimeo.com/external/301397712.m3u8?s=ddc67aff905dfdec3643a77e9a4638e01d05fa34',
    name: 'Susanne Fuglsang',
    role: 'COO, Innovation Pioneers',
    url: '/susanne',
    videoId: 306768166,
    citat: 'En av våra drifkrafter är att förändra världen',
  },
  {
    mp4Source:
      'https://player.vimeo.com/external/301390682.sd.mp4?s=448e503c21e5f2209087cca077ebf83926ee6d72&profile_id=164',
    mp4SourceHq:
      'https://player.vimeo.com/external/301390682.hd.mp4?s=a20e2ac0421c76db55c47adb33a42c326e2ad0f7&profile_id=175',
    hlsSource:
      'https://player.vimeo.com/external/301390682.m3u8?s=13b84732a81bde3714995a218de9c6ad469e4b2b',
    name: 'Anja Melander',
    videoId: '306574073',
    role: 'Head of Culture, SSES',
    url: '/anja',
    citat: 'Ett sverige där man tänker långsiktigt och lyssnar på varandra',
  },

  {
    name: 'Robin the 1st',
    role: 'Professional Troublemaker, Digitalt Innovationscenter',
    url: '/furhat',
    citat: 'Jag drömmer att människor ska acceptera mig',
    teaserImage: '/static/furhat.jpg',
    fullImage: '/static/furhat.jpg',
    unique: true,
  },

  {
    mp4Source:
      'https://player.vimeo.com/external/306652989.sd.mp4?s=e311fca29b90805595667d54751f44513c28ff71&profile_id=164',
    hlsSource:
      'https://player.vimeo.com/external/306652989.m3u8?s=dd598ae43f8e29a12ad6e43aa75c8d31affedbd4',
    mp4SourceHq:
      'https://player.vimeo.com/external/306652989.hd.mp4?s=652965861b64d58222c999c2ed42546f8fb628d5&profile_id=175',
    name: 'Kim Silvasti',
    role: '    ',
    url: '/kim',
    videoId: '306574681',
    citat: 'Jag hoppas Sverige genomsyras av ett cirkulärt hållbarhetstänk',
  },
]

module.exports = vids
