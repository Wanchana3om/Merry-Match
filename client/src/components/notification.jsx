import axios from "axios";

// listening notification
// ใส่แล้วใน navbarUser อันอื่นยังไม่ใส่
const notification = async (userId) => {
  try {
    const result = await axios.get(
      `http://localhost:3000/notification/${userId}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

// when user subscribe send notification to recipient
// recipient is user_id of user that was subscribed
// {
//   "message": "<ชื่อคนส่ง> has bees interested you.", << หาคำอื่นก็ได้นะ
//   "recipient": user_id(ของคนที่เรากดmerry)
// }
const sendNotification = async (senderId, recipientId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/notification/${senderId}`,
      {
        senderId: senderId,
        recipientId: recipientId,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// When user click on notification for read. Update table that notify has been read
async function markNotificationAsRead(notiId) {
  try {
    const response = await axios.patch(
      `http://localhost:3000/notification/${notiId}`
    );
    console.log(response.data); // The updated notification record
  } catch (error) {
    console.error(error);
  }
}

// export { getNotifications, sendNotification, markNotificationAsRead };
export { notification, sendNotification, markNotificationAsRead };
