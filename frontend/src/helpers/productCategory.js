const productCategory = [
  { id: 1, label: "NOUVEAUX IPHONE", value: "NOUVEAUX IPHONE" },
  { id: 2, label: "IPHONE 15", value: "IPHONE 15" },
  { id: 3, label: "IPHONE 14", value: "IPHONE 14" },
  { id: 4, label: "IPHONE 13", value: "IPHONE 13" },
  { id: 5, label: "IPHONE 12", value: "IPHONE 12" },
  { id: 6, label: "IPHONE 11", value: "IPHONE 11" },
  { id: 7, label: "IPHONE XR", value: "IPHONE XR" },
  { id: 8, label: "IPHONE 8", value: "IPHONE 8" },
  { id: 9, label: "SMARTPHONES", value: "SMARTPHONES"},
  { id: 10, label: "IPHONE PROMAX", value: "IPHONE PROMAX" },
  { id: 11, label: "SAMSUNG", value: "SAMSUNG" },
  { id: 12, label: "PIXEL", value: "PIXEL" },
  { id: 13, label: "REDMI", value: "REDMI" },
  { id: 14, label: "HUAWEI", value: "HUAWEI" },
  { id: 15, label: "GADGETS ÉLECTRONIQUES", value: "GADGETS ÉLECTRONIQUES" },
  { id: 16, label: "APPLE WATCH", value: "APPLE WATCH" },
  { id: 17, label: "ACCESSOIRES", value: "ACCESSOIRES" }
];

// Tri des catégories par label alphabétiquement
productCategory.sort((a, b) => a.label.localeCompare(b.label));

export default productCategory;
