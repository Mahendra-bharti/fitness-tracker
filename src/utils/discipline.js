export const getAuraLevel = (xp) => {
  if (xp < 100) return 1;
  if (xp < 300) return 2;
  if (xp < 700) return 3;
  if (xp < 1500) return 4;
  return 5;
};

export const applyDisciplineCheck = (state, isDisciplined) => {
  const today = new Date().toISOString().split("T")[0];

  //  Already checked today
  if (state.lastDisciplineDate === today) return state;

  if (isDisciplined) {
    state.disciplineStreak += 1;
    state.auraXP += 10 + state.disciplineStreak * 2;
  } else {
    state.disciplineStreak = 0;
    state.auraXP = Math.max(0, Math.floor(state.auraXP * 0.6));
  }

  //  Level recalculated AFTER XP change
  state.auraLevel = getAuraLevel(state.auraXP);
  state.lastDisciplineDate = today;

  return state;
};
