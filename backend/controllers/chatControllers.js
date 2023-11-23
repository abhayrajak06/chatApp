import UserModel from "../models/UserModel.js";
import chatModel from "../models/chatModel.js";

export const accessChatController = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.status(400).json({});
  }

  var isChat = await chatModel
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }

  try {
    const createdChat = await chatModel.create(chatData);
    const FullChat = await chatModel
      .findOne({ _id: createdChat._id })
      .populate("users", "-password");
    res.status(200).json({ FullChat });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while accessing chat",
    });
  }
};
