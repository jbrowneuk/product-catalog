(function (window) {
  function myLibrary() {
    const catalog = createRandomCatalog(100);

    return {
      searchProductById: searchProductById,
      searchProductsByPrice: searchProductsByPrice,
      searchProductsByType: searchProductsByType,
      searchAllProducts: searchAllProducts,
    };

    function searchProductsByType(type) {
      const promise = new Promise((resolve, reject) => {
        let i = 0;
        const typeArray = [];
        const possibleTypes = ['Electronics', 'Book', 'Clothing', 'Food'];
        if (!possibleTypes.includes(type)) {
          reject(`Invalid Type: ${type}`);
        } else {
          setTimeout(() => {
            while (i < catalog.length) {
              if (catalog[i].type == type) {
                typeArray.push({
                  id: catalog[i].id,
                  price: catalog[i].price,
                  type: catalog[i].type,
                });
              }

              i += 1;
            }
            resolve(typeArray);
          }, 1000);
        }
      });

      return promise;
    }

    function searchProductsByPrice(price, difference) {
      const promise = new Promise((resolve, reject) => {
        let i = 0;
        const priceArray = [];
        if (!isFinite(price) || price < 0) {
          reject(`Invalid Price: ${price}`);
        } else {
          setTimeout(() => {
            while (i < catalog.length) {
              if (Math.abs(catalog[i].price - price) < difference) {
                priceArray.push({
                  id: catalog[i].id,
                  price: catalog[i].price,
                  type: catalog[i].type,
                });
              }
              i += 1;
            }
            resolve(priceArray);
          }, 1000);
        }
      });
      return promise;
    }

    function searchProductById(id) {
      const promise = new Promise((resolve, reject) => {
        let i = 0;
        setTimeout(() => {
          while (i < catalog.length) {
            if (catalog[i].id == id) {
              resolve({
                id: id,
                price: catalog[i].price,
                type: catalog[i].type,
              });
            }
            i += 1;
          }
          reject(`Invalid ID: ${id}`);
        }, 1000);
      });
      return promise;
    }

    function searchAllProducts() {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(catalog);
        }, 1000);
      });
      return promise;
    }

    function createRandomProduct() {
      const typeArray = ['Electronics', 'Book', 'Clothing', 'Food'];
      const price = (Math.random() * 500).toFixed(2);
      const type = typeArray[Math.floor(Math.random() * 4)];
      return { price: price, type: type };
    }

    function createRandomCatalog(num) {
      const catalog = [];
      for (let i = 0; i < num; i += 1) {
        const obj = createRandomProduct();
        catalog.push({ id: i, price: obj.price, type: obj.type });
      }

      return catalog;
    }
  }

  if (typeof (window.api) === 'undefined') {
    window.api = myLibrary();
  }
})(window);
