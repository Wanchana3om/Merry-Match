import axios from "axios";

const notification = async (userId) => {
  try {
    const result = await axios.get(
      `https://merry-match-server.vercel.app/notification/${userId}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const sendNotification = async (senderId, recipientId) => {
  try {
    const response = await axios.post(
      `https://merry-match-server.vercel.app/notification/${senderId}`,
      {
        senderId: senderId,
        recipientId: recipientId,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

async function markNotificationAsRead(notiId) {
  try {
    const response = await axios.patch(
      `https://merry-match-server.vercel.app/notification/${notiId}`
    );
    console.log(response.data); // The updated notification record
  } catch (error) {
    console.error(error);
  }
}

export { notification, sendNotification, markNotificationAsRead };
