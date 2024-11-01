// Quick n dirty way to check if the pathName is equal to the path
export const matchPathName = (path) => {
  switch (path) {
    case "/dashboard":
      return "Dashboard";
    case "/dashboard-farmer":
      return "Dashboard Farmer";
    case "/virtual-twin":
      return "Virtual Twin";
    case "/financial-overview":
      return "Financial Overview";
    case "/system-care":
      return "System Care";
    case "/solar-insights":
      return "Solar Insights";
    case "/smart-assistant":
      return "Smart Assistant";
    case "/notification":
      return "Notification";
    case "/solar-companies":
      return "Solar Companies";
    case "/subscription":
      return "Subscription";
    default:
      return "";
  }
};
