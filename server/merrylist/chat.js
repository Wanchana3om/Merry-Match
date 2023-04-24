import { Router } from "express";
import { supabase } from "../app.js";

const chatRouther = Router();

// fetch message
// แบบที่1
// chatRouther.get("/:senderId/:receiverId", async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;
//     const { data: senderMessage, error: senderMessageError } = await supabase
//       .from("chat")
//       .select("*")
//       .eq("sender_id", senderId)
//       .eq("receiver_id", receiverId)
//       .order("timestamp", { ascending: false });
//     if (senderMessageError) throw senderMessageError;

//     const { data: receiverMessage, error: receiverMessageError } =
//       await supabase
//         .from("chat")
//         .select("*")
//         .eq("sender_id", receiverId)
//         .eq("receiver_id", senderId)
//         .order("timestamp", { ascending: false });
//     if (receiverMessageError) throw receiverMessageError;

//     const data = {
//       senderMessage: senderMessage,
//       receiverMessage: receiverMessage,
//     };

//     return res.json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// });

// แบบที่2
chatRouther.get("/:senderId/:receiverId", async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const { data: getMatchId, error: getMatchIdError } = await supabase
      .from("chat")
      .select("match_id")
      .eq("sender_id", senderId)
      .eq("receiver_id", receiverId);
    if (getMatchIdError) throw getMatchIdError;

    const { data, error } = await supabase
      .from("chat")
      .select("*")
      .eq("match_id", getMatchId[0].match_id)
      .order("timestamp", { ascending: false });
    if (error) throw error;
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// send message
chatRouther.post("/:senderId/:receiverId", async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const { message } = req.body;
    const { data: matchId, error: matchIdError } = await supabase
      .from("match")
      .select("match_id")
      .or(
        `and(mer_id1.eq.${senderId},mer_id2.eq.${receiverId}),and(mer_id1.eq.${receiverId},mer_id2.eq.${senderId}))`
      );
    if (matchIdError) throw matchIdError;
    const timestamp = new Date();
    const { error } = await supabase.from("chat").insert({
      sender_id: senderId,
      receiver_id: receiverId,
      match_id: matchId[0].match_id,
      message,
      timestamp: timestamp,
    });
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ messages: "Message has been record" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// edit message
chatRouther.put("/:senderId/:chatId", async (req, res) => {
  try {
    const { senderId, chatId } = req.params;
    const { message } = req.body;
    const { error } = await supabase
      .from("chat")
      .update({ message })
      .eq("chat_id", chatId)
      .eq("sender_id", senderId);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ messages: "Message has been edited" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

//   deleted message
chatRouther.delete("/:senderId/:chatId", async (req, res) => {
  try {
    const { senderId, chatId } = req.params;
    const { error } = await supabase
      .from("chat")
      .delete()
      .eq("chat_id", chatId)
      .eq("sender_id", senderId);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ messages: "Message has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default chatRouther;
