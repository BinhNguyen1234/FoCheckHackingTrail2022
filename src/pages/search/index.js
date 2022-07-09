import {
  getCategoriesAPI,
  getProductsByCategoryIdAPI,
  getFiltersAPI,
  getOtherProductsAPI,
  filterSortProductsAPI,
  getSortsAPI,
  searchProductsFoCheckAPI,
} from "../../services/index";
import { getStorage, setStorage } from "../../utils/storage";
import {
  navigateToPDP,
  loadBadgeCart,
  navigateWithParams,
} from "../../utils/navigate";

Page({
  maxSearch: 5,

  data: {
    isLoading: false,
    categories: [],
    otherProducts: [],
    products: [],
    searchTerm: "",
    recentKeys: [],

    isShowFilter: false,
    isShowSort: false,
    filters: {
      prices: [],
      rate: [],
      types: [],
      colors: [],
    },
    selectedFilters: {
      priceOption: null,
      priceRange: {
        start: null,
        end: null,
      },
      size: null,
      type: null,
      color: null,
    },
    selectedSort: null,
  },

  showFilter() {
    this.setData({
      isShowFilter: true,
    });
  },

  hideFilter() {
    this.setData({
      isShowFilter: false,
    });
  },

  onSelectFilter(selectedFilters) {
    console.log(selectedFilters)
    this.setData({
      selectedFilters,
    });
    this.filterSortSearchProducts();
  },

  showSort() {
    this.setData({
      isShowSort: true,
    });
  },

  hideSort() {
    this.setData({
      isShowSort: false,
    });
  },

  onSelectSort(selectedSort) {
    this.setData({
      selectedSort,
    });
    this.filterSortSearchProducts();
  },

  removeFilter(item) {
    const data = { ...this.data };
    data.selectedFilters[item.key] = null;
    this.setData(data);
    this.filterSortSearchProducts();
  },

  async onInput(searchTerm) {
    const recentSearch = await getStorage("recent-search");
    const keys =
      searchTerm === ""
        ? { recentKeys: recentSearch, isLoading: false }
        : { isLoading: true };

    this.setData({
      searchTerm,
      ...keys,
    });
  },

  async onSearch(searchTerm) {
    if (searchTerm) {
      this.filterSortSearchProducts();
    }
  },

  onConfirm(searchTerm) {
    this.onSearch(searchTerm);
    this.addNewRecentKey(searchTerm);
  },

  async addNewRecentKey(searchTerm) {
    if (!searchTerm || searchTerm.length === 0) return;

    const keysSearch = await getStorage("recent-search");
    let recentKeys = keysSearch ? keysSearch.slice(0, this.maxSearch) : [];
    if (recentKeys.includes(searchTerm)) {
      recentKeys = recentKeys.filter((k) => k !== searchTerm);
    }
    const newKeys = [searchTerm, ...recentKeys.slice(0, this.maxSearch - 1)];
    setStorage("recent-search", newKeys);
    this.setData({
      recentKeys: newKeys,
    });
  },

  async removeSearchKey(key) {
    const recentKeys = await getStorage("recent-search");
    const removedKeys = recentKeys.filter((k) => k !== key);
    setStorage("recent-search", removedKeys);
    this.setData({
      recentKeys: removedKeys,
    });
  },

  applySearchKey(key) {
    this.setData({
      searchTerm: key,
      isLoading: true,
    });

    this.addNewRecentKey(key);
  },

  onTapProduct(product) {
    this.addNewRecentKey(this.data.searchTerm);
    navigateToPDP(product.id);
  },

  async filterSortSearchProducts() {
    this.setData({
      isLoading: true,
    });
    try {
      console.log(this.data)
      const products = await searchProductsFoCheckAPI({
        filters: this.data.selectedFilters,
        sort: this.data.selectedSort,
        search: this.data.searchTerm,
      });
      const converPropdcut = products.reduce((result, item) => {
        const newData = {
          id: item.id,
          product: item,
        };
        result.push(newData);
        return result;
      }, []);

      this.setData({
        products: converPropdcut,
        isLoading: false,
      });
      console.log(products);
    } catch {
      this.setData({
        isLoading: false,
      });
    }
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });
    try {
      const [recentKeys] = await Promise.all([getStorage("recent-search")]);

      const filters = {
        rate: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
      };
      this.setData({
        filters,
        recentKeys: recentKeys ? recentKeys : [],
        isLoading: false,
      });
      console.log(this.data)
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  onCustomIconEvent(e) {
    my.navigateTo({ url: "pages/cart/index" });
  },

  goToCategoryDetail(category) {
    navigateWithParams({
      page: "category-detail",
      params: { category_name: category.name },
    });
  },

  // Life cycle
  onShow() {
    loadBadgeCart();
  },

  onReady() {
    this.loadData();
  },
});
