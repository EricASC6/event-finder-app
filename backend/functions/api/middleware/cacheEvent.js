const eventController = require("../controllers/event");

exports.cacheEvent = () => {
  return async (req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const isExistingEvent = await eventController.isExistingEvent(eventId);
      console.log({ isExistingEvent });

      if (!isExistingEvent) {
        const event = await eventController.getEventFromTicketMaster(eventId);
        await eventController.saveEvent(event);
      }
    } catch (err) {
      console.error(err);
    } finally {
      return next();
    }
  };
};
