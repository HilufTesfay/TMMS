import { analyticService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

const getAnalytics = handleCatchError(async (req, res) => {
  const analytics = await analyticService.getAnalytics();
  res.status(200).json(analytics);
});

export default { getAnalytics };
