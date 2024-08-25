const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // يضيف \ أمام الأحرف الخاصة
};

export const FilterData = (data, type, search) => {
  if (search.length === 0) {
    return data && [...data];
  } else {
    const regex = new RegExp(escapeRegExp(search), "i");
    switch (type) {
      case "name":
        return data?.filter((item) => regex.test(item.name));

      case "users":
        return data?.filter(
          (item) =>
            regex.test(item.email) ||
            regex.test(item.firstname) ||
            regex.test(item.lastname)
        );

      case "products":
        return data?.filter(
          (item) => regex.test(item.description) || regex.test(item.title)
        );

      //   case "userorder": {
      //     const cartItems = data?.map((item) => item.cartItems).flat();
      //     const filteredItems = cartItems.filter((item) => regex.test(item.product.title));
      //     return filteredItems;
      // }
      case "orders":
        return data?.filter(
          (item) =>
            regex.test(item.user.email) ||
            regex.test(item.user.firstname) ||
            regex.test(item.user.lastname)
        );

      default:
        return [...data];
    }
  }
};
