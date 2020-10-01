
$(function () {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/ed-sheeran-nothing-on-you-feat.-paulo-londra-dave-sbtv-256kbps-cbr/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Alan Walker - Faded",
                "duration": "03:33",
                "file": "Alan Walker - Faded"
            }, {
                "track": 2,
                "name": "Alan Walker & Ava Max - Alone, Pt. II",
                "duration": "04:05",
                "file": "Alan Walker _ Ava Max - Alone_ Pt. II"
            }, {
                "track": 3,
                "name": "Alec Benjamin - Alamo",
                "duration": "02:22",
                "file": "Alec Benjamin - Alamo"
            }, {
                "track": 4,
                "name": "Alec Benjamin - Demons",
                "duration": "02:45",
                "file": "Alec Benjamin - Demons"
            }, {
                "track": 5,
                "name": "Alec Benjamin - I'm Not A Cynic",
                "duration": "02:16",
                "file": "Alec Benjamin - I_m Not A Cynic"
            }, {
                "track": 6,
                "name": "Alec Benjamin - If We Have Each Other",
                "duration": "03:01",
                "file": "Alec Benjamin - If We Have Each Other"
            }, {
                "track": 7,
                "name": "Alec Benjamin - Just Like You",
                "duration": "02:48",
                "file": "Alec Benjamin - Just Like You"
            }, {
                "track": 8,
                "name": "Alec Benjamin - Let Me Down Slowly",
                "duration": "02:57",
                "file": "Alec Benjamin - Let Me Down Slowly"
            }, {
                "track": 9,
                "name": "Alec Benjamin - Mind Is A Prison",
                "duration": "02:51",
                "file": "Alec Benjamin - Mind Is A Prison"
            }, {
                "track": 10,
                "name": "Alec Benjamin - Match In The Rain",
                "duration": "02:40",
                "file": "Alec Benjamin - Match In The Rain"
            }, {
                "track": 11,
                "name": "Alec Benjamin - Oh My God",
                "duration": "03:12",
                "file": "Alec Benjamin - Oh My God"
            }, {
                "track": 12,
                "name": "Alec Benjamin - Paper Crown",
                "duration": "03:20",
                "file": "Alec Benjamin - Paper Crown"
            }, {
                "track": 13,
                "name": "Alec Benjamin - The Book Of You & I",
                "duration": "03:29",
                "file": "Alec Benjamin - The Book Of You"
            }, {
                "track": 14,
                "name": "Alec Benjamin - The Water Fountain",
                "duration": "03:38",
                "file": "Alec Benjamin - The Water Fountain"
            }, {
                "track": 15,
                "name": "Ariana Grande, Miley Cyrus, Lana Rey - Don’t Call Me Angel",
                "duration": "03:53",
                "file": "Ariana Grande (ft. Miley Cyrus, Lana Del Rey) - Dont Call me Angel"
            }, {
                "track": 16,
                "name": "Ariana Grande, Social House - Boyfriend",
                "duration": "03:41",
                "file": "Ariana Grande, Social House - boyfriend"
            }, {
                "track": 17,
                "name": "Ava Max - Kings & Queens",
                "duration": "02:42",
                "file": "Ava Max - Kings _ Queens"
            }, {
                "track": 18,
                "name": "Ava Max - Salt",
                "duration": "03:01",
                "file": "Ava Max - Salt"
            }, {
                "track": 19,
                "name": "Ava Max - So Am I",
                "duration": "03:14",
                "file": "Ava Max - So Am I"
            }, {
                "track": 20,
                "name": "Ava Max - Torn",
                "duration": "03:21",
                "file": "Ava Max - Torn"
            }, {
                "track": 21,
                "name": "Ava Max - Who's Laughing Now",
                "duration": "03:16",
                "file": "Ava Max - Who_s Laughing Now"
            }, {
                "track": 22,
                "name": "Avicii - SOS (Fan Memories song) ft. Aloe Blacc",
                "duration": "02:38",
                "file": "Avicii - SOS (Fan Memories Song) ft. Aloe Blacc"
            }, {
                "track": 23,
                "name": "Avicii - Waiting For Love",
                "duration": "3:50",
                "file": "Avicii - Waiting For Love"
            }, {
                "track": 24,
                "name": "Avicii - Wake Me Up",
                "duration": "4:32",
                "file": "Avicii - Wake Me Up"
              }, {
                "track": 25,
                "name": "Bazzi feat. Camila Cabello - Beautiful",
                "duration": "3:15",
                "file": "Bazzi feat. Camila Cabello - Beautiful"
            }, {
                "track": 26,
                "name": "Bebe Rexha - I'm A Mess",
                "duration": "03:22",
                "file": "Bebe Rexha - I'm A Mess"
              }, {
                "track": 27,
                "name": "Bebe Rexha - Last Hurrah",
                "duration": "02:31",
                "file": "Bebe Rexha - Last Hurrah"
            }, {
                "track": 28,
                "name": "Bebe Rexha - Meant to Be (feat. Florida Georgia Line)",
                "duration": "02:58",
                "file": "Bebe Rexha - Meant to Be (feat. Florida Georgia Line)"
            }, {
                "track": 29,
                "name": "Calvin Harris & Disciples - How Deep Is Your Love",
                "duration": "04:21",
                "file": "Calvin Harris & Disciples - How Deep Is Your Love"
              }, {
                "track": 30,
                "name": "Calvin Harris & Dua Lipa - One Kiss",
                "duration": "03:43",
                "file": "Calvin Harris & Dua Lipa - One Kiss"
            }, {
                "track": 31,
                "name": "Calvin Harris - Summer",
                "duration": "03:54",
                "file": "Calvin Harris - Summer"
            }, {
                "track": 32,
                "name": "Calvin Harris - This Is What You Came For (ft. Rihanna)",
                "duration": "03:59",
                "file": "Calvin Harris - This Is What You Came For (ft. Rihanna)"
            }, {
                "track": 33,
                "name": "Camila Cabello - My Oh My",
                "duration": "02:52",
                "file": "Camila Cabello - My Oh My"
            }, {
                "track": 34,
                "name": "Camila Cabello - Havana ft. Young Thug",
                "duration": "03:39",
                "file": "Camila_Cabello_-_Havana_ft._Young_Thug"
            }, {
                "track": 35,
                "name": "Charlie Puth - Attention",
                "duration": "03:52",
                "file": "Charlie Puth - Attention"
            }, {
                "track": 36,
                "name": "Charlie Puth - One Call Away",
                "duration": "04:02",
                "file": "Charlie Puth - One Call Away"
            }, {
                "track": 37,
                "name": "Charlie Puth - We Don't Talk Anymore (ft. Selena Gomez)",
                "duration": "03:51",
                "file":  "Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez)"
            }, {
                "track": 38,
                "name": "Charlie Puth - How Long",
                "duration": "03:30",
                "file": "Charlie Puth - _How Long"
            }, {
                "track": 39,
                "name": "Chris Brown - Beat It",
                "duration": "04:16",
                "file": "Chris Brown - Beat It"
            }, {
                "track": 40,
                "name": "Chris Brown - Don't Check On Me (ft. Justin Bieber, Kid Ink)",
                "duration": "03:27",
                "file": "Chris Brown - Don't Check On Me ft. Justin Bieber, Ink"
            }, {
                "track": 41,
                "name": "Chris Brown - Indigo",
                "duration": "03:14",
                "file": "Chris Brown - Indigo"
            }, {
                "track": 42,
                "name": "Chris Brown - Loyal (Explicit) ft. Lil Wayne, Tyga",
                "duration": "4:30",
                "file": "Chris Brown - Loyal (Explicit) ft. Lil Wayne, Tyga"
            }, {
                "track": 43,
                "name": "Chris Brown - Zero",
                "duration": "04:43",
                "file": "Chris Brown - Zero"
            }, {
                "track": 44,
                "name": "Chris Brown, Young Thug - Go Crazy",
                "duration": "03:30",
                "file": "Chris Brown_ Young Thug - Go Crazy"
            }, {
                "track": 45,
                "name": "Chris brown - Ayo ft. Tyga",
                "duration": "6:00",
                "file": "Chris brown - Ayo ft. tyga"
            }, {
                "track": 46,
                "name": "Chris_Brown - Marijuana_ft_ScHoolboy",
                "duration": "4:16",
                "file": "Chris_Brown - Marijuana_ft_ScHoolboy"
            }, {
                "track": 47,
                "name": "Clean Bandit - Mama ft. Ellie Goulding",
                "duration": "04:29",
                "file": "Clean Bandit - Mama (feat. Ellie Goulding)"
            }, {
                "track": 48,
                "name": "Clean Bandit - Rockabye (feat. Sean Paul & Anne-Marie)",
                "duration": "04:14",
                "file": "Clean Bandit - Rockabye (feat. Sean Paul & Anne-Marie) [Official Video]"
            }, {
                "track": 49,
                "name": "Coldplay - Paradise",
                "duration": "04:20",
                "file": "Coldplay - Paradise"
            }, {
                "track": 50,
                "name": "DJ Khaled - Celebrate ft. Travis Scott, Post Malone",
                "duration": "03:28",
                "file": "DJ Khaled - Celebrate ft. Travis Scott, Post Malone"
            }, {
                "track": 51,
                "name": "David Guetta, Bebe Rexha & J Balvin - Say My Name",
                "duration": "03:30",
                "file": "David Guetta, Bebe Rexha & J Balvin - Say My Name"
            }, {
                "track": 52,
                "name": "Deorro x Chris Brown - Five More Hours",
                "duration": "04:47",
                "file": "Deorro x Chris Brown - Five More Hours"
            }, {
                "track": 53,
                "name": "Dua Lipa - New Rules",
                "duration": "03:45",
                "file": "Dua Lipa - New Rules"
            }, {
                "track": 54,
                "name": "Ed Sheeran, Justin Bieber - I Don't Care",
                "duration": "03:37",
                "file": "Ed Sheeran & Justin Bieber - I Don't Care"
            }, {
                "track": 55,
                "name": "Ed Sheeran - Beautiful People (feat. Khalid)",
                "duration": "03:48",
                "file": "Ed Sheeran - Beautiful People (feat. Khalid)"
            }, {
                "track": 56,
                "name": "Ed Sheeran - Give Me Love",
                "duration": "04:23",
                "file": "Ed Sheeran - Give Me Love"
            }, {
                "track": 57,
                "name": "Ed Sheeran - Nothing On You (feat. Paulo Londra & Dave)",
                "duration": "03:22",
                "file": "Ed Sheeran - Nothing On You (feat. Paulo Londra & Dave) _SBTV_ ( 256kbps cbr )"
            }, {
                "track": 58,
                "name": "Ed Sheeran - Perfect",
                "duration": "04:25",
                "file": "Ed Sheeran - Perfect"
              }, {
                "track": 59,
                "name": "Ed Sheeran - Put It All On Me (feat. Ella Mai)",
                "duration": "03:38",
                "file": "Ed Sheeran - Put It All On Me (feat. Ella Mai)"
            }, {
                "track": 60,
                "name": "Ed Sheeran - Shape Of You",
                "duration": "04:23",
                "file": "Ed Sheeran - Shape of You"
            }, {
                "track": 61,
                "name": "Ed Sheeran - South of the Border (feat...",
                "duration": "3:24",
                "file": "Ed Sheeran - South of the Border (feat. Camila Cabello & Cardi B) _Official Lyric Video_ ( 160kbps )"
            }, {
                "track": 62,
                "name": "El Perdón (Forgiveness) Nicky Jam Enrique Iglesias (English Version)",
                "duration": "3:42",
                "file": "El Perdón (Forgiveness) Nicky Jam & Enrique Iglesias (English Version)"
            }, {
                "track": 63,
                "name": "Ed Sheeran - Thinking Out Loud",
                "duration": "04:57",
                "file": "Ed Sheeran - Thinking Out Loud"
            }, {
                "track": 64,
                "name": "Ellie Goulding - Love Me Like You Do",
                "duration": "04:09",
                "file": "Ellie Goulding - Love_Me_Like_You_Do"
            }, {
                "track": 65,
                "name": "Harry Styles - Adore You",
                "duration": "03:39",
                "file": "Harry Styles - Adore You"
            }, {
                "track": 66,
                "name": "Imagine Dragons - Bad Liar",
                "duration": "4:44",
                "file": "Imagine Dragons - Bad Liar"
            }, {
                "track": 67,
                "name": "Jonas Brothers - Five More Minutes",
                "duration": "2:33",
                "file": "Jonas Brothers - Five More Minutes"
            }, {
                "track": 68,
                "name": "Jonas Brothers - Only Human",
                "duration": "3:04",
                "file": "Jonas Brothers - Only Human"
            }, {
                "track": 69,
                "name": "Jonas Brothers - Sucker",
                "duration": "3:20",
                "file":  "Jonas Brothers - Sucker"
            }, {
                "track": 70,
                "name": "Juice WRLD & The Weeknd - Smile",
                "duration": "3:28",
                "file": "Juice WRLD _ The Weeknd - Smile"
            }, {
                "track": 71,
                "name": "Kane Brown, Swae Lee, Khalid - Be Like That",
                "duration": "3:11",
                "file": "Kane Brown_ Swae Lee_ Khalid - Be Like That (feat. Swae Lee _ Khalid)"
            }, {
                "track": 72,
                "name": "Kid Ink - Hotel ft. Chris Brown",
                "duration": "3:40",
                "file": "Kid Ink - Hotel ft. Chris Brown"
            }, {
                "track": 73,
                "name": "Kid Ink - Main Chick (Explicit) ft. Chris Brown & Tyga",
                "duration": "3:13",
                "file": "Kid Ink - Main Chick (Explicit) ft. Chris Brown & Tyga"
            }, {
                "track": 74,
                "name": "Lewis Capaldi - Before You Go",
                "duration": "4:06",
                "file": "Lewis Capaldi - Before You Go"
            }, {
                "track": 75,
                "name": "Lewis Capaldi - Someone You Loved",
                "duration": "3:07",
                "file": "Lewis Capaldi - Someone You Loved"
            }, {
                "track": 76,
                "name": "Maroon 5 - Animals",
                "duration": "3:50",
                "file": "Maroon 5 - Animals"
            }, {
                "track": 77,
                "name": "Maroon 5 - Girls Like You ft. Cardi B",
                "duration": "4:31",
                "file": "Maroon 5 - Girls Like You ft. Cardi B"
            }, {
                "track": 78,
                "name": "Maroon 5 - Memories",
                "duration": "3:15",
                "file": "Maroon 5 - Memories"
            }, {
                "track": 79,
                "name": "Maroon 5 - Nobody's Love",
                "duration": "3:49",
                "file": "Maroon 5 - Nobody_s Love"
            }, {
                "track": 80,
                "name": "Maroon 5 - Sugar",
                "duration": "5:01",
                "file": "Maroon 5 - Sugar"
            }, {
                "track": 81,
                "name": "Marshmello - Alone",
                "duration": "3:19",
                "file": "Marshmello - Alone"
            }, {
                "track": 82,
                "name": "Marshmello & Halsey - Be Kind",
                "duration": "3:04",
                "file": "Marshmello _ Halsey - Be Kind"
            }, {
                "track": 83,
                "name": "Martin Garrix & Bebe Rexha - In The Name Of Love",
                "duration": "3:25",
                "file": "Martin Garrix & Bebe Rexha - In The Name Of Love"
            }, {
                "track": 84,
                "name": "Mike Posner - I Took A Pill In Ibiza (Seeb Remix) (Explicit)",
                "duration": "3:56",
                "file": "Mike Posner - I Took A Pill In Ibiza (Seeb Remix) (Explicit)"
            }, {
                "track": 85,
                "name": "Post Malone - A Thousand Bad Times",
                "duration": "3:42",
                "file": "Post Malone - A Thousand Bad Times"
            }, {
                "track": 86,
                "name": "Post Malone - Circles",
                "duration": "3:46",
                "file": "Post Malone - Circles"
            }, {
                "track": 87,
                "name": "Post Malone - Die For Me ft. Future, Halsey",
                "duration": "4:06",
                "file": "Post Malone - Die For Me ft. Future, Halsey"
            }, {
                "track": 88,
                "name": "Post Malone - Goodbyes ft. Young Thug",
                "duration": "3:28",
                "file": "Post Malone - Goodbyes ft. Young Thug"
            }, {
                "track": 89,
                "name": "Post Malone - Hollywood's Bleeding",
                "duration": "2:37",
                "file": "Post Malone - Hollywood_s Bleeding"
            }, {
                "track": 90,
                "name": "Post Malone - On The Road ft. Meek Mill",
                "duration": "3:39",
                "file": "Post Malone - On The Road ft.Meek Mill"
            }, {
                "track": 91,
                "name": "Post Malone - Saint-Tropez",
                "duration": "2:37",
                "file": "Post Malone - Saint-Tropez"
            }, {
                "track": 92,
                "name": "Post Malone - Take What You Want ft. Ozzy",
                "duration": "3:51",
                "file": "Post Malone - Take What You Want ft. Ozzy"
            }, {
                "track": 93,
                "name": "Post Malone - Rockstar ft. 21 Savage",
                "duration": "4:02",
                "file": "Post Malone - rockstar ft. 21 Savage"
            }, {
                "track": 94,
                "name": "Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse)",
                "duration": "2:42",
                "file": "Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse)"
            }, {
                "track": 95,
                "name": "Sam Smith - I'm Not The Only One",
                "duration": "4:40",
                "file": "Sam Smith - I'm Not The Only One"
              }, {
                "track": 96,
                "name": "Sam Smith - Too Good At Goodbyes",
                "duration": "4:24",
                "file": "Sam Smith - Too Good At Goodbyes"
            }, {
                "track": 97,
                "name": "Sam Smith_ Normani - Dancing With A Stranger",
                "duration": "3:16",
                "file": "Sam Smith_ Normani - Dancing With A Stranger"
            }, {
                "track": 98,
                "name": "Selena Gomez &amp; The Scene - Love You Like A Love Song",
                "duration": "3:40",
                "file": "Selena Gomez &amp; The Scene - Love You Like A Love Song"
            }, {
                "track": 99,
                "name": "Selena Gomez - A Sweeter Place",
                "duration": "4:24",
                "file": "Selena Gomez - A Sweeter Place"
            }, {
                "track": 100,
                "name": "Selena Gomez - Feel Me",
                "duration": "3:45",
                "file": "Selena Gomez - Feel Me"
            }, {
                "track": 101,
                "name": "Selena Gomez - Lose You To Love Me",
                "duration": "3:27",
                "file": "Selena Gomez - Lose You To Love Me"
            }, {
                "track": 102,
                "name": "Selena Gomez - Rare",
                "duration": "3:41",
                "file": "Selena Gomez - Rare"
              }, {
                "track": 103,
                "name": "Selena Gomez - She",
                "duration": "2:53",
                "file": "Selena Gomez - She"
            }, {
                "track": 104,
                "name": "Selena Gomez - Souvenir",
                "duration": "2:43",
                "file": "Selena Gomez - Souvenir"
            }, {
                "track": 105,
                "name": "Selena Gomez - The Heart Wants What It Wants",
                "duration": "4:35",
                "file": "Selena Gomez - The Heart Wants What It Wants"
            }, {
                "track": 106,
                "name": "Selena Gomez - Vulnerable",
                "duration": "3:12",
                "file": "Selena Gomez - Vulnerable"
            }, {
                "track": 107,
                "name": "Shawn Mendes - If I Can't Have You",
                "duration": "3:12",
                "file": "Shawn Mendes - If I Can't Have You"
            }, {
                "track": 108,
                "name": "Shawn Mendes - Stitches",
                "duration": "4:00",
                "file": "Shawn Mendes - Stitches"
            }, {
                "track": 109,
                "name": "Shawn Mendes - There's Nothing Holdin' Me Back",
                "duration": "3:57",
                "file": "Shawn Mendes - There's Nothing Holdin' Me Back"
            }, {
                "track": 110,
                "name": "Shawn Mendes - Treat You Better",
                "duration": "4:16",
                "file": "Shawn Mendes - Treat You Better"
            }, {
                "track": 111,
                "name": "Shawn Mendes, Zedd - Lost In Japan (Remix)",
                "duration": "3:20",
                "file":  "Shawn Mendes, Zedd - Lost In Japan (Remix)"
            }, {
                "track": 112,
                "name": "Shawn Mendes_ Camila Cabello - Señorita",
                "duration": "3:25",
                "file": "Shawn Mendes_ Camila Cabello - Señorita"
            }, {
                "track": 113,
                "name": "Tones_and_I - Dance Monkey",
                "duration": "3:56",
                "file": "TONES AND I - DANCE MONKEY"
            }, {
                "track": 114,
                "name": "Taylor Swift - Bad Blood ft. Kendrick Lamar",
                "duration": "4:05",
                "file": "Taylor Swift - Bad Blood ft. Kendrick Lamar"
            }, {
                "track": 115,
                "name": "Taylor Swift - Blank space",
                "duration": "4:32",
                "file": "Taylor Swift - Blank space"
            }, {
                "track": 116,
                "name": "Taylor Swift - Christmas Tree Farm",
                "duration": "3:45",
                "file": "Taylor Swift - Christmas Tree Farm"
            }, {
                "track": 117,
                "name": "Taylor Swift - Cornelia Street",
                "duration": "4:48",
                "file": "Taylor Swift - Cornelia Street"
            }, {
                "track": 118,
                "name": "Taylor Swift - Cruel Summer",
                "duration": "2:59",
                "file": "Taylor Swift - Cruel Summer"
            }, {
                "track": 119,
                "name": "Taylor Swift - Daylight",
                "duration": "4:54",
                "file": "Taylor Swift - Daylight"
            }, {
                "track": 120,
                "name": "Taylor Swift - End Game ft. Ed Sheeran, Future",
                "duration": "4:11",
                "file": "Taylor Swift - End Game ft. Ed Sheeran, Future"
            }, {
                "track": 121,
                "name": "Taylor Swift - I Forgot That You Existed",
                "duration": "2:52",
                "file": "Taylor Swift - I Forgot That You Existed"
            }, {
                "track": 122,
                "name": "Taylor Swift - I Knew You Were Trouble",
                "duration": "3:39",
                "file": "Taylor Swift - I Knew You Were Trouble"
            }, {
                "track": 123,
                "name": "Taylor Swift - London Boy",
                "duration": "3:11",
                "file": "Taylor Swift - London Boy"
            }, {
                "track": 124,
                "name": "Taylor Swift - Lover",
                "duration": "3:58",
                "file": "Taylor Swift - Lover"
            }, {
                "track": 125,
                "name": "Taylor Swift - Miss Americana & The Heartbreak Prince",
                "duration": "3:55",
                "file": "Taylor Swift - Miss Americana & The Heartbreak Prince (Official Audio) ( 160kbps )"
            }, {
                "track": 126,
                "name": "Taylor Swift - Paper Rings",
                "duration": "3:43",
                "file": "Taylor Swift - Paper Rings"
            }, {
                "track": 127,
                "name": "Taylor Swift - Soon You’ll Get Better ft. Dixie Chicks",
                "duration": "3:23",
                "file": "Taylor Swift - Soon You’ll Get Better ft. Dixie Chicks"
            }, {
                "track": 128,
                "name": "Taylor Swift - The Archer",
                "duration": "3:39",
                "file": "Taylor Swift - The Archer"
            }, {
                "track": 129,
                "name": "Taylor Swift - The Man",
                "duration": "3:11",
                "file": "Taylor Swift - The Man"
            }, {
                "track": 130,
                "name": "Taylor Swift - You Need To Calm Down",
                "duration": "3:30",
              "file": "Taylor Swift - You Need To Calm Down"
              }, {
                "track": 131,
                "name": "The Americanos - In my foreign ft. Ty Dolla $ign, Nicky Jam, Lil Yatchy & French Montana",
                "duration": "3:50",
                "file": "The Americanos - In my foreign ft. Ty Dolla $ign, Nicky Jam, Lil Yatchy & French Montana"
            }, {
                "track": 132,
                "name": "The Chainsmokers - Don't_Let_Me_Down ft. Daya",
                "duration": "3:38",
                "file": "The Chainsmokers - Don't_Let_Me_Down ft. Daya"
            }, {
                "track": 133,
                "name": "The Chainsmokers, ILLENIUM - Takeaway",
                "duration": "3:49",
                "file": "The Chainsmokers_ ILLENIUM - Takeaway"
            }, {
                "track": 134,
                "name": "The Chainsmokers - Closer ft. Halsey",
                "duration": "4:22",
                "file":  "The Chainsmokers_-_Closer_ft._Halsey"
            }, {
                "track": 135,
                "name": "The Weeknd - Blinding Lights",
                "duration": "3:23",
                "file": "The Weeknd - Blinding Lights"
            }, {
                "track": 136,
                "name": "The Weeknd - In Your Eyes",
                "duration": "3:59",
                "file": "The Weeknd - In Your Eyes"
            }, {
                "track": 137,
                "name": "The Weeknd - Save Your Tears",
                "duration": "3:37",
                "file": "The Weeknd - Save Your Tears"
            }, {
                "track": 138,
                "name": "The Weeknd - Scared To Live",
                "duration": "3:12",
                "file": "The Weeknd - Scared To Live"
            }, {
                "track": 139,
                "name": "Wiz Khalifa - See You Again ft. Charlie Puth (Furious 7 Soundtrack)",
                "duration": "3:57",
                "file": "Wiz Khalifa - See You Again ft. Charlie Puth (Furious 7 Soundtrack)"
            }, {
                "track": 140,
                "name": "Xxxtentacion - Moonlight",
                "duration": "2:17",
                "file": "XXXTENTACION - MOONLIGHT"
            }, {
                "track": 141,
                "name": "Xxxtentacion - Sad!",
                "duration": "2:47",
                "file": "XXXTENTACION - SAD!"
            }, {
                "track": 142,
                "name": "XXXTENTACION - Changes",
                "duration": "2:02",
                "file": "XXXTENTACION - changes"
            }, {
                "track": 143,
                "name": "Young Thug, 2 Chainz, Wiz Khalifa & PnB Rock – Gang Up (The Fate of the Furious- The Album)",
                "duration": "3:55",
                "file": "Young Thug, 2 Chainz, Wiz Khalifa & PnB Rock – Gang Up (The Fate of the Furious- The Album)"
            }, {
                "track": 144,
                "name": "ZAYN & Taylor Swift - I Don’t Wanna Live Forever (Fifty Shades Darker)",
                "duration": "4:17",
                "file": "ZAYN & Taylor Swift - I Don’t Wanna Live Forever (Fifty Shades Darker)"
            }, {
                "track": 145,
                "name": "ZAYN - Dusk Till Dawn ft. Sia",
                "duration": "5:37",
                "file": "ZAYN - Dusk Till Dawn ft. Sia"
            }, {
                "track": 146,
                "name": "ZAYN, Zhavia Ward - A Whole New World (End Title) (From Aladdin)",
                "duration": "4:03",
                "file": "ZAYN, Zhavia Ward - A Whole New World (End Title) (From _Aladdin)"
            }],
              buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
