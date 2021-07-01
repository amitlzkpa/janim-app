let campaignSchema = {
  ageRange: [],
  assets: [],
  dateRange: [],
  description: null,
  hitsGoal: null,
  id: "new",
  isActive: false,
  organization: null,
  targetCountries: [],
  targetDescriptors: [],
  targetKeywords: [],
  title: null,
  totalBudget: null,
  stats: {
    assetWiseHits: {
      totalHits: 0,
    },
    memberWiseHits: {
      totalHits: 0,
    },
    totalHits: 0,
    joinedMembers: 0,
  },
};

export default campaignSchema;
