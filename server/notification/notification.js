import { Router } from "express";
import { supabase } from "../app.js";

const notificationRouter = Router();

// get notification
notificationRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve unread notifications for user with userId
    const AllDataNotify = [];
    const { data: notifications, error: notificationsError } = await supabase
      .from("notification")
      .select(`*`)
      .eq("noti_recipient", userId)
      .eq("noti_read", false);
    if (notificationsError) throw notificationsError;
    AllDataNotify.push(notifications);
    const allSender = notifications.map((sender) => sender.noti_sender);
    console.log(allSender);
    for (let i = 0; i <= allSender.length; i++) {
      const { data: userData, error: userDataError } = await supabase
        .from("users")
        .select("*, pictures(pic_url)")
        .eq("user_id", i);
      if (userDataError) throw userDataError;
      AllDataNotify.push(userData);
    }
    console.log(AllDataNotify);
    res.status(200).json(AllDataNotify);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// send notification
notificationRouter.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // recipient is user_id of user that was subscribed
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("name")
      .eq("user_id", userId);
    if (userError) throw userError;

    const { message, recipient } = req.body;
    // Insert new notification to table
    const { data: insertData, error: insertError } = await supabase
      .from("notification")
      .insert([
        {
          noti_sender: userId,
          noti_message: `${userData[0].name} is starting to be interested in you`,
          noti_recipient: recipient,
          noti_read: false,
        },
      ]);
    if (insertError) throw insertError;

    // Send real-time update to subscribed clients
    if (insertData && insertData.length > 0) {
      const payload = { event: "NEW_NOTIFICATION", data: insertData[0] };
      await supabase
        .from("notification")
        .eq(recipient, recipient)
        .emit(payload);
    }

    res
      .status(200)
      .json({ message: `You Notification Has Been Sent Successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

notificationRouter.patch("/:notiId", async (req, res) => {
  try {
    const notiId = req.params.notiId;
    const { error: updateNotifiactionError } = await supabase
      .from("notification")
      .update([{ noti_read: true }])
      .eq("noti_id", notiId)
      .single();
    if (updateNotifiactionError) throw updateNotifiactionError;
    res.json({ message: "Notification has been readed" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default notificationRouter;
