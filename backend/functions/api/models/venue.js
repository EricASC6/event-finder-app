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
  }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.location = location;
    this.url = url;
  }

  static createVenueFromTicketMaster(ticketMasterVenue) {
    const {
      id,
      name,
      images,
      description: _description,
      url,
    } = ticketMasterVenue;

    const _image =
      images && images.find((img) => img.ratio === "16_9" && img.width > 288);
    const image = _image ? _image.url : null;

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
    });
  }
};
