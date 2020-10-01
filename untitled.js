
jQuery(function ($) {
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
                "name": "The Forsaken (Take 2) - Smith St. Basement (Nov. '03)",
                "duration": "3:28",
                "file": ""
            }, {
                "track": 89,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "2:37",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 90,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "3:39",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 91,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "2:37",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 92,
                "name": "All This Is - Smith St. Basement (12/28/03)",
                "duration": "3:51",
                "file": "SSB12_28_03_ATI"
            }, {
                "track": 93,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "4:02",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 94,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "2:42",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 95,
                "name": "All This Is - Smith St. Basement (12/28/03)",
                "duration": "4:40",
                "file": "SSB12_2"
            }, {
                "track": 96,
                "name": "Magus - Smith St. Basement (12/28/03)",
                "duration": "3:16",
                "file": "SSB12_28_03_M"
            }, {
                "track": 97,
                "name": "Madness Explored - Smith St. Basement (12/28/03)",
                "duration": "3:40",
                "file": "SSB12_28_03_ME"
            }, {
                "track": 98,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "4:24",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 99,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "4:24",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 100,
                "name": "All This Is - Smith St. Basement (12/28/03)",
                "duration": "3:45",
                "file": "SSB12_28_03_ATI"
            }, {
                "track": 101,
                "name": "Magus - Smith St. Basement (12/28/03)",
                "duration": "3:27",
                "file": "SSB12_28_03_M"
            }, {
                "track": 102,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "3:41",
                "file": "SSB06_06_03_TF"
              }, {
                "track": 103,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "2:53",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 104,
                "name": "All This Is - Smith St. Basement (12/28/03)",
                "duration": "2:43",
                "file": "SSB12_2"
            }, {
                "track": 105,
                "name": "Magus - Smith St. Basement (12/28/03)",
                "duration": "4:35",
                "file": "SSB12_28_03_M"
            }, {
                "track": 106,
                "name": "Madness Explored - Smith St. Basement (12/28/03)",
                "duration": "3:12",
                "file": "SSB12_28_03_ME"
            }, {
                "track": 107,
                "name": "Madness Explored - Smith St. Basement (12/28/03)",
                "duration": "3:12",
                "file": "SSB12_28_03_ME"
            }, {
                "track": 108,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "4:00",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 109,
                "name": "All This Is - Smith St. Basement (12/28/03)",
                "duration": "3:57",
                "file": "SSB12_28_03_ATI"
            }, {
                "track": 110,
                "name": "Magus - Smith St. Basement (12/28/03)",
                "duration": "4:16",
                "file": "SSB12_28_03_M"
            }, {
                "track": 111,
                "name": "Madness Explored - Smith St. Basement (12/28/03)",
                "duration": "3:20",
                "file":  ""
            }, {
                "track": 112,
                "name": "Trance - Smith St. Basement (12/28/03)",
                "duration": "3:25",
                "file": "SSB12_28_03_T"
            }, {
                "track": 113,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "3:56",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 114,
                "name": "All This Is - Smith St. Basement (12/28/03)",
                "duration": "4:05",
                "file": "SSB12_28_03_ATI"
            }, {
                "track": 115,
                "name": "Magus - Smith St. Basement (12/28/03)",
                "duration": "4:32",
                "file": "SSB12_28_03_M"
            }, {
                "track": 116,
                "name": "Madness Explored - Smith St. Basement (12/28/03)",
                "duration": "3:45",
                "file": "SSB12_28_03_ME"
            }, {
                "track": 117,
                "name": "Trance - Smith St. Basement (12/28/03)",
                "duration": "4:48",
                "file": "SSB12_28_03_T"
            }, {
                "track": 118,
                "name": "The Forsaken - Smith St. Basement (12/28/03)",
                "duration": "2:59",
                "file": "SSB12_28_03_TF"
            }, {
                "track": 119,
                "name": "All This Is (Take 1) - Smith St. Basement (Nov. '03)",
                "duration": "4:54",
                "file": "SSB___11_03_ATITake_1"
            }, {
                "track": 120,
                "name": "All This Is (Take 2) - Smith St. Basement (Nov. '03)",
                "duration": "4:11",
                "file": "SSB___11_03_ATITake_2"
            }, {
                "track": 121,
                "name": "Beneath The Painted Eye (Take 1) - Smith St. Basement (Nov. '03)",
                "duration": "2:52",
                "file": "SSB___11_03_BTPETake_1"
            }, {
                "track": 122,
                "name": "Beneath The Painted Eye (Take 2) - Smith St. Basement (Nov. '03)",
                "duration": "3:39",
                "file": "SSB___11_03_BTPETake_2"
            }, {
                "track": 123,
                "name": "The Forsaken (Take 1) - Smith St. Basement (Nov. '03)",
                "duration": "3:11",
                "file": "SSB___11_03_TFTake_1"
            }, {
                "track": 124,
                "name": "The Forsaken (Take 2) - Smith St. Basement (Nov. '03)",
                "duration": "3:58",
                "file": "SSB___11_03_TFTake_2"
            }, {
                "track": 125,
                "name": "All This Is (Take 1) - Smith St. Basement (Nov. '03)",
                "duration": "3:55",
                "file": "SSB___11_03_ATITake_1"
            }, {
                "track": 126,
                "name": "All This Is (Take 2) - Smith St. Basement (Nov. '03)",
                "duration": "3:43",
                "file": "SSB___11_03_ATITake_2"
            }, {
                "track": 127,
                "name": "Beneath The Painted Eye (Take 1) - Smith St. Basement (Nov. '03)",
                "duration": "3:23",
                "file": "SSB___11_03_BTPETake_1"
            }, {
                "track": 128,
                "name": "Beneath The Painted Eye (Take 2) - Smith St. Basement (Nov. '03)",
                "duration": "3:39",
                "file": "SSB___11_03_BTPETake_2"
            }, {
                "track": 129,
                "name": "The Forsaken (Take 1) - Smith St. Basement (Nov. '03)",
                "duration": "3:11",
                "file": "SSB___11_03_TFTake_1"
            }, {
                "track": 130,
                "name": "The Forsaken (Take 2) - Smith St. Basement (Nov. '03)",
                "duration": "3:30",
              "file": ""
              }, {
                "track": 131,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "3:50",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 132,
                "name": "All This Is - Smith St. Basement (12/28/03)",
                "duration": "3:38",
                "file": "SSB12_28_03_ATI"
            }, {
                "track": 133,
                "name": "Magus - Smith St. Basement (12/28/03)",
                "duration": "3:49",
                "file": "SSB12_28_03_M"
            }, {
                "track": 134,
                "name": "Madness Explored - Smith St. Basement (12/28/03)",
                "duration": "4:22",
                "file":  ""
            }, {
                "track": 135,
                "name": "Trance - Smith St. Basement (12/28/03)",
                "duration": "3:23",
                "file": "SSB12_28_03_T"
            }, {
                "track": 136,
                "name": "The Forsaken - Smith St. Basement (06/06/03)",
                "duration": "3:59",
                "file": "SSB06_06_03_TF"
            }, {
                "track": 137,
                "name": "All This Is - Smith St. Basement (12/28/03)",
                "duration": "3:37",
                "file": "SSB12_28_03_ATI"
            }, {
                "track": 138,
                "name": "Maus - Smith St. Basement (12/28/03)",
                "duration": "3:12",
                "file": "SSB12_28_03_M"
            }, {
                "track": 139,
                "name": "Madness Explored - Smith St. Basement (12/28/03)",
                "duration": "3:57",
                "file": "SSB12_28_03_ME"
            }, {
                "track": 140,
                "name": "Trance - Smith St. Basement (12/28/03)",
                "duration": "2:17",
                "file": "SSB12_28_03_T"
            }, {
                "track": 141,
                "name": "The Forsaken - Smith St. Basement (12/28/03)",
                "duration": "2:47",
                "file": "SSB12_28_03_TF"
            }, {
                "track": 142,
                "name": "All This Is (Take 1) - Smith St. Basement (Nov. '03)",
                "duration": "2:02",
                "file": "SSB___11_03_ATITake_1"
            }, {
                "track": 143,
                "name": "All This Is (Take 2) - Smith St. Basement (Nov. '03)",
                "duration": "3:55",
                "file": "SSB___11_03_ATITake_2"
            }, {
                "track": 144,
                "name": "Beneath The Painted Eye (Take 1) - Smith St. Basement (Nov. '03)",
                "duration": "4:17",
                "file": "SSB___11_03_BTPETake_1"
            }, {
                "track": 145,
                "name": "Beneath The Painted Eye (Take 2) - Smith St. Basement (Nov. '03)",
                "duration": "5:37",
                "file": "SSB___11_03_BTPETake_2"
            }, {
                "track": 146,
                "name": "The Forsaken (Take 1) - Smith St. Basement (Nov. '03)",
                "duration": "4:03",
                "file": "SSB___11_03_TFTake_1"
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