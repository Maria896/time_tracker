import { startTimer } from "../services/timer.service.js";
// Path     :   /api/timer/start-timer/:userId/:projectId
// Method   :   Post
// Access   :   Private
// Desc     :   Start-Timer
export const startYourTimer = async (req, res) => {
    try {
      
      const loggedInUserId = req.user.id;
      const userId = parseInt(req.params.userId)
      const projectId = parseInt(req.params.projectId)

      console.log(loggedInUserId,userId,projectId)
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