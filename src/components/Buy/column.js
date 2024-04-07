// File to specify the columns in the datatable

export const noBuyColumns = [
  {
    label: 'Course Number',
    field: 'courseNumber',
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
    label: 'Payment Methods',
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
