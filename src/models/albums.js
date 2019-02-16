const albums = [
  {
    id: 1,
    name: 'Gaylord, Weber and Reichert'
  },
  {
    id: 2,
    name: 'Sauer-Kreiger'
  },
  {
    id: 3,
    name: 'Waters-Mills'
  },
  {
    id: 4,
    name: 'Nikolaus-Hammes'
  },
  {
    id: 5,
    name: 'Hammes Inc'
  },
  {
    id: 6,
    name: 'Runolfsson, Becker and Kerluke'
  },
  {
    id: 7,
    name: 'Lubowitz-Hermann'
  },
  {
    id: 8,
    name: 'Lockman, Cormier and Koepp'
  },
  {
    id: 9,
    name: 'Powlowski-Barton'
  },
  {
    id: 10,
    name: 'Yost-Schuster'
  },
  {
    id: 11,
    name: 'Torphy, Kuphal and Aufderhar'
  },
  {
    id: 12,
    name: 'Beatty-Kris'
  },
  {
    id: 13,
    name: 'Howe, Hayes and Kautzer'
  },
  {
    id: 14,
    name: 'Funk, Maggio and Morissette'
  },
  {
    id: 15,
    name: 'Price, Mohr and Crooks'
  },
  {
    id: 16,
    name: 'Davis Group'
  },
  {
    id: 17,
    name: 'Howell-Keebler'
  },
  {
    id: 18,
    name: 'Quitzon Group'
  },
  {
    id: 19,
    name: 'Sauer Inc'
  },
  {
    id: 20,
    name: 'Rogahn Inc'
  },
  {
    id: 21,
    name: 'Jast, McLaughlin and Huels'
  },
  {
    id: 22,
    name: 'Hyatt Group'
  },
  {
    id: 23,
    name: 'Schuppe and Sons'
  },
  {
    id: 24,
    name: 'Glover-Wisozk'
  },
  {
    id: 25,
    name: 'Ondricka-Williamson'
  },
  {
    id: 26,
    name: 'Nader and Sons'
  },
  {
    id: 27,
    name: 'Champlin and Sons'
  },
  {
    id: 28,
    name: 'Koepp, Weimann and Haag'
  },
  {
    id: 29,
    name: 'Kuphal-Schmitt'
  },
  {
    id: 30,
    name: "O'Connell LLC"
  },
  {
    id: 31,
    name: 'Schoen, Anderson and Nader'
  },
  {
    id: 32,
    name: 'Gerlach, Kub and Bashirian'
  },
  {
    id: 33,
    name: 'Bednar, Schroeder and Funk'
  },
  {
    id: 34,
    name: 'Lemke, Reilly and Jakubowski'
  },
  {
    id: 35,
    name: 'McCullough-Torp'
  },
  {
    id: 36,
    name: 'Pfeffer-Howell'
  },
  {
    id: 37,
    name: 'Gorczany, Adams and Littel'
  },
  {
    id: 38,
    name: 'Parisian-Spinka'
  },
  {
    id: 39,
    name: 'Botsford-Jenkins'
  },
  {
    id: 40,
    name: 'Predovic Inc'
  },
  {
    id: 41,
    name: 'Lehner-Kozey'
  },
  {
    id: 42,
    name: 'Hudson-Buckridge'
  },
  {
    id: 43,
    name: 'Murazik, Bashirian and Goldner'
  },
  {
    id: 44,
    name: 'Glover-Lueilwitz'
  },
  {
    id: 45,
    name: 'Block-Wolf'
  },
  {
    id: 46,
    name: 'Lockman-Cassin'
  },
  {
    id: 47,
    name: 'King Group'
  },
  {
    id: 48,
    name: 'Mayert-Davis'
  },
  {
    id: 49,
    name: 'Kirlin, Skiles and DuBuque'
  },
  {
    id: 50,
    name: 'Wunsch, Kris and Hagenes'
  },
  {
    id: 51,
    name: 'Macejkovic-Fadel'
  },
  {
    id: 52,
    name: 'Koch-Kemmer'
  },
  {
    id: 53,
    name: 'Torphy Group'
  },
  {
    id: 54,
    name: 'Denesik Group'
  },
  {
    id: 55,
    name: "Weimann-D'Amore"
  },
  {
    id: 56,
    name: 'Denesik, Homenick and Larson'
  },
  {
    id: 57,
    name: 'Mueller, Nitzsche and Fay'
  },
  {
    id: 58,
    name: 'Adams, Mosciski and Kautzer'
  },
  {
    id: 59,
    name: 'Gerlach-Abbott'
  },
  {
    id: 60,
    name: 'Feest-Rohan'
  },
  {
    id: 61,
    name: 'Wolf LLC'
  },
  {
    id: 62,
    name: 'Cruickshank-Mertz'
  },
  {
    id: 63,
    name: 'Gleason LLC'
  },
  {
    id: 64,
    name: 'Rowe and Sons'
  },
  {
    id: 65,
    name: 'Leuschke LLC'
  },
  {
    id: 66,
    name: 'Kilback Group'
  },
  {
    id: 67,
    name: 'Runolfsson and Sons'
  },
  {
    id: 68,
    name: 'Ernser-Baumbach'
  },
  {
    id: 69,
    name: 'Feest and Sons'
  },
  {
    id: 70,
    name: 'Hamill-Wisoky'
  },
  {
    id: 71,
    name: 'Collins Inc'
  },
  {
    id: 72,
    name: 'Ferry, Lindgren and Lind'
  },
  {
    id: 73,
    name: 'Marquardt and Sons'
  },
  {
    id: 74,
    name: 'Armstrong, Frami and Murazik'
  },
  {
    id: 75,
    name: 'Kemmer-Bernier'
  },
  {
    id: 76,
    name: 'Beer, Parker and Metz'
  },
  {
    id: 77,
    name: 'Gislason LLC'
  },
  {
    id: 78,
    name: 'Nicolas, Ziemann and Murray'
  },
  {
    id: 79,
    name: 'Torp and Sons'
  },
  {
    id: 80,
    name: 'Sanford-Keebler'
  },
  {
    id: 81,
    name: 'Boyle-Brakus'
  },
  {
    id: 82,
    name: 'Kozey-Willms'
  },
  {
    id: 83,
    name: 'Little-Batz'
  },
  {
    id: 84,
    name: 'Schimmel LLC'
  },
  {
    id: 85,
    name: 'Renner, Kovacek and Labadie'
  },
  {
    id: 86,
    name: 'Daniel Group'
  },
  {
    id: 87,
    name: 'Abernathy, Grimes and Walter'
  },
  {
    id: 88,
    name: 'VonRueden Inc'
  },
  {
    id: 89,
    name: 'Kerluke, Sawayn and Jerde'
  },
  {
    id: 90,
    name: 'Schuppe Inc'
  },
  {
    id: 91,
    name: 'Adams, Powlowski and Denesik'
  },
  {
    id: 92,
    name: 'Haley, Hirthe and Pagac'
  },
  {
    id: 93,
    name: 'Johnson and Sons'
  },
  {
    id: 94,
    name: "White-O'Hara"
  },
  {
    id: 95,
    name: 'Ziemann, Gerlach and Ullrich'
  },
  {
    id: 96,
    name: "Weimann, Emard and O'Keefe"
  },
  {
    id: 97,
    name: 'Yundt-Tromp'
  },
  {
    id: 98,
    name: 'Kuhlman, Bauch and Ernser'
  },
  {
    id: 99,
    name: 'Reynolds-Conn'
  },
  {
    id: 100,
    name: 'Nicolas, Thiel and Ratke'
  }
];

export default albums;
