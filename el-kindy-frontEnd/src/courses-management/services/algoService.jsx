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

  //**************************************************** */
  regrouperParGroupId: function (tableau) {
    const resultat = {};

    tableau.forEach((groupe, index) => {
      groupe.forEach((element) => {
        if (!resultat[element.groupId]) {
          resultat[element.groupId] = [];
        }
        resultat[element.groupId].push(element);
      });
    });

    return resultat;
  },

  //************************************************************** */
  dividePlagesHoraires: function (plagesHoraires) {
    const dividedPlagesHoraires = {};

    for (const groupe in plagesHoraires) {
      const plages = plagesHoraires[groupe];
      const dividedPlages = [];

      plages.forEach((plage, index) => {
        const { day, startTime, endTime, level, num } = plage;
        const duration = algoService.calculateDuration(level, num);
        const start = algoService.parseTime(startTime);
        const end = algoService.parseTime(endTime);

        let currentTime = start;

        while (currentTime + duration <= end) {
          dividedPlages.push({
            day: day,
            startTime: algoService.formatTime(currentTime),
            endTime: algoService.formatTime(currentTime + duration),
            level: level,
            num: num,
          });
          currentTime += 30; // Ajouter 30 minutes à l'heure de début pour chaque plage
        }
      });

      // Exclure la dernière plage si sa durée est inférieure à la durée spécifiée pour le niveau de cours
      if (dividedPlages.length > 0) {
        const lastPlage = dividedPlages[dividedPlages.length - 1];
        const lastPlageDuration =
          algoService.parseTime(lastPlage.endTime) -
          algoService.parseTime(lastPlage.startTime);
        if (
          lastPlageDuration <
          algoService.calculateDuration(lastPlage.level, lastPlage.num)
        ) {
          dividedPlages.pop();
        }
      }

      dividedPlagesHoraires[groupe] = dividedPlages;
    }

    return dividedPlagesHoraires;
  },

  calculateDuration: function (level, num) {
    if (level === "diplome") {
      switch (num) {
        case "1":
          return 120; // 2 hours
        case "2":
          return 90; // 1 hour 30 minutes
        case "3":
          return 180; // 3 hours
        // Ajoutez d'autres cas si nécessaire
        default:
          return 0; // Valeur par défaut si le numéro n'est pas reconnu
      }
    } else {
      // Pour les autres niveaux, utilisez le switch existant
      switch (level) {
        case "initiation":
          return 75; // 1 hour 15 minutes
        case "preparatoire":
          return 90; // 1 hour 30 minutes
        case "1":
        case "2":
          return 120; // 2 hours
        case "3":
          return 150; // 2 hours 30 minutes
        case "4":
          return 180; // 3 hours
        case "5":
          return 210; // 3 hours 30 minutes
        case "6":
          return 240; // 4 hours
        default:
          return 0; // Valeur par défaut si le niveau n'est pas reconnu
      }
    }
  },

  parseTime: function (timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  },

  addTime: function (time, minutesToAdd) {
    return time + minutesToAdd;
  },

  formatTime: function (time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  },

  //************************************************* */
  permuteGenerator: function* (arrays) {
    const stack = [[]];
    const lengths = arrays.map((array) => array.length);

    while (stack.length) {
      const path = stack.pop();
      if (path.length === arrays.length) {
        yield path;
        continue;
      }
      const index = path.length;
      for (let i = 0; i < lengths[index]; i++) {
        stack.push([...path, arrays[index][i]]);
      }
    }
  },

  countConflicts: function (assignment) {
    const plageCounts = {};
    for (const groupe in assignment) {
      const plage = assignment[groupe];
      const plageString = JSON.stringify(plage);
      if (!plageCounts[plageString]) {
        plageCounts[plageString] = 1;
      } else {
        plageCounts[plageString]++;
      }
    }
    let conflicts = 0;
    let maxOccurrence = 0;
    for (const plageString in plageCounts) {
      const plage = JSON.parse(plageString);
      const conflictingPlages = plageCounts[plageString];
      for (const otherPlageString in plageCounts) {
        if (plageString !== otherPlageString) {
          const otherPlage = JSON.parse(otherPlageString);
          if (
            plage.day === otherPlage.day && // Vérifier si les plages horaires sont le même jour
            plage.startTime < otherPlage.end &&
            plage.end > otherPlage.startTime
          ) {
            conflicts += conflictingPlages;
            if (conflictingPlages > maxOccurrence) {
              maxOccurrence = conflictingPlages;
            }
            break;
          }
        }
      }
    }
    return { conflicts, maxOccurrence };
  },

  matchingStable: function async(plagesHoraires, groupes) {
    const allPlages = Object.values(plagesHoraires);

    let bestAssignments = []; // Liste pour stocker toutes les meilleures affectations
    let minConflicts = Infinity;
    let maxAssignment = 0;
    let minMaxOccurrence = Infinity;

    for (const permutation of algoService.permuteGenerator(allPlages)) {
      const assignment = {};
      let totalConflicts = 0;
      let maxOccurrence = 0;

      for (let i = 0; i < groupes.length; i++) {
        const groupe = groupes[i];
        const plage = permutation[i];
        assignment[groupe] = plage;
      }

      for (const plage of permutation) {
        const plageString = JSON.stringify(plage);
        const { conflicts, maxOccurrence: occurrence } =
          algoService.countConflicts(assignment);
        totalConflicts += conflicts;
        if (occurrence > maxOccurrence) {
          maxOccurrence = occurrence;
        }
      }

      const currentAssignment = groupes.length - totalConflicts;

      if (
        currentAssignment > maxAssignment ||
        (currentAssignment === maxAssignment &&
          totalConflicts < minConflicts) ||
        (currentAssignment === maxAssignment &&
          totalConflicts === minConflicts &&
          maxOccurrence < minMaxOccurrence)
      ) {
        maxAssignment = currentAssignment;
        minConflicts = totalConflicts;
        minMaxOccurrence = maxOccurrence;
        bestAssignments = [assignment]; // Réinitialiser la liste des meilleures affectations
      } else if (
        currentAssignment === maxAssignment &&
        totalConflicts === minConflicts &&
        maxOccurrence === minMaxOccurrence
      ) {
        bestAssignments.push(assignment); // Ajouter cette affectation à la liste des meilleures affectations
      }
    }

    const finalAssignments = [];
    for (const bestAssignment of bestAssignments) {
      const finalAssignment = {};
      for (const groupe in bestAssignment) {
        const plage = bestAssignment[groupe];
        finalAssignment[JSON.stringify(plage)] = groupe;
      }
      finalAssignments.push(finalAssignment);
    }

    return finalAssignments;
  },
};

export default algoService;
// const bestCommonTimeSlots = algoService.findBestCommonTimeSlots(users);
// console.log(bestCommonTimeSlots);

// const plagesFusionnees =
//   algoService.fusionnerPlagesHoraires(bestCommonTimeSlots);
// console.log(plagesFusionnees);
