// File to specify the columns in the datatable

export const listingDetailColumns = [
  {
    label: 'Course Number',
    field: 'courseAndDpmt',
    sort: 'asc',
    width: 150
  },
  {
    label: 'Title',
    field: 'title',
    sort: 'asc',
    width: 270
  },
  {
    label: 'Edition',
    field: 'edition',
    sort: 'asc',
    width: 200
  },
  {
    label: 'ISBN',
    field: 'isbn',
    sort: 'asc',
    width: 100
  },
  {
    label: 'Price',
    field: 'price',
    sort: 'asc',
    width: 100
  },
  {
    label: 'Condition',
    field: 'condition',
    sort: 'asc',
    width: 100
  },

  {
    label: 'Preferred Payment Methods',
    field: 'paymentMethods',
    sort: 'asc',
    width: 100
  }
];

export const buyColumn = {
  label: 'Add to Cart',
  field: 'addToCart',
  sort: 'asc',
  width: 100
};
