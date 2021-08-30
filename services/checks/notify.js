const sendEmail = require("../../utils/sendEmail");
const fetch = require("node-fetch");

const notifyFaliureByMail = async (email, url) => {
  const options = {
    email,
    subject: "URL is Down!",
    message: `The url ${url} is down!`,
  };
  await sendEmail(options);
};

const notifyFaliureByWebhook = async (webhook, url) => {
    const message = {
        content: `The url ${url} is down`,
    }
    await fetch(webhook, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(message)
    })
}
module.exports = {notifyFaliureByMail, notifyFaliureByWebhook};
