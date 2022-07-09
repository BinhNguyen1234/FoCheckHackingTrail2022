Component({
  data: {
    rows: [
      {
        key: 'mfg',
        value: 'Ngày sản xuất',
      },
      {
        key: 'importDay',
        value: 'Ngày nhập kho',
      },
      {
        key: 'outOfDay',
        value: 'Hạn sử dụng',
      },
      {
        key: 'warehouseAddress',
        value: 'Địa chỉ kho',
      },
      {
        key: 'information',
        value: 'Thông tin',
      },
      {
        key: 'provider',
        value: 'Nhà cung cấp',
      }
    ],
  },
  props: {
    viewMore: false,
    isLoading: true,
    detail: {
      madeIn: '',
      size: '',
      color: '',
      material: '',
      image: '',
      shortDescription: '',
      longDescription: '',
    },
  },
  methods: {
    _onSwitchView() {
      console.log(this.props)
      this.setData({
        viewMore: !this.data.viewMore,
      });
    },
  },
});
