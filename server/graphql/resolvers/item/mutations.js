import Items from "../../../models/dbItem.js";

const itemlMutations = {
  addItem: async (_, args) => {
    const item = new Items(args);
    await item.save();
    return item;
  },
  updateItem: async (_, { itemID, update }) => {
    const itemUpdate = await Items.findByIdAndUpdate(itemID, update, {
      new: true,
    });
    return itemUpdate;
  },
};

export default itemlMutations;
