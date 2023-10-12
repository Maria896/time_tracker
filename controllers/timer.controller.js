import { startTimer } from "../services/timer.service.js";
// Path     :   /api/timer/start-timer/:userId/:projectId
// Method   :   Post
// Access   :   Private
// Desc     :   Start-Timer
export const startYourTimer = async (req, res) => {
    try {
      
      const loggedInUserId = req.user.id;
      const {userId,projectId} = req.params
      const { status, message } = await startTimer(
        userId,projectId,loggedInUserId
      );
      res.send({
        status: status,
        message: message,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };