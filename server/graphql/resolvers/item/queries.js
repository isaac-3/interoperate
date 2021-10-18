import Items from "../../../models/dbItem.js";

const itemQueries = {
  getPannelItems: async (_, { pannelID }) => {
    const pannelItems = await Items.find({ pannelID: pannelID }).sort({
      position: "asc",
    });
    return pannelItems;
  },
  getItems: async () => await Items.find({}).exec(),
  getItem: async (_, { itemID }) => {
    const item = await Items.findById(itemID);
    return item;
  },
};

export default itemQueries;
