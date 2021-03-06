module.exports = class Venue {
  constructor({
    id,
    name,
    image,
    description,
    location = {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      coordinates: "",
    },
    url,
    upcomingEvents = 0,
    reviews = {
      count: 0,
      average: 0,
      breakdown: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
    },
  }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.location = location;
    this.url = url;
    this.upcomingEvents = upcomingEvents;
    this.reviews = reviews;
  }

  static createVenueFromTicketMaster(ticketMasterVenue) {
    const {
      id,
      name,
      images,
      description: _description,
      url,
      upcomingEvents: { _total: upcomingEvents },
    } = ticketMasterVenue;

    const _image = images && images[0].url;
    const image = _image || null;

    const description = _description || "No info for this venue";

    const {
      address: _address,
      city,
      state,
      postalCode,
      location: coordinates,
    } = ticketMasterVenue;

    const address = `${_address.line1} ${city.name}, ${state.name} ${postalCode}`;
    const location = {
      address: address,
      city: city.name,
      state: state.name,
      postalCode,
      coordinates,
    };

    return new Venue({
      id,
      name,
      image,
      description,
      location,
      url,
      upcomingEvents,
    });
  }
};
