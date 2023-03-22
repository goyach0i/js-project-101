const products = {
  data: [
    {
      id: 1,
      name: 'Cup',
      price: 9900,
      cartegory: 'life',
    },
    {
      id: 2,
      name: 'Mouse',
      price: 15000,
      cartegory: 'it',
    },
    {
      id: 3,
      name: 'Keyboard',
      price: 21000,
      cartegory: 'it',
    },
    {
      id: 4,
      name: 'Book',
      price: 19900,
      cartegory: 'book',
    },
    {
      id: 5,
      name: 'Pen',
      price: 1500,
      cartegory: 'book',
    },
  ],
};

// 내보내서 외부파일에서 사용하기 위해 선언. (products 내보내기)
export default products;
