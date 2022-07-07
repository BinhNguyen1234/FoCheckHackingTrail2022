import {
  getShopInfoAPI,
  getCategoriesAPI,
  getFeaturedProductsAPI,
  getNewProductsAPI,
  getBannersAPI,
  getHotDealProductsAPI,
  getProductNearYourAeraAPI,
  getFavoritesProductAPI,
} from "../../services/index";
import { group } from "../../utils/common";
import {
  navigateToPDP,
  loadBadgeCart,
  navigateWithParams,
} from "../../utils/navigate";
import { getStorage, setStorage } from "../../utils/storage";

Page({
  data: {
    initHome: false,
    isLoading: true,
    isFirstOpen: false,
    shop: {},
    categories: [],
    featuredProducts: [],
    newProducts: [],
    banners: [],
    hotDealProducts: [],
    nearAeraProducts: [],
    favoriteProducts: [],
  },

  onTapProduct(product) {
    navigateToPDP(product.id);
  },

  onCustomIconEvent(e) {
    my.navigateTo({ url: "pages/cart/index" });
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const [
        shop,
        categories,
        featuredProducts,
        newProducts,
        banners,
        hotDealProducts,
        nearAeraProducts,
        favoriteProducts,
      ] = await Promise.all([
        getShopInfoAPI(),
        getCategoriesAPI(),
        getFeaturedProductsAPI(),
        getNewProductsAPI(),
        getBannersAPI(),
        getHotDealProductsAPI(),
        getProductNearYourAeraAPI(),
        getFavoritesProductAPI(),
      ]);

      this.setData({
        shop,
        featuredProducts,
        newProducts,
        banners,
        hotDealProducts,
        categories: group(categories, 8),
        isLoading: false,
        nearAeraProducts: group(nearAeraProducts, 8),
        favoriteProducts,
      });
    } catch {
      this.setData({
        isLoading: false,
      });
    }
  },

  goToCategory() {
    my.switchTab({
      url: "pages/category/index",
    });
  },

  goToCategoryDetail(category) {
    navigateWithParams({
      page: "category-detail",
      params: { category_name: category.name },
    });
  },

  setTitle() {
    my.setNavigationBar({
      title: "Shop Name",
    });
  },

  async onDone() {
    my.showTabBar({
      animation: true,
    });
    this.setTitle();
    loadBadgeCart();
    this.setData({
      isFirstOpen: false,
    });
    this.loadData();
    await setStorage("first-open", false);
  },

  // Life cycle
  async onReady() {
    const value = await getStorage("first-open");
    const isFirstOpen = value === undefined ? true : value;
    if (isFirstOpen) {
      my.hideTabBar({
        animation: true,
      });
    } else {
      this.loadData();
      this.setTitle();
    }
    this.setData({
      initHome: true,
      isFirstOpen,
    });
  },

  async onShow() {
    const value = await getStorage("first-open");
    const isFirstOpen = value === undefined ? true : value;
    if (!isFirstOpen) {
      loadBadgeCart();
      this.setTitle();
    }
    this.setData({
      initHome: true,
      isFirstOpen,
    });
  },

  async onPullDownRefresh() {
    await this.loadData();
    my.stopPullDownRefresh();
  },
});
