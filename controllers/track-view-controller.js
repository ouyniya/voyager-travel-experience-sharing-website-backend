const trackViewController = {};

trackViewController.trackView = (req, res, next) => {
  try {
    res.json({ message: "trackView successful" });
  } catch (error) {
    next(error);
  }
};

trackViewController.getAllTrackViews = (req, res, next) => {
  try {
    res.json({ message: "getAllTrackViews successful" });
  } catch (error) {
    next(error);
  }
};

trackViewController.getTrackViewsByPostId = (req, res, next) => {
  try {
    res.json({ message: "getTrackViewsByPostId successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = trackViewController;
