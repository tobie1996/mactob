const productCategory = [
  { id: 1, label: "IPHONE 6", value: "IPHONE 6" },
  { id: 2, label: "IPHONE 7", value: "IPHONE 7" },
  { id: 3, label: "IPHONE 8", value: "IPHONE 8" },
  { id: 4, label: "IPHONE XR", value: "IPHONE XR" },
  { id: 5, label: "IPHONE 11", value: "IPHONE 11" },
  { id: 6, label: "IPHONE 12", value: "IPHONE 12" },
  { id: 7, label: "IPHONE 13", value: "IPHONE 13" },
  { id: 8, label: "IPHONE 14", value: "IPHONE 14" },
  { id: 9, label: "IPHONE 15", value: "IPHONE 15" },
  { id: 10, label: "SMARTPHONES", value: "SMARTPHONES"},
  { id: 11, label: "STOCK SCELLÉ CANADA DISPONIBLE 🇨🇦", value: "STOCK SCELLÉ CANADA DISPONIBLE 🇨🇦" },
  { id: 12, label: "IPHONE PROMAX", value: "IPHONE PROMAX" },
  { id: 13, label: "SAMSUNG", value: "SAMSUNG" },
  { id: 14, label: "PIXEL", value: "PIXEL" },
  { id: 15, label: "REDMI", value: "REDMI" },
  { id: 16, label: "HUAWEI", value: "HUAWEI" },
  { id: 17, label: "GADGETS ÉLECTRONIQUES", value: "GADGETS ÉLECTRONIQUES" },
  { id: 18, label: "APPLE WATCH", value: "APPLE WATCH" },
  { id: 19, label: "ACCESSOIRES", value: "ACCESSOIRES" }
];

// Tri des catégories par label alphabétiquement
productCategory.sort((a, b) => a.label.localeCompare(b.label));

export default productCategory;
