const algoService = {
  regrouperParUserID: (liste) => {
    const groupes = {};

    // Regrouper les éléments par userID
    liste.forEach((element) => {
      const { userId } = element;
      if (!groupes[userId]) {
        groupes[userId] = [];
      }
      groupes[userId].push(element);
    });

    // Convertir l'objet en tableau
    const resultat = Object.values(groupes);
    console.log("eeeeeeeeeeeeeee");
    console.log(resultat);
    return resultat;
  },
  //**********************************la nuovelle fonction */
  findBestCommonTimeSlots: function (users) {
    function findCommonTimeSlots(users) {
      // Créer une structure de données de calendrier pour chaque utilisateur
      const calendars = users.map((userSlots) => {
        const calendar = Array(7)
          .fill()
          .map(() => Array(48).fill(0)); // Diviser en intervalles de 30 minutes
        for (const slot of userSlots) {
          const startParts = slot.startTime
            .split(":")
            .map((part) => parseInt(part));
          const endParts = slot.endTime
            .split(":")
            .map((part) => parseInt(part));
          const startTime = startParts[0] * 2 + (startParts[1] === 30 ? 1 : 0); // Convertir en demi-heures
          const endTime = endParts[0] * 2 + (endParts[1] === 30 ? 1 : 0); // Convertir en demi-heures
          for (let halfHour = startTime; halfHour < endTime; halfHour++) {
            calendar[slot.day][halfHour]++;
          }
        }
        return calendar;
      });

      const commonSlots = [];

      // Parcourir chaque jour et intervalle de 30 minutes
      for (let day = 0; day < 7; day++) {
        for (let halfHour = 0; halfHour < 48; halfHour++) {
          // 48 demi-heures dans une journée
          let overlappingUsers = [];

          // Vérifier si tous les utilisateurs sont disponibles à cet intervalle de 30 minutes
          for (let i = 0; i < calendars.length; i++) {
            if (calendars[i][day][halfHour] > 0) {
              overlappingUsers.push(users[i][0]._id); // Ajouter l'identifiant de l'utilisateur
            }
          }

          // Si plus d'un utilisateur est disponible, enregistrer le créneau horaire commun
          if (overlappingUsers.length > 1) {
            const startTimeHours = Math.floor((halfHour * 30) / 60);
            const startTimeMinutes = (halfHour * 30) % 60 === 30 ? "30" : "00";
            const endTimeHours = Math.floor(((halfHour + 1) * 30) / 60);
            const endTimeMinutes =
              ((halfHour + 1) * 30) % 60 === 30 ? "30" : "00";

            const commonSlot = {
              startTime: `${startTimeHours}:${startTimeMinutes}`,
              endTime: `${endTimeHours}:${endTimeMinutes}`,
              day: day,
              nbUsers: overlappingUsers.length,
              userIDs: overlappingUsers,
            };
            commonSlots.push(commonSlot);
          }
        }
      }

      return commonSlots;
    }

    const commonTimeSlots = findCommonTimeSlots(users);

    // Tri du tableau commonTimeSlots en fonction du nombre d'utilisateurs (nbUsers)
    commonTimeSlots.sort((a, b) => b.nbUsers - a.nbUsers);

    // Récupération des meilleures solutions
    const bestCommonTimeSlots = commonTimeSlots.filter(
      (slot) => slot.nbUsers === commonTimeSlots[0].nbUsers
    );

    return bestCommonTimeSlots;
  },
  //***************************************** */
  fusionnerPlagesHoraires: function (plagesHoraires) {
    const plagesFusionnees = [];

    if (plagesHoraires.length === 0) {
      return plagesFusionnees;
    }

    let plageCourante = { ...plagesHoraires[0] };

    for (let i = 1; i < plagesHoraires.length; i++) {
      const plageSuivante = plagesHoraires[i];

      if (
        plageCourante.day === plageSuivante.day &&
        plageCourante.endTime === plageSuivante.startTime
      ) {
        plageCourante.endTime = plageSuivante.endTime;
      } else {
        plagesFusionnees.push(plageCourante);
        plageCourante = { ...plageSuivante };
      }
    }

    plagesFusionnees.push(plageCourante);

    return plagesFusionnees;
  },
};

export default algoService;
// const bestCommonTimeSlots = algoService.findBestCommonTimeSlots(users);
// console.log(bestCommonTimeSlots);

// const plagesFusionnees =
//   algoService.fusionnerPlagesHoraires(bestCommonTimeSlots);
// console.log(plagesFusionnees);
