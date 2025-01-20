const validateGoogleMapsUrl = (req, res, next) => {
  const validateUrl = (url) => {
    const regex = /^https:\/\/www\.google\.com\/maps\/embed\?pb=!1m18!1m12!1m3!.*?2s.*?5e[01]!3m2!1s[A-Za-z]{2}!2s[A-Za-z]{2}!4v\d+!5m2!1s[A-Za-z]{2}!2s[A-Za-z]{2}$/;
    return regex.test(url);
  };

  if (!validateUrl(req.body.link)) {
    console.log('Invalid Google Maps URL:', req.body.link);
    return res.status(400).send({ message: "Invalid Google Maps URL." });
  }
  next();
};

module.exports = validateGoogleMapsUrl;
