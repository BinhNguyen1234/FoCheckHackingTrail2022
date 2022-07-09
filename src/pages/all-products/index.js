import { getProductFocheck } from "../../services/index";
import {
  navigateToPDP,
} from "../../utils/navigate";

const app = getApp();

Page({
  data: {
    isLoading: true,
    product: [],
  },

  onTapProduct(product) {
    navigateToPDP(product.id);
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });
    
    try {
      console.log('loading')
      const productData = await getProductFocheck();
      const converProduct = productData.reduce((result, item) => {
        const newData = {
          id: item.id,
          product: item,
        };
        result.push(newData);
        return result;
      }, []);
      this.setData({
      isLoading: false,
        product: converProduct,
      });
      console.log(this.data)
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  // Life cycle

  onReady() {
    this.loadData();
  },
});
